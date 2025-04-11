let ZAMUserCard = {
    create: function(data, container) {
        console.log(data);

        var card = document.createElement("zam-booking-card");
        
        var title = document.createElement("h2");
        title.innerText = `${data.nome} ${data.cognome}`;

        var spacer = document.createElement("zam-spacer");

        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "Elimina";

        var userID = data.id;

        deleteButton.onclick = () => {
            var dialog = confirm(`Sei sicuro di voler cancellare l'utente ${data.nome} ${data.cognome}?`);

            if(dialog) {
                var auth = new ZAMAuth();

                auth.deleteUser(userID, (data) => {
                    console.log(data);
                    if(data.success) {
                        location.reload();
                    } else {
                        alert("Errore nella cancellazione!");
                    }
                });
            }
        };

        var editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.innerText = "Modifica";

        editButton.onclick = () => {
            var bookingSidebar = new BookingSidebar();
            bookingSidebar.add(assetName, startTime, endTime, !isBooked, bookingID, true);
        };

        card.appendChild(title);

        if(data.type == ZAMUserType.DIPENDENTE && data.coord != null) {
            console.log(`coordinatore di ${data.nome}: ${data.coord.nome} ${data.coord.cognome}`)

            var subtitle = document.createElement("p");
            subtitle.innerText = `Coordinatore: ${data.coord.nome} ${data.coord.cognome}`;

            card.appendChild(subtitle);
        }

        card.appendChild(spacer);
        card.appendChild(editButton);
        card.appendChild(deleteButton);

        container.appendChild(card);
    }
};