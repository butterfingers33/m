class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};        

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y);
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "./images/maps/DemoLower.png",
        upperSrc: "./images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                isPlayerControlled: true
            }),
            npc1: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(9),
                src: "./images/characters/people/npc1.png",
            }),
            // npc2: new GameObject({
            //     x: 7,
            //     y: 8
            // })
        },
        walls:{
            [utils.asGridCord(7,6)]: true,
            [utils.asGridCord(8,6)]: true,
            [utils.asGridCord(7,7)]: true,
            [utils.asGridCord(8,7)]: true
        }
    },

    KitchenRoom: {
        lowerSrc: "./images/maps/KitchenLower.png",
        upperSrc: "./images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new GameObject({
                x: 5,
                y: 6,
            }),
            npc1: new GameObject({
                x: 9,
                y: 9
            }),
            npc2: new GameObject({
                x: 7,
                y: 8
            })
        }   
    },
}