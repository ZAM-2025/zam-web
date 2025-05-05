let ZAMBookingCard = {
    create: function(data, container, isOld, isCoord) {
        console.log(data);
        var card = document.createElement("zam-booking-card");
        
        var assetName = data.assetName;
        var assetFloor = data.assetFloor;
        var bookingStart = data.booking.inizio;
        var bookingEnd = data.booking.fine;
        var bookingID = data.booking.id;
        var isBooked = data.booking.booked;
        var isActive = data.active;

        var bookingDate = new Date(bookingStart);
        var bookingDay = Helpers.getHTMLDayString(bookingDate.getDay());
        var bookingDayMonth = bookingDate.getDate() + "/" + (bookingDate.getMonth() + 1);

        var startTime = String(bookingDate.getHours()).padStart(2, '0') + ":" + String(bookingDate.getMinutes()).padStart(2, '0');

        var endDate = new Date(bookingEnd);
        var endTime = String(endDate.getHours()).padStart(2, '0') + ":" + String(endDate.getMinutes()).padStart(2, '0');

        console.log(bookingDay, bookingDayMonth);

        var title = document.createElement("h2");
        title.innerText = assetName;

        var info = document.createElement("p");
        info.innerHTML = `${bookingDay} ${bookingDayMonth} | ${startTime} - ${endTime}`;

        var spacer = document.createElement("zam-spacer");

        if(isOld == undefined || isOld == null) {
            var deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.innerText = "Elimina";
    
            deleteButton.onclick = () => {
                var dialog = confirm("Sei sicuro di voler cancellare questa prenotazione?");
    
                if(dialog) {
                    var auth = new ZAMAuth();
    
                    if(isCoord != undefined && isCoord != null && isCoord == true) {
                        auth.deleteBookingFor(bookingID, (data) => {
                            if(data.success) {
                                location.reload();
                            } else {
                                alert("Errore nella cancellazione!");
                            }
                        });
                    } else {
                        auth.deleteBooking(bookingID, (data) => {
                            if(data.success) {
                                location.reload();
                            } else {
                                alert("Errore nella cancellazione!");
                            }
                        });
                    }
                }
            };
    
            var editButton = document.createElement("button");
            editButton.className = "edit-button";
            editButton.innerText = "Modifica";
    
            editButton.onclick = () => {
                var bookingSidebar = new BookingSidebar();
                bookingSidebar.add(assetName, startTime, endTime, !isBooked, bookingID, true, true, isActive, isCoord);
            };
    
            card.appendChild(title);
            card.appendChild(info);
            card.appendChild(spacer);
            card.appendChild(editButton);
            card.appendChild(deleteButton);
        } else if(isOld === true) {
            var rebookButton = document.createElement("button");
            rebookButton.className = "edit-button";
            rebookButton.innerText = "Riprenota";
    
            rebookButton.onclick = () => {
                var bookingSidebar = new BookingSidebar();
                bookingSidebar.add(assetName, null, null, !isBooked, data.assetID, false, true, isActive);
            };

            card.appendChild(title);
            card.appendChild(info);
            card.appendChild(spacer);
            card.appendChild(rebookButton);
        }

        container.appendChild(card);
    }
};