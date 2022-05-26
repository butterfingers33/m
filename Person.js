class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "down" : ["y", 1],
            "up" : ["y", -1],
            "left" : ["x", -1],
            "right" : ["x", 1],
        }
    }

    update (state) {

        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        }else{
            //Case: we're keybaord ready and have an arrow pressed
            if(this.isPlayerControlled && state.arrow) {
                this.startBehavior(
                    state, 
                    {
                        type: "walk",
                        direction : state.arrow
                    }
                )
            }
            this.updateSprite();
        }


    }

    startBehavior(state, behavior){
        //Set character direction to whatever behavior has
        this.direction = behavior.direction;

        if(behavior.type == "walk"){
            //Stop here if space is not free
            if(state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            }
        }
        
        //Ready to Walk!
        state.map.moveWall(this.x, this.y, this.direction);
        this.movingProgressRemaining = 16;
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0){
            const [property, change] = this.directionUpdate[this.direction]
            this[property] += change;
            this.movingProgressRemaining -= 1;
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