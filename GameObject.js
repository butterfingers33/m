class GameObject {
  constructor(config) {
    this.id = null;

    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.useShadow = config.useShadow || "true";

    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "./images/characters/people/hero.png",
      useShadow: this.useShadow === "true"
    });

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0

    this.talking = config.talking || [] // Add talking or behavior loop to a person
  }

  mount(map) {
    console.log("Mounting!");
    this.isMounted = true;
    map.addWall(this.x, this.y);

    //If we have a behavior, kick off after a short delay
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }

  update() {
  }

  async doBehaviorEvent(map) {

    //Don't do anythign if cutscene is playing
    if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) return;

    // Setting up the event
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    //Create event instance from the event config
    const eventHandler = new OverworldEvent({map, event: eventConfig});
    await eventHandler.init();

    //Setting next event
    this.behaviorLoopIndex += 1
    if(this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0
    }

    //Do it again!
    this.doBehaviorEvent(map);
  }
}