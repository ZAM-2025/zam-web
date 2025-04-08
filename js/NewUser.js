// TODO: Implementare vera validazione

function ValidateLogin(user, pass, nome, cognome, coord, elem) {
    if (user && pass && nome && cognome && coord != -1) {
        if(elem != null && elem != undefined) {
            EnableButton(elem);
        }

        return true;
    }

    if(elem != null && elem != undefined) {
        DisableButton(elem);
    }
}

function GetType() {
    var url = new URL(location.href);
    var type = parseInt(url.searchParams.get("type"));
    
    if(type < 0 || type > 1 || isNaN(type)) {
        return 0;
    } else {
        return type;
    }
}

function EnableButton(element) {
    element.removeAttribute("disabled");
}

function DisableButton(element) {
    element.setAttribute("disabled", "");
}

function RedirUserPage() {
    window.location.href = "./gestore.html";
}

function SendLogin(data) {
    data.preventDefault();

    let username = data.target.username.value;
    let password = data.target.password.value;
    let nome = data.target.nome.value;
    let cognome = data.target.cognome.value;
    let coord = data.target.coord.value;

    console.log(coord);

    var auth = new ZAMAuth();
    auth.newUser(username, password, nome, cognome, GetType(), coord, (response) => {
        if(response.success) {
            RedirUserPage();
        } else {
            alert("Errore: " + response.message);
        }
    });
}

window.addEventListener("load", () => {
    var type = GetType();
    var typeString = Object.values(ZAMUserType)[type];
    console.log("type :", typeString);

    var creaText = document.getElementById("crea-text");
    creaText.innerText += " " + typeString.toLowerCase(); 

    var userElem = document.getElementById("username");
    var passElem = document.getElementById("password");
    var nomeElem = document.getElementById("nome");
    var cognomeElem = document.getElementById("cognome");
    var coordElem = document.getElementById("coord");
    var continueButton = document.getElementById("zam-submit");

    new ZAMAuth().getUserInfoByType(ZAMUserType.COORDINATORE, (data) => {
        if(data.success) {
            for(var c of data.list) {
                var coordOption = document.createElement("option");
                coordOption.value = c.id;
                coordOption.innerText = `${c.nome} ${c.cognome}`;

                coordElem.appendChild(coordOption);
            }
        } else {
            // TODO: Gestire errori bene
            alert(data.message);
        }
    });

    setInterval(() => {
        ValidateLogin(userElem.value, passElem.value, nomeElem.value, cognomeElem.value, coordElem.value, continueButton);
    }, 200);
});