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
        }
    });
}

window.addEventListener("load", () => {
    ZAMSidebar.load(FillAccount);
});