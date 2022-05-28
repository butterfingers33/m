class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;
        this.isStanding = false;

        this.isPlayerControlled = config.isPlayerControlled || false;
        this.stepSize = 0.5
        this.directionUpdate = {
            "down" : ["y", this.stepSize],
            "up" : ["y", -this.stepSize],
            "left" : ["x", -this.stepSize],
            "right" : ["x", this.stepSize],
        }
    }

    update (state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        }else{
            //Case: we're keybaord ready and have an arrow pressed
            if(!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
                this.startBehavior(
                    state, 
                    {
                        type: "walk",
                        direction : state.arrow,
                    }
                )
            }
            this.updateSprite();
        }
    }

    startBehavior(state, behavior){
        //Set character direction to whatever behavior has
        this.direction = behavior.direction;

        if(behavior.type === "walk"){
            //Stop here if space is not free
            if(state.map.isSpaceTaken(this.x, this.y, this.direction)) {

                behavior.retry && setTimeout(() => {
                    this.startBehavior(state, behavior);
                }, 10)
                return;
            }

            //Ready to Walk!
            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 16 / this.stepSize;
            this.updateSprite();
        }

        if(behavior.type === "stand"){
            this.isStanding = true;
            setTimeout(() => {
                utils.emitEvent("PersonStandingComplete", {
                    whoId: this.id
                })
                this.isStanding = false;
            }, behavior.time)
        }

    }

    updatePosition() {
        if (this.movingProgressRemaining > 0){
            const [property, change] = this.directionUpdate[this.direction]
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }

        if(this.movingProgressRemaining === 0){
            utils.emitEvent("PersonWalkingComplete", {
                whoId: this.id
            })
        }
    }

    updateSprite() {
        if(this.movingProgressRemaining > 0){
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }

        this.sprite.setAnimation("idle-"+this.direction);
    }
}