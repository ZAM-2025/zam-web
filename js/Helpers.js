var _callbacks = [];

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
        console.log(day);
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
            case 0:
                return "Domenica";
            default:
                return "Giorno non valido";
        }
    },
    isDebug: function() {
        return location.hostname == "localhost" || location.hostname == "172.20.10.5";
    },
    // Lettura di un file. Se presente, utilizza il percorso relativo indicato.
    // Parametri di chiamata:
    // path: Stringa con il percorso del file da leggere
    // cbk: funzione di callback, eseguita quando i contenuti del file vengono caricati
    // La funzione di callback deve accettare un solo parametro, che verrà
    // "riempito" con una stringa contentente il testo del file.
    readFile: function(path, cbk) {
        var client = new XMLHttpRequest();
        client.open('GET', path);
        client.onreadystatechange = function() {
            if(client.readyState == 4 && client.status == 200
                && client.responseText) {
                cbk(client.responseText);
            }
        }
        client.send();
    },
    // Controlla se la pagina è in esecuzione su un PC o su un telefono.
    isMobile: function() {
        if(window.matchMedia("(max-width: 800px)").matches) {
            return true;
        }

        return false;
    },
    onLoad: function(callback) {
        _callbacks.push(callback);

        window.addEventListener("load", () => {
            _callbacks.forEach((c) => {
                c();
            })
        });
    },
    logOut: async function() {
        var auth = new ZAMAuth();
        
        await auth.logout((data) => {
            if(data.success) {
                window.location.reload();
            } else {
                console.log("Failed to log out");
            }
        });
    }
}

//if(Helpers.isDebug()) {
//    console.log("Running on localhost");
//
//    const pageEnd = performance.mark('pageEnd');
//    const loadTime = parseInt(pageEnd.startTime);
//
//    var debugMarker = document.createElement("div");
//    debugMarker.className = "debug-marker";
//    debugMarker.innerText = "DEBUG";
//
//    debugMarker.onmouseover = () => {
//        console.log("aaa");
//        debugMarker.innerText = "Page Load: " + loadTime + "ms";
//
//        var auth = new ZAMAuth();
//        auth.getUserInfo((data) => {
//            debugMarker.innerHTML += "<br>";
//            debugMarker.innerText += "Utente: " + data.username;
//            debugMarker.innerHTML += "<br>";
//            debugMarker.innerText += "Tipo: " + data.type;
//        });
//    };
//    
//    debugMarker.onmouseout = () => {
//        debugMarker.innerText = "DEBUG";
//    }
//    
//    document.body.appendChild(debugMarker);
//}