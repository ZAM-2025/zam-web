class BookingSidebar extends HTMLElement {
    constructor() {
        super();
    }

    add(assetName, start, end, status, assetID) {
        var sideContainer = document.createElement("div");
        sideContainer.className = "booking-row";
        sideContainer.setAttribute("top", "");

        var titleText = document.createElement("h1");
        titleText.innerText = assetName;

        var spacer = document.createElement("zam-spacer");

        var closeButton = document.createElement("button");
        closeButton.className = "close-button";
        closeButton.onclick = () => {
            this.close();
        }

        var statusContainer = document.createElement("div");
        statusContainer.className = "booking-row";
        statusContainer.setAttribute("nopad", "");

        sideContainer.appendChild(titleText);
        sideContainer.appendChild(spacer);
        sideContainer.appendChild(closeButton);

        var statusText = document.createElement("h3");
        statusText.innerText = "Stato Attuale: ";
        statusContainer.appendChild(statusText);

        // TODO: gestire altri stati?
        if(status) {
            statusText.innerHTML += "<span green>Libero</span>&nbsp;"
        } else {
            statusText.innerHTML += "<span red>Occupato</span>&nbsp;"
        }

        if(start != null && end != null) {
            var timeText = document.createElement("p");
            timeText.innerText = `(${start} - ${end})`;
            statusContainer.appendChild(timeText);
        }

        this.appendChild(sideContainer);
        this.appendChild(statusContainer);

        var bookForm = document.createElement("form");
        bookForm.className = "book-form";

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

            console.log(startDateTime, endDateTime);

            var bookStart = `${startHour}:${startMinute}`;
            var bookEnd = `${endHour}:${endMinute}`;

            var auth = new ZAMAuth();
            auth.book(assetID, startDateTime, endDateTime, (result) => {
                console.log(result);

                if(result.success) {
                    container.close();
                } else {
                    alert(`Impossibile prenotare ${assetName}:\n${result.message}`);
                }
            });
        };

        var prenotaLabelContainer = document.createElement("div");
        prenotaLabelContainer.className = "prenota-label-container";

        var spacerLeft = document.createElement("div");
        spacerLeft.className = "prenota-label-spacer";

        var spacerRight = document.createElement("div");
        spacerRight.className = "prenota-label-spacer";

        var prenotaLabel = document.createElement("h1");
        prenotaLabel.innerText = "Prenota";

        prenotaLabelContainer.appendChild(spacerLeft);
        prenotaLabelContainer.appendChild(prenotaLabel);
        prenotaLabelContainer.appendChild(spacerRight);

        var dataLabel = document.createElement("div");
        dataLabel.innerHTML = "<h2 nopad>Data</h2>";
        dataLabel.innerHTML += "<p italic nopad>Seleziona la data di prenotazione</p>";
        dataLabel.setAttribute("nopad", "");

        var oraLabel = document.createElement("div");
        oraLabel.innerHTML = "<h2 nopad>Orario</h2>";
        oraLabel.innerHTML += "<p italic nopad>Seleziona l&apos;orario di inizio</p>";
        oraLabel.setAttribute("nopad", "");

        var endOraLabel = document.createElement("p");
        endOraLabel.innerHTML = "Seleziona l&apos;orario di fine";
        endOraLabel.setAttribute("nopad", "");
        endOraLabel.setAttribute("italic", "");

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

        var buttonSpacer = document.createElement("zam-spacer");
        
        var buttonContainer = document.createElement("div");
        buttonContainer.className = "button-row";

        var submitButton = document.createElement("input");
        submitButton.type = "submit";
        submitButton.value = "Prenota";
        submitButton.className = "book-button";

        buttonContainer.appendChild(submitButton);

        bookForm.appendChild(prenotaLabelContainer);
        bookForm.appendChild(dataLabel);
        bookForm.appendChild(inputDate);
        bookForm.appendChild(oraLabel);
        bookForm.appendChild(startHour);
        bookForm.appendChild(endOraLabel);
        bookForm.appendChild(endHour);
        bookForm.appendChild(buttonSpacer);
        bookForm.appendChild(buttonContainer);

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