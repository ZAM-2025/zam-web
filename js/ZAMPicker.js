class ZAMPicker extends HTMLElement {
    constructor(elements) {
        super();
    }

    // element: {
    //     label: "example",
    //     id: 0
    // }
    add(elements) {
        if(elements != undefined) {
            this.elements = elements;
            this.selected = elements[0].id;
        }

        for(var element of this.elements) {
            var item = document.createElement("div");
            item.className = "zam-picker-item";
            item.innerText = element.label;

            item.setAttribute("value", element.id);

            if(this.selected == element.id) {
                item.setAttribute("selected", "");
            }

            this.appendChild(item);
        }

        for(var child of this.children) {
            child.onclick = (e) => {
                this.selected = e.target.getAttribute("value");
                this.innerHTML = "";
                this.add();

                if(this.onchange != null || this.onchange != undefined) {
                    this.onchange(this.selected);
                }
            };
        }
    }

    setOnChange(callback) {
        this.onchange = callback;
    }
}

customElements.define("zam-picker", ZAMPicker);