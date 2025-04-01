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
    },
    isDebug: function() {
        return location.hostname == "localhost"
    }
}

addEventListener("load", () => {
    if(Helpers.isDebug()) {
        console.log("Running on localhost");

        const pageEnd = performance.mark('pageEnd');
        const loadTime = parseInt(pageEnd.startTime);

        var debugMarker = document.createElement("div");
        debugMarker.className = "debug-marker";
        debugMarker.innerText = "DEBUG";

        debugMarker.onmouseover = () => {
            debugMarker.innerText = "Pagina caricata in " + loadTime + "ms";
        };

        debugMarker.onmouseout = () => {
            debugMarker.innerText = "DEBUG";
        }
        
        document.body.appendChild(debugMarker);
    }
});