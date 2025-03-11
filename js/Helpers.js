let Helpers = {
    isMobile: function() {
        if(window.matchMedia("(max-width: 800px)").matches) {
            return true;
        }

        return false;
    },
    redir: function(url) {
        location.href = url;
    },
    getHTMLDayString: function(day) {
        switch(day) {
            case 1:
                return "Luned&igrave;";
            case 2:
                return "Marted&igrave;";
            case 3:
                return "Mercoled&igrave;";
            case 4:
                return "Giovedi&igrave;"
            case 5:
                return "Venerd&igrave;";
            case 6:
                return "Sabato";
            case 7:
                return "Domenica";
            default:
                return "Giorno non valido";
        }
    }
}