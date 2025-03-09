let Helpers = {
    isMobile: function() {
        if(window.matchMedia("(max-width: 800px)").matches) {
            return true;
        }

        return false;
    },
    redir: function(url) {
        location.href = url;
    }
}