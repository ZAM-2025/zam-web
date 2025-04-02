// TODO: Implementare vera validazione

function ValidateLogin(user, pass, nome, congnome, type, elem) {
    if (user && pass && nome && cognome && type != -1) {
        if(elem != null && elem != undefined) {
            EnableButton(elem);
        }

        return true;
    }

    if(elem != null && elem != undefined) {
        DisableButton(elem);
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
    let type = data.target.type.value;

    var auth = new ZAMAuth();
    auth.newUser(username, password, nome, cognome, type, null, (response) => {
        if(response.success) {
            RedirUserPage();
        } else {
            alert("Errore: " + response.message);
        }
    });
}

window.addEventListener("load", () => {
    var userElem = document.getElementById("username");
    var passElem = document.getElementById("password");
    var nomeElem = document.getElementById("nome");
    var cognomeElem = document.getElementById("cognome");
    var tipoElem = document.getElementById("type");
    var continueButton = document.getElementById("zam-submit");

    setInterval(() => {
        ValidateLogin(userElem.value, passElem.value, nomeElem.value, cognomeElem.value, tipoElem.value, continueButton);
    }, 200);
});