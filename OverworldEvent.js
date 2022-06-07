class OverworldEvent {
    constructor({map, event}){
        this.map = map;
        this.event = event;
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }

    stand(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehavior({
            map: this.map
        }, 
        {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        const completeHandler = (e => {
            if(e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonStandingComplete", completeHandler)
                resolve();
            }
        })

        document.addEventListener("PersonStandingComplete", completeHandler)
    }

    textMessage(resolve) {

        if (this.event.faceHero) {
            const obj = this.map.gameObjects[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction)
        }

        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve(),
        })
        message.init(document.querySelector(".game-container"));
    }

    imagePopup(resolve) {
        const image = new ImagePopup({
            src: this.event.src,
            onComplete: () => resolve()
        })

        image.init(document.querySelector(".game-container"))
    }

    imagePopupWithText(resolve) {
        const image = new ImagePopupWithText({
            text: this.event.text,
            src: this.event.src,
            onComplete: () => resolve()
        })

        image.init(document.querySelector(".game-container"))
    }

    walk(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehavior({
            map: this.map
        }, 
        {
            type: "walk",
            direction: this.event.direction,
            retry: true
        })

        const completeHandler = (e => {
            if(e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler)
                resolve();
            }
        })

        document.addEventListener("PersonWalkingComplete", completeHandler)
    }

    changeMap (resolve) {

        const sceneTransition = new SceneTransition(0);
        sceneTransition.init(document.querySelector(".game-container"), () => {
            console.log("I AM DONE!")
            this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
            resolve();

            sceneTransition.fadeOut();            
        })

    }
}