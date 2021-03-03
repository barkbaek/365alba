$(document).ready(function() {
    $(".created-at").each(function (i) {
        var created_at = $(this).attr("created-at");
        var date = new Date(parseInt(created_at));
        $(this).html(get_date(date));
    });
});
