/**
 * Progetto ZAM - Anno Scolastico 2024/2025
 * Modulo: Frontend Web
 * File: BookingSidebar.js
 * Scopo: Sidebar sul lato destro per la prenotazione degli asset
 */

class BookingSidebar extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * 
     * @param {string} assetName Nome dell'asset da prenotare
     * @param {string | null} start Stringa con l'orario d'inizio (HH:MM) o null
     * @param {string | null} end Stringa con l'orario di fine (HH:MM) o null
     * @param {boolean} status True se l'asset non è prenotato attualmente
     * @param {number} assetID ID dell'asset nel DB
     * @param {boolean | null} isEdit (Optional) True se la prenotazione viene modificata, False se viene creata
     * @param {boolean | null} shouldReload (Optional) Se è True, la pagina viene ricaricata dopo la prenotazione
     */
    add(assetName, start, end, status, assetID, isEdit, shouldReload) {
        // Salvo il valore nell'oggetto per usarlo nel callback
        if(shouldReload != undefined && shouldReload != null) {
            this.shouldReload = shouldReload;
        } else {
            this.shouldReload = false;
        }

        // Generazione del layout nel DOM
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

        var picker = new ZAMPicker();

        new ZAMAuth().getUserInfo((data) => {
            var doLoadBook = true;

            switch(data.type) {
                case ZAMUserType.GESTORE: 
                {
                    doLoadBook = false;
                    picker.add([
                        {
                            label: "Occupati",
                            id: 1
                        }
                    ]);
                }   
                break;

                case ZAMUserType.COORDINATORE:
                {
                    picker.add([
                        {
                            label: "Prenota",
                            id: 0
                        },
                        {
                            label: "Occupati",
                            id: 1
                        }
                    ]);
                }
                break;

                case ZAMUserType.DIPENDENTE:
                {
                    picker.add([
                        {
                            label: "Prenota",
                            id: 0
                        }
                    ]);
                }
                break;
            }

            this.appendChild(picker);

            var form;
            if(doLoadBook) {
                form = this.addForm(assetName, start, end, status, assetID, isEdit, shouldReload);
            } else {
                form = this.addList(assetName, start, end, status, assetID, isEdit, shouldReload);
            }

            picker.setOnChange((value) => {
                console.log(form);
                form.remove();
                if(value == 0) {
                    form = this.addForm(assetName, start, end, status, assetID, isEdit, shouldReload);
                } else if (value == 1) {
                    form = this.addList(assetName, start, end, status, assetID, isEdit, shouldReload);
                }
            });

            document.body.appendChild(this);
        });
    }

    addList(assetName, start, end, status, assetID, isEdit, shouldReload) {
        var book = document.createElement("div");
        book.className = "book-form";
        book.setAttribute("alt", "");

        var auth = new ZAMAuth();
        auth.getBookingsByAsset(assetID, (bookings) => {
            console.log(bookings);

            for(var booking of bookings) {
                var container = document.createElement("div");
                container.className = "booking-container";

                var prenotatoLabel = document.createElement("p");
                prenotatoLabel.innerText = "Prenotato da:";

                var nomeLabel = document.createElement("h3");
                nomeLabel.setAttribute("bold", "");
                nomeLabel.innerText = booking.nome + " " + booking.cognome;

                var dateLabel = document.createElement("p");
                var bookingDate = new Date(booking.body.inizio);
                var endDate = new Date(booking.body.fine);

                var startTime = String(bookingDate.getHours()).padStart(2, '0') + ":" + String(bookingDate.getMinutes()).padStart(2, '0');
                var endTime = String(endDate.getHours()).padStart(2, '0') + ":" + String(endDate.getMinutes()).padStart(2, '0');

                var day = Helpers.getHTMLDayString(bookingDate.getDay());

                dateLabel.innerHTML = day;
                dateLabel.innerText += ` ${bookingDate.getDate()}/${bookingDate.getMonth() + 1}`;
                dateLabel.innerText += ` | ${startTime} - ${endTime}`;

                container.appendChild(prenotatoLabel);
                container.appendChild(nomeLabel);
                container.appendChild(dateLabel);

                book.appendChild(container);
            }
        });

        this.appendChild(book);
        return book;
    }

    addForm(assetName, start, end, status, assetID, isEdit, shouldReload) {
        var bookForm = document.createElement("form");
        bookForm.className = "book-form";

        var errorLabel = document.createElement("span");
        errorLabel.innerText = "";

        // TODO: spostare tutta sta roba nel CSS quando Erica fa il commit
        errorLabel.setAttribute("red", "");
        errorLabel.style.textAlign = "center";
        errorLabel.style.marginBottom = "10px";

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

            var auth = new ZAMAuth();

            if(isEdit != undefined && isEdit != null && isEdit === true) {
                // qui assetID prende il ruolo di bookingID
                auth.editBooking(assetID, startDateTime, endDateTime, (result) => {
                    console.log(result);
    
                    if(result.success) {
                        container.close();
                        window.location.reload();
                    } else {
                        errorLabel.innerText = `Impossibile prenotare ${assetName}:\n${result.message}`;
                    }
                });
            } else {
                // Invio la prenotazione al server
                auth.book(assetID, startDateTime, endDateTime, (result) => {
                    console.log(result);
    
                    if(result.success) {
                        container.close();
                    } else {
                        errorLabel.innerText = `Impossibile prenotare ${assetName}:\n${result.message}`;
                    }
                });
            }
        };

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

        bookForm.appendChild(dataLabel);
        bookForm.appendChild(inputDate);
        bookForm.appendChild(oraLabel);
        bookForm.appendChild(startHour);
        bookForm.appendChild(endOraLabel);
        bookForm.appendChild(endHour);
        bookForm.appendChild(buttonSpacer);
        bookForm.appendChild(errorLabel);
        bookForm.appendChild(buttonContainer);

        this.appendChild(bookForm);

        return bookForm;
    }

    close() {
        // fa abbastanza schifo ma who cares
        setTimeout(() => {
            this.remove();
            
            if(this.shouldReload === true) {
                window.location.reload();
            }
        }, 240);

        this.setAttribute("closing", "");
    }
}

customElements.define("zam-booking-sidebar", BookingSidebar);