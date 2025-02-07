function HomePage() {
    var map = new ZAMMap(ZAMMapType.Floor, "lib/zam-map/");

    var sidebar = document.getElementById("zam-sidebar");
    var sidebarIcon = document.getElementById("sidebar-icon");

    sidebarIcon.onclick = (event) => {
        ToggleSidebar(event, sidebar);
    };

    sidebar.onmouseenter = (event) => {
        sidebar.setAttribute("open", "");
    }

    sidebar.onmouseleave = (event) => {
        sidebar.removeAttribute("open");
    }
}

function ToggleSidebar(event, /**@type {HTMLElement} */ sidebar) {
    if(sidebar.hasAttribute("open")) {
        sidebar.removeAttribute("open");
    } else {
        sidebar.setAttribute("open", "");
    }
}

window.onload = () => {
    HomePage();
}