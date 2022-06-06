class MusicPopup {
    constructor({ src, onComplete }) {
        this.src = src;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement() {
        //Create the element
        this.element = document.createElement("div");
        this.element.classList.add("ImagePopup");

        this.element.innerHTML = (`
            <img src="${this.src}">
        `)

        this.actionListener = new KeyPressListener("Enter", () => {
            this.done();
        })
    }

    done() {
        this.element.remove();
        this.actionListener.unbind();
        this.onComplete();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}