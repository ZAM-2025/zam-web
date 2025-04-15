function FillPrenotazioni() {
    var prenotazioni = document.getElementById("prenotazioni");
    var cronologia = document.getElementById("cronologia");
    var auth = new ZAMAuth();

    auth.getActiveBookings((bookings) => {
        if(bookings.length == 0) {
            prenotazioni.innerHTML = "<h2 gray>Nessuna prenotazione.</h2>";
        }

        for(var booking of bookings) {
            ZAMBookingCard.create(booking, prenotazioni);
        }
    });

    auth.getInactiveBookings((bookings) => {
        if(bookings.length == 0) {
            cronologia.innerHTML = "<h2 gray>Nessuna prenotazione.</h2>";
        }

        for(var booking of bookings) {
            ZAMBookingCard.create(booking, cronologia, true);
        }
    });
}

window.addEventListener("load", () => {
    ZAMSidebar.load(FillPrenotazioni);
});