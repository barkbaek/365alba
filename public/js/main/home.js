$(document).ready(function() {
    $(".home-content-item-date").each(function(i) {
        var created_at = $(this).attr("data-created-at");
        var date = new Date(parseInt(created_at));
        var text = date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일 ";
        $(this).html(text);
    });

    $(document).on('submit', 'form#search', function (e) {
        e.preventDefault();
        var text = $('#search-input').val()
            , pathname;
        pathname = '/search?type=total&query=' + encode_for_url(text);
        window.location = pathname;
        return false;
    });
    $(document).on('click', '#search-submit', function (e) {
        e.preventDefault();
        var text = $('#search-input').val()
            , pathname;
        pathname = '/search?type=total&query=' + encode_for_url(text);
        window.location = pathname;
        return false;
    });
});