function FillAccount() {
    var auth = new ZAMAuth();

    //ID da modificare:
    //AccountUtente deve avere il nome utente: 'Minna Abdelkhalek'
    //AccountTipo deve essere così: 'Profilo $TIPO | Coordinatore: $NOMECORDINATORE' dopo il | solo in caso che egli abbia un coordinatore
    
    auth.getUserInfo((data) => {
        console.log(data);
        
        var accountUtente = document.getElementById("AccountUtente");
        var accountTipo = document.getElementById("AccountTipo");

        var tipo = data.type;
        tipo = tipo.toLowerCase();
        tipo = tipo.charAt(0).toUpperCase() + tipo.slice(1);

        accountUtente.innerText = `${data.nome} ${data.cognome}`;
        accountTipo.innerText = `Profilo ${tipo}`;

        if(data.coord != null && data.coord != undefined) {
            accountTipo.innerText += ` | Coordinatore: ${data.coord.nome} ${data.coord.cognome}`;
        };

        if(data.type == ZAMUserType.COORDINATORE) {
            var Padre = document.getElementById("AccountCoordinatori");
            Padre.style.display = "Flex";

            //Creazione dei suoi sottomessi
            auth.getCoordinatedUsers((users) => {
                for(var user of users) {
                    var AccountQuadrato = document.createElement("div");
                    var AccountQuadratoSopra = document.createElement("div")
                    var ZAMLogo = document.createElement("img");
                    var AccountQuadratoNome = document.createElement("h1")
                    var AccountQuadratoTitolo = document.createElement("h1")
                    var AccountPulsante = document.createElement

                    AccountQuadrato.id = "AccountQuadrato";
                    AccountQuadratoSopra.id = "AccountQuadratoSopra";
                    ZAMLogo.className = "ZAMLogo";
                    AccountQuadratoNome.id = "AccountQuadratoNome";
                    AccountQuadratoTitolo.id = "AccountQuadratoTitolo";

                    ZAMLogo.src = "svg/Account.svg"
                    ZAMLogo.style = "height: 50px; font-size: 5px; margin-left: 12px;"

                    AccountQuadratoNome.innerHTML = `${user.nome} ${user.cognome}`;
                    AccountQuadratoTitolo.innerHTML = "Prenotazioni Recenti:";

                    document.getElementById("AccountPadre").appendChild(AccountQuadrato);
                    AccountQuadrato.appendChild(AccountQuadratoSopra);
                    AccountQuadratoSopra.appendChild(ZAMLogo)
                    AccountQuadratoSopra.appendChild(AccountQuadratoNome)
                    AccountQuadrato.appendChild(AccountQuadratoTitolo);

                    auth.getActiveBookings((Books) => {
                        for(var book of Books) {
                            console.log(book)
                        }
                    })
                };
            });
        };
    });
}

window.addEventListener("load", () => {
    ZAMSidebar.load(FillAccount);
});