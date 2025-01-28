function IconLoader(){
    //Aggiunta del font delle icone
    document.head.innerHTML += '<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />';
    
    // Rimpiazzo tutte i tag custom "icon" con span
    for(var i of document.getElementsByTagName("*")) {
        if(i.tagName.toLowerCase() == "icon") {
            var newElem = document.createElement("span");
            newElem.innerHTML = i.innerHTML;
            for(var a of i.attributes) {
                newElem.setAttribute(a.name, a.value);
            }
            newElem.classList.add("material-symbols-outlined");

            i.replaceWith(newElem);
        }
    }
}