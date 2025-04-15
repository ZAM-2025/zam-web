class Sidebar extends HTMLElement {
    constructor() {
        super();

        this.onclick = this.handleClick;
        this.onmouseover = this.handleHover;
    }

    handleClick(ev) {
        console.log(ev);
    }

    handleHover(ev) {
        
    }
}

customElements.define("zam-sidebar", Sidebar);

let ZAMSidebar = {
    switchIcon: function(value){
        //Variabili
        var Big = document.getElementById("sidebar-iconBig");
        var Small = document.getElementById("sidebar-icon");
    
        ZAMSidebar.iconSize(value);
        ZAMSidebar.esciSize(value);
    
        if (value) {
            Big.style.display = "block";
            Small.style.display = "none";
    
            // Animazione
            var id = null;
            var altezza = 35;
            clearInterval(id);
            id = setInterval(frame, 7);
            function frame() {
                if (altezza == 45) {
                    clearInterval(id);
                } else {
                    altezza++; 
                    Big.style.height = altezza + 'px'; 
                }
            }        
    
            //Reimposto
            Small.style.height = "45px";
        }else{
            Big.style.display = "none";
            Small.style.display = "block";
    
            // Animazione
            var id = null;
            var altezza = 45;
            clearInterval(id);
            id = setInterval(frame, 7);
            function frame() {
                if (altezza == 35) {
                    clearInterval(id);
                } else {
                    altezza--; 
                    Small.style.height = altezza + 'px'; 
                }
            }        
    
            //Reimposto
            Big.style.height = "35px";
        }
    },
    
    iconSize: function(value) {
        //Variabili
        var Icon = document.getElementById("SidebarAccIcon");
    
        if (value) {
            var id = null;
            var altezza = 29;
            clearInterval(id);
            id = setInterval(frame, 2);
            function frame() {
                if (altezza == 60) {
                    clearInterval(id);
                } else {
                    altezza++; 
                    Icon.style.height = altezza + 'px'; 
                }
            }        
        }else{
            var id = null;
            var altezza = 60;
            clearInterval(id);
            id = setInterval(frame, 2);
            function frame() {
                if (altezza == 29) {
                    clearInterval(id);
                } else {
                    altezza--; 
                    Icon.style.height = altezza + 'px'; 
                }
            }    
        }
    },
    
    esciSize: function(value){
        //Variabili
        var elem = document.getElementById("EsciAccount")
    
        if (value) {
            elem.style.display = "block"
            var id = null;
            var altezza = 0;
            clearInterval(id);
            id = setInterval(frame, 2);
            function frame() {
                if (altezza == 35) {
                    clearInterval(id);
                } else {
                    altezza++; 
                    elem.style.height = altezza + 'px'; 
                }
            }        
        }else{
            elem.style.display = "none"
            var id = null;
            var altezza = 35;
            clearInterval(id);
            id = setInterval(frame, 2);
            function frame() {
                if (altezza == 0) {
                    clearInterval(id);
                } else {
                    altezza--; 
                    elem.style.height = altezza + 'px'; 
                }
            }    
        }
    },
    
    toggle: function(event, /**@type {HTMLElement} */ sidebar) {
        if(sidebar.hasAttribute("open")) {
            sidebar.removeAttribute("open");
            ZAMSidebar.switchIcon();
        } else {
            sidebar.setAttribute("open", "");
            ZAMSidebar.switchIcon(true);
        }
    },

    loadUserInfo: async function(params) {
        var auth = new ZAMAuth();
    
        let status = await auth.getUserInfo((data) => {
            if(data.success) {
                var nameTitle = document.getElementById("SidebarAccTitle");
                nameTitle.innerText = data.nome + " " + data.cognome;
    
                // Gestione delle parti "condizionali" della pagina
                // Alcune opzioni sono disponibili solo per certi tipi di utente.
                var coordConditionals = ZAMConditionals.findConditions("coord");
                var gestConditionals = ZAMConditionals.findConditions("gest");
                var coordGestConditionals = ZAMConditionals.findConditions("coord|gest");
                var notGestConditionals = ZAMConditionals.findConditions("!gest");
            
                // Solo per coordinatori
                if(data.type == ZAMUserType.COORDINATORE) {
                    coordConditionals.forEach((e) => {
                        e.removeAttribute("zam-conditional");
                    });
    
                    coordGestConditionals.forEach((e) => {
                        e.removeAttribute("zam-conditional");
                    });
                }
                
                // Solo per gestori
                if(data.type == ZAMUserType.GESTORE) {
                    gestConditionals.forEach((e) => {
                        e.removeAttribute("zam-conditional");
                    });
    
                    notGestConditionals.forEach((e) => {
                        e.remove();
                    });
    
                    coordGestConditionals.forEach((e) => {
                        e.removeAttribute("zam-conditional");
                    });
                } else {
                    // Per tutti tranne i coordinatori
                    notGestConditionals.forEach((e) => {
                        e.removeAttribute("zam-conditional");
                    });
                }
            } else {
                Helpers.redir("./login.html");
            }
        });
    
        if(status === false) {
            Helpers.redir("./login.html");
        }
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
    },
    
    load: function(callback) {
        Helpers.readFile("./templates/sidebar.html", (data) => {
            document.body.innerHTML += data;
            
            var sidebarIcon = document.getElementById("sidebar-icon");
            var sidebarIconBig = document.getElementById("sidebar-iconBig")
            var sidebar = document.getElementById("zam-sidebar");
            
            sidebarIcon.onclick = (event) => {
                ZAMSidebar.toggle(event, sidebar);
            };
           
            sidebarIconBig.onclick = (event) => {
                ZAMSidebar.toggle(event, sidebar);
            };
           
            sidebar.onmouseenter = (event) => {
                sidebar.setAttribute("open", "");
                ZAMSidebar.switchIcon(true);
            }
            
            sidebar.onmouseleave = (event) => {
                sidebar.removeAttribute("open");
                ZAMSidebar.switchIcon();
            }
        
            ZAMSidebar.loadUserInfo();
    
            if(callback != undefined && callback != null) {
                callback();
            }
        });    
    }    
};