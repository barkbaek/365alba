var toggle_mobile_menu = function () {
    if ( $("#mobile-right-menu").css("right") === "0px" ) {
        $("#overlay").css("display", "none");
        $("#mobile-right-menu").css("display", "none");
        $("#mobile-right-menu").css("right", "-320px");
    } else {
        $("#overlay").css("display", "block");
        $("#mobile-right-menu").css("display", "block");
        $("#mobile-right-menu").css("right", "0px");
    }
};
$(document).ready(function() {
    $(document).on('mouseenter', '.menu.desktop-only ul li', function (e) {
        e.preventDefault();
        var id = e.currentTarget.id;
        if (id === "menu-desktop-1") {
            $("#menu-overlay-1").css("display", "table");
        } else if (id === "menu-desktop-2") {
            $("#menu-overlay-2").css("display", "table");
        } else if (id === "menu-desktop-3") {
            $("#menu-overlay-3").css("display", "table");
        } else if (id === "menu-desktop-4") {
            $("#menu-overlay-4").css("display", "table");
        } else if (id === "menu-desktop-5") {
            $("#menu-overlay-5").css("display", "table");
        } else if (id === "menu-desktop-6") {
            $("#menu-overlay-6").css("display", "table");
        } else if (id === "menu-desktop-7") {
            $("#menu-overlay-7").css("display", "table");
        }
        return false;
    });
    $(document).on('mouseleave', '.menu-overlay', function (e) {
        e.preventDefault();
        $(".menu-overlay").css("display", "none");
        return false;
    });
    $(document).on("click", "#mobile-menu #menu-btn-mobile, #mobile-right-menu .close", function (e) {
        e.preventDefault();
        toggle_mobile_menu();
        return false;
    });
});