function HomePage() {
    var map = new ZAMMap(ZAMMapType.Ground, "lib/zam-map/");
}

window.addEventListener("load", () => {
    ZAMSidebar.load(HomePage);
});