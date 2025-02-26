// TODO: Implementare vera validazione
function ValidateLogin(user, pass, elem) {
    if (user && pass) {
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

function RedirHome() {
    window.location.href = "./index.html";
}

function SendLogin(data) {
    data.preventDefault();

    let username = data.target.username.value;
    let password = data.target.password.value;

    var auth = new ZAMAuth("http://localhost:8080");
    auth.auth(username, password, true, (response) => {
        if(response.success) {
            RedirHome();
        } else {
            alert("ZAM: Accesso fallito :(\n" + response.message);
        }
    });
}

window.onload = () => {
    var userElem = document.getElementById("username");
    var passElem = document.getElementById("password");
    var submitButton = document.getElementById("zam-submit");

    setInterval(() => {
        ValidateLogin(userElem.value, passElem.value, submitButton);
    }, 200);
};