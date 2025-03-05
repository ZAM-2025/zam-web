class ZAMConditional extends HTMLElement {
    constructor() {
        super();
    }
}

let ZAMConditionals = {
    findAll() {
        return document.querySelectorAll("[zam-conditional]");
    },
    findConditions(condition) {
        var all = document.querySelectorAll("[zam-conditional]");
        var ret = [];

        for(var elem of all) {
            if(elem.getAttribute("zam-conditional") == condition) {
                ret.push(elem);
            }
        }

        return ret;
    }
};

customElements.define("zam-conditional", ZAMConditional);