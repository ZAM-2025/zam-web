class Sidebar extends HTMLElement {
    constructor() {
        super();

        this.onclick = this.handleClick;
        this.onmouseover = this.handleHover;
    }

    handleClick(ev) {
        console.log(ev);
    }

    handleHover(ev) {
        
    }
}

customElements.define("zam-sidebar", Sidebar);