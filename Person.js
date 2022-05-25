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
        this.updateSprite(state);
        this.updatePosition();

        if(this.isPlayerControlled){
            if(this.movingProgressRemaining === 0 && state.arrow) {
                this.direction = state.arrow;
                console.log(state.map.isSpaceTaken(this.x, this.y, this.direction))
                this.movingProgressRemaining = 16;
            }
        }
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0){
            const [property, change] = this.directionUpdate[this.direction]
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }

    updateSprite(state) {
        if(this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprite.setAnimation("idle-"+this.direction);
        }

        if(this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
        }
    }
}