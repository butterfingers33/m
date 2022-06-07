class ImagePopupWithText {
    constructor({ text, src, onComplete }) {
        this.text = text
        this.src = src;
        this.onComplete = onComplete;
        this.textelement = null;
        this.imgelement = null;
    }

    createElement() {
        //Create the element
        this.imgelement = document.createElement("div");
        this.imgelement.classList.add("ImagePopup");

        this.textelement = document.createElement("div");
        this.textelement.classList.add("TextMessage");

        this.imgelement.innerHTML = (`
            <img src="${this.src}">
        `)

        this.textelement.innerHTML = (`
            <p class="TextMessage_p">${this.text}</p>
            <button class="TextMessage_button">Next</button>
        `)

        this.textelement.querySelector("button").addEventListener("click", () => {
            this.done();
        });

        this.actionListener = new KeyPressListener("Enter", () => {
            this.done();
        })
    }

    done() {
        this.textelement.remove();
        this.imgelement.remove();
        this.actionListener.unbind();
        this.onComplete();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.imgelement);
        container.appendChild(this.textelement);
    }
}