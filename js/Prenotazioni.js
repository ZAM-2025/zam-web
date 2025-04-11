function FillPrenotazioni() {
    var prenotazioni = document.getElementById("prenotazioni");
    var auth = new ZAMAuth();

    auth.getBooked((bookings) => {
        if(bookings.length == 0) {
            prenotazioni.innerHTML = "<h2 gray>Nessuna prenotazione.</h2>";
        }

        for(var booking of bookings) {
            ZAMBookingCard.create(booking, prenotazioni);
        }
    });
}

window.addEventListener("load", () => {
    FillPrenotazioni();
});