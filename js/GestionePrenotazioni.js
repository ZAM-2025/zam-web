function GestionePrenotazioni() {
    var auth = new ZAMAuth();
    var main = document.getElementById("main");

    var i = 0;

    auth.getCoordinatedUsers((users) => {
        for(var user of users) {
            var userLabel = document.createElement("h2");
            userLabel.innerText = `${user.nome} ${user.cognome}`;

            var row = document.createElement("zam-row");
            row.setAttribute("cards", "");
            row.setAttribute("uid", user.id);
            row.id = "u" + i;
            console.log(user);

            main.appendChild(userLabel);
            main.appendChild(row);
            i++;
        }

        // Modo molto stupido per entrare in un contesto asincrono
        // La consegna è domani
        // Aiuto
        (async () => {
            for(var j = 0; j < i; j++) {
                var elem = document.getElementById("u" + j);
    
                var uid = elem.getAttribute("uid");
    
                await auth.getBookedBy(uid, (data) => {
                    if(data.bookings.length == 0) {
                        var _title = document.createElement("h3");
                        _title.innerText = "Nessuna prenotazione.";
                        _title.setAttribute("gray", "");
                        elem.appendChild(_title);
                    }
                    for(var booking of data.bookings) {
                        console.log(elem);
                        ZAMBookingCard.create(booking, elem, undefined, true);
                    }
                });
            }
        })();
    });
}

window.addEventListener("load", () => {
    ZAMSidebar.load(GestionePrenotazioni);
});