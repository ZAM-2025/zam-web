// TODO: Implementare vera validazione
var __captchaID = null;

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

function ContinueAccedi() {
    var Prossimo = document.getElementById("ContinuaCaptcha");
    var Precedente = document.getElementById("ContinuaAccedi");

    Prossimo.style.display = "flex";
    Precedente.style.display = "none";

    document.getElementsByClassName("AccediTextTitolo")[0].innerHTML = "Captcha"
    document.getElementsByClassName("AccediText")[0].innerHTML = "Prima di accedere al portale, dobbiamo verificare che tu non sia un robot"

    var session = new CaptchaSession("http", window.location.hostname + ":8080", "lib/zamcaptcha-js", (data) => {
        console.log(data);
        __captchaID = null;

        if(data.success) {
            __captchaID = data.id;
            document.getElementsByClassName('zamcaptcha-button')[0].type = "submit";
            document.getElementsByClassName('zamcaptcha-button')[0].click();
        }
    });

    session.setFetchCallback(() => {
        __captchaID = null;
    });
}

function SendLogin(data) {
    data.preventDefault();

    if(__captchaID == null) {
        alert("Captcha non inserito!");
        return;
    }

    let username = data.target.username.value;
    let password = data.target.password.value;

    var auth = new ZAMAuth();
    auth.auth(username, password, __captchaID, true, (response) => {
        if(response.success) {
            RedirHome();
        } else {
            alert("ZAM: Accesso fallito :(\n" + response.message);
        }
    });
}

window.addEventListener("load", () => {
    var userElem = document.getElementById("username");
    var passElem = document.getElementById("password");
    var continueButton = document.getElementById("zam-continue");

    setInterval(() => {
        ValidateLogin(userElem.value, passElem.value, continueButton);
    }, 200);
});