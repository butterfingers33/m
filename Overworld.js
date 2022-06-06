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
      {type: "textMessage", text: "Hey man, I'm Sol, Pixelated M."},
      // {type: "imagePopup", src: "./images/m/confused.png"}
      // {type: "textMessage", text: "It's my Birthday today!"},
      // {type: "textMessage", text: "My boyfriend thinks I'm very indecisive"},
      // {who: "hero", type: "talk", text: "alright"}
      // {type: "changeMap", map : "DemoRoom"}
    ]);

    console.log(this.map.walls)
  }
}