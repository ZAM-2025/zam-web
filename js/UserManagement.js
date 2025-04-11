function UserManagement() {
    var auth = new ZAMAuth();

    var dipendenti = document.getElementById("dipendenti");
    var coordinatori = document.getElementById("coordinatori");

    auth.getUserInfoByType(ZAMUserType.DIPENDENTE, (data) => {
        for(var user of data.list) {
            ZAMUserCard.create(user, dipendenti);
        }
    });

    auth.getUserInfoByType(ZAMUserType.COORDINATORE, (data) => {
        for(var user of data.list) {
            ZAMUserCard.create(user, coordinatori);
        }
    });
}

window.addEventListener("load", () => {
    ZAMSidebar.load(UserManagement);
});