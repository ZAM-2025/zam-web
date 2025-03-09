class BookingSidebar extends HTMLElement {
    constructor() {
        super();
    }

    add(assetName, start, end, status) {
        var sideContainer = document.createElement("div");
        sideContainer.className = "booking-row";

        var spacer = document.createElement("zam-spacer");

        var titleText = document.createElement("h1");
        titleText.innerText = assetName;

        var closeButton = document.createElement("button");
        closeButton.className = "close-button";
        closeButton.onclick = () => {
            this.close();
        }

        var statusText = document.createElement("p");
        statusText.innerText = "Stato Attuale: ";

        // TODO: gestire altri stati?
        if(status) {
            statusText.innerHTML += "<span green>Libero</span>"
        } else {
            statusText.innerHTML += "<span red>Occupato</span>"
        }

        sideContainer.appendChild(titleText);
        sideContainer.appendChild(spacer);
        sideContainer.appendChild(closeButton);

        this.appendChild(sideContainer);
        this.appendChild(statusText);

        document.body.appendChild(this);
    }

    close() {
        // fa abbastanza schifo ma who cares
        setTimeout(() => {
            this.remove();
        }, 240);

        this.setAttribute("closing", "");
    }
}

customElements.define("zam-booking-sidebar", BookingSidebar);