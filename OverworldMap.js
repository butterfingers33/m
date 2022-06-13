//MAPS will be 13 blocks long and 23 blocks wide

class OverworldMap {
    constructor(config) {
        this.overworld = null;

        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};        

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = false;
        this.cutsceneSpaces = config.cutsceneSpaces || {}

        this.offsetx = config.offsetx || 0
        this.offsety = config.offsety || 0
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(11 - this.offsetx) - cameraPerson.x,
            utils.withGrid(6 - this.offsety) - cameraPerson.y);

        // console.log(utils.withGrid(10.5) - cameraPerson.x - this.offsetx)
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(11 - this.offsetx) - cameraPerson.x,
            utils.withGrid(6 - this.offsety) - cameraPerson.y);
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

    checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"];
        const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];

        if(!this.isCutscenePlaying && match) {
            this.startCutScene( match[0].events )
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
        lowerSrc: "./images/maps/cardLower.png",
        upperSrc: "./images/maps/cardUpper.png",
        offsetx: 11,
        offsety: 10,
        gameObjects: {
            hero: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(10),
                src: "./images/characters/people/npc1.png",
                isPlayerControlled: true
            }),
            rush: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(10),
                src: "./images/characters/people/npc3.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "We're not perfect, we're not completely same, but you warm my soul.", faceHero: "rush"},
                            {type: "textMessage", text: "Everyone is a stranger to me.", faceHero: "rush"},
                            {type: "textMessage", text: "You are the most familiar of them all.", faceHero: "rush"},
                            {type: "textMessage", text: "You're cute", faceHero: "rush"},
                            {type: "textMessage", text: "You're smart", faceHero: "rush"},
                            {type: "textMessage", text: "You're mature", faceHero: "rush"},
                            {type: "textMessage", text: "You're childish", faceHero: "rush"},
                            {type: "textMessage", text: "You're adamant", faceHero: "rush"},
                            {type: "textMessage", text: "But you understand", faceHero: "rush"},
                            {type: "textMessage", text: "You're the perfect blend.", faceHero: "rush"},
                            {type: "textMessage", text: "I love you!", faceHero: "rush"},
                            {type: "textMessage", text: "The day is yours, have fun!", faceHero: "rush"},
                            {type: "textMessage", text: "Happy Birthday!", faceHero: "rush"},
                        ]
                    }
                ]
            }),
            spotify: new Person({
                x: utils.withGrid(11),
                y: utils.withGrid(7),
                src: "./images/characters/people/empty.png",
                useShadow: "false",
                talking : [
                    {
                        events: [
                            {
                                type: "textMessageLink", text: "Finally! Use it Well! <333",
                                link: "https://www.spotify.com/in-en/duo/invite/XaYbB7y8yY1Xx96/"}
                        ]
                    }
                ]
            })
        },
        walls: window.bigmapwalls1(),
        cutsceneSpaces: {
            [utils.asGridCord(1, 5)]: [
                {
                    events: window.artgallery()
                }
            ],
            [utils.asGridCord(11, 6)] : [
                {
                    events: window.nearspotify()
                }
            ],
            [utils.asGridCord(19, 5)] : [
                {
                    events: window.shopevents()
                }
            ],
            [utils.asGridCord(16, 2)] : [
                {
                    events: [
                        {type: "textMessage", text: "Ill-formed dream terrain, beware!"}
                    ]
                }
            ]
        }
    },
}

console.log(window.artgallery())
