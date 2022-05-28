class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};        

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = false;
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

    mountObjects() {
        Object.keys(this.gameObjects).forEach( key => {
            let object = this.gameObjects[key]

            object.id = key

            //TODO: determine if this object actually needs to be mounted
            object.mount(this);
        })
    }

    async startCutScene(events){
        this.isCutscenePlaying = true;

        //start a loop of async events
        //await each one
        for(let i = 0; i < events.length; i++){
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this
            })
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this));
    }

    checkForActionCutscene() {
        const hero = this.gameObjects["hero"];
        const nextcoords = utils.nextPosition(hero.x, hero.y, hero.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextcoords.x},${nextcoords.y}`
        })

        if(!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutScene(match.talking[0].events)
        }
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x, y){
        delete this.walls[`${x},${y}`];
    }

    moveWall(wasX,wasY,direction) {
        this.removeWall(wasX, wasY);
        const {x, y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
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
            npcA: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(9),
                src: "./images/characters/people/npc1.png",
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "up", time: 300},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "I'm busy..."},
                            {type: "textMessage", text: "Go away!"}
                        ]
                    }
                ]
            }),
            npcB: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(8),
                src: "./images/characters/people/npc2.png",
                behaviorLoop: [
                    {type: "walk", direction: "left"},
                    {type: "walk", direction: "left"},
                    // {type: "stand", direction: "up", time: 800},
                    {type: "walk", direction: "up"},
                    {type: "walk", direction: "up"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "down"},
                    {type: "walk", direction: "down"},
                ]
            })

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