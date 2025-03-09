class BookingSidebar extends HTMLElement {
    constructor() {
        super();
    }

    add(assetName, start, end, status, assetID) {
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

        var bookForm = document.createElement("form");

        var container = this;
        bookForm.onsubmit = (event) => {
            event.preventDefault();
            
            var formData = Object.fromEntries(new FormData(event.target));
            console.log(formData);

            var startDateTime = new Date(Date.parse(formData.date));
            let [startHour, startMinute] = formData.start.split(":");
            startDateTime.setHours(startHour, startMinute);

            var endDateTime = new Date(Date.parse(formData.date));
            let [endHour, endMinute] = formData.end.split(":");
            endDateTime.setHours(endHour, endMinute);

            var auth = new ZAMAuth();
            auth.book(assetID, startDateTime, endDateTime, (result) => {
                console.log(result);

                if(result == true) {
                    container.close();
                }
            });
        };

        var inputDate = document.createElement("input");
        inputDate.type = "date";
        inputDate.required = true;
        inputDate.name = "date";

        var startHour = document.createElement("input");
        startHour.type = "time";
        startHour.required = true;
        startHour.name = "start";

        var endHour = document.createElement("input");
        endHour.type = "time";
        endHour.required = true;
        endHour.name = "end";

        var submitButton = document.createElement("input");
        submitButton.type = "submit";
        submitButton.value = "Prenota";

        bookForm.appendChild(inputDate);
        bookForm.appendChild(startHour);
        bookForm.appendChild(endHour);
        bookForm.appendChild(submitButton);

        this.appendChild(bookForm);

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