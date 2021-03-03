$(document).ready(function() {
    $(".alba-created-at").each(function (i) {
        var created_at = $(this).attr("created-at");
        var date = new Date(parseInt(created_at));
        $(this).html(get_date(date));
    });
    $(".created-at").each(function (i) {
        var created_at = $(this).attr("created-at");
        var date = new Date(parseInt(created_at));
        $(this).html(get_date(date));
    });
    $(".updated-at").each(function (i) {
        var updated_at = $(this).attr("updated-at");
        var date = new Date(parseInt(updated_at));
        $(this).html(get_date(date));
    });

    var query = $("body").attr("data-query");
    $("#search-input").val( decodeURIComponent(query) );
    $(document).on('submit', 'form#search', function (e) {
        e.preventDefault();
        var text = $('#search-input').val()
            , type = $("body").attr("data-type")
            , pathname;
        if (type === "total") {
            pathname = '/search?type=' + type + '&query=' + encode_for_url(text);
        } else {
            pathname = '/search?type=' + type + '&page=1&query=' + encode_for_url(text);
        }
        window.location = pathname;
        return false;
    });
    $(document).on('click', '#search-submit', function (e) {
        e.preventDefault();
        var text = $('#search-input').val()
            , type = $("body").attr("data-type")
            , pathname;
        if (type === "total") {
            pathname = '/search?type=' + type + '&query=' + encode_for_url(text);
        } else {
            pathname = '/search?type=' + type + '&page=1&query=' + encode_for_url(text);
        }
        window.location = pathname;
        return false;
    });
});