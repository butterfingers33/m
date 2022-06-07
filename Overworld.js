class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  startGameLoop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      const cameraPerson = this.map.gameObjects.hero

      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      })

      //Draw Lower Layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      Object.values(this.map.gameObjects).sort((a, b) => {
      return a.y - b.y;
      }).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      })

      //Draw Game Objects
      this.map.drawUpperImage(this.ctx, cameraPerson);

      requestAnimationFrame(() => {
        step();
      })

    };

    step()
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      //Is there a person to takl to?
      this.map.checkForActionCutscene();
    })
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if(e.detail.whoId === "hero") {
        // Hero's position has changed
        this.map.checkForFootstepCutscene()
        // console.log("Nice")
      }
    })
  }

  startMap(mapConfig) {
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();
  }

  init() {

    this.startMap(window.OverworldMaps.DemoRoom);

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    //For Cutscenes
    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.startGameLoop();
    this.map.startCutScene([
      {type: "textMessage", text: "Sol: Hey man, I'm Sol, Pixelated Manal..."},
      {type: "textMessage", text: "Sol: Use arrow keys to... Wait a minute..."},
      {type: "textMessage", text: "Sol: I think I left my consciousness in the... fifth dimension..."},
      {type: "textMessage", text: "Sol: Noooo stop singing TT"},
      {type: "textMessage", text: "Sol: Where tf am I?"},
      {type: "stand", who: "hero", direction : "left", time: 800},
      {type: "stand", who: "hero", direction : "right", time: 600},
      {type: "textMessage", text: "Anyone there?"},
      {type: "stand", who: "hero", direction: "up", time: 500},
      {type: "stand", who: "hero", direction: "right", time: 500},
      {type: "textMessage", text: "Sol: hey you!?"},
      {type: "walk", direction: "right", who: "hero"},
      {type: "walk", direction: "right", who: "hero"},
      {type: "walk", direction: "right", who: "hero"},
      {type: "walk", direction: "right", who: "hero"},
      {type: "walk", direction: "right", who: "hero"},
      {type: "walk", direction: "right", who: "hero"},
      {type: "walk", direction: "right", who: "hero"},
      {type: "stand", direction: "left", who: "rush"},
      {type: "textMessage", text: "Rue: Hey, whats up?"},
      {type: "textMessage", text: "Sol: What the hell is going on, who are you?"},
      {type: "textMessage", text: "Rue: I am Rue!"},
      {type: "textMessage", text: "Sol: Baby why are you all pixels, where are we?! sjsjsj"},
      {type: "textMessage", text: "Rue: You are dreaming!"},
      {type: "textMessage", text: "Sol: What are you doing in my dream?"},
      {type: "textMessage", text: "Rue: Idk, you tell me!"},
      {type: "textMessage", text: "Sol: How do I wake up?"},
      {type: "textMessage", text: "Rue: Why do you want to?"},
      {type: "textMessage", text: "Sol: omg, is this how my lil fantasy world looks like sjsjsj"},
      // {type: "textMessage", text: "Sol: What am I gonna do here TT."},
      {type: "textMessage", text: "Sol: You look cute."},
      {type: "textMessage", text: "Rue: I am a fragment of your imagination here :)"},
      {type: "textMessage", text: "Rue: You've made yourself cute tooo :3"},
      {type: "textMessage", text: "Rue: Go roam around and have fun!"},
      {type: "stand", direction : "down", who: "hero", time: 800},
      {type: "textMessage", text: "Sol: Let's see ..."},
      {type: "stand", direction: "down", who: "rush", time: 800}
    ]);

    console.log(this.map.walls)
  }
}