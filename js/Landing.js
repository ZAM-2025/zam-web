function EsciLanding(){
    var Landing = document.getElementById("Landing");
    var Accedi = document.getElementsByClassName("Accedi")[0];

    Landing.style.display = "none";
    Accedi.style.display = "flex";
}

window.addEventListener("load", () => {
    var Logo = document.getElementById("LandingLogo");
    var Pulsante = document.getElementById("LandingButton");

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function AnimazioneLanding() {
        await wait(200);

        Pulsante.style.display = "flex";
        
        do{
            Logo.style.height = (((getComputedStyle(Logo).height.replace("px","")) - 2) + "px").toString();
            Logo.style.marginBottom = ((parseInt(getComputedStyle(Logo).marginBottom.replace("px","")) + 6) +"px").toString();
            Pulsante.style.height = ((parseInt(getComputedStyle(Pulsante).height.replace("px","")) + 2) +"px").toString();
            await wait(3);
        }while(getComputedStyle(Logo).height.replace("px","") > 124)
    };

    AnimazioneLanding();
});
