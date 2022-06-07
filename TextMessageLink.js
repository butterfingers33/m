class TextMessageLink {
    constructor({ text, onComplete, link}) {
        this.text = text;
        this.link = link;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement() {
        //Create the element
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
            <p class="TextMessage_p"><a href="${this.link}" target="_blank">${this.text}</a></p>
            <button class="TextMessage_button">Next</button>
        `)

        this.element.querySelector("button").addEventListener("click", () => {
            this.done();
        });

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