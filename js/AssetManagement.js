function AssetManagement() {
    var auth = new ZAMAuth();

    auth.getUserInfo((info) => {
        if(info.type != ZAMUserType.GESTORE) {
            Helpers.redir("./index.html");
        }
    });

    auth.getAllAssets((data) => {
        console.log(data);

        var main = document.getElementById("main");

        var container = document.createElement("div");
        container.className = "scroll-container";
        container.style.marginTop = "10px";

        for(var asset of data) {
            var assetContainer = document.createElement("div");
            assetContainer.className = "asset-container"
            assetContainer.setAttribute("z-id", asset.id);
            assetContainer.setAttribute("active", asset.active);

            var nameLabel = document.createElement("h2");
            nameLabel.innerText = asset.nome;

            var detailsLabel = document.createElement("p");
            detailsLabel.innerText = `Tipo ${asset.tipo} | Piano ${asset.piano}`;

            assetContainer.appendChild(nameLabel);
            assetContainer.appendChild(detailsLabel);

            assetContainer.addEventListener("click", (e) => {
                let id = e.target.getAttribute("z-id");
                id = parseInt(id);

                let active = e.target.getAttribute("active");

                console.log(active);

                if(active === "true") {
                    auth.disableAsset(id, (data) => {
                        if(data.success) {
                            e.target.setAttribute("active", false);
                        }
                    });

                } else {
                    auth.enableAsset(id, (data) => {
                        if(data.success) {
                            e.target.setAttribute("active", true);
                        };
                    });
                }
            });

            container.appendChild(assetContainer);
        }

        main.appendChild(container);
    })
}

window.addEventListener("load", () => {
    ZAMSidebar.load(AssetManagement);
});