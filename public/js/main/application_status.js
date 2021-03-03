$(document).ready(function() {
    $(".alba-created-at").each(function (i) {
        var created_at = $(this).attr("created-at");
        var date = new Date(parseInt(created_at));
        $(this).html(get_date(date));
    });

    /* 스크랩 버튼 클릭 이벤트 */
    $(document).on("click", ".alba-scrap", function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).parent().parent().attr("href").replace("/company/", "");
        var src = $(e.currentTarget).find("img").attr("src");
        var s_cb = function (result) {
            if ( result['response'] === true ) {
                if (src.includes("/icons/star_empty.png")) {
                    $(e.currentTarget).find("img").attr("src", "https://s3.ap-northeast-2.amazonaws.com/images.365alba.com/icons/star.png");
                } else {
                    $(e.currentTarget).find("img").attr("src", "https://s3.ap-northeast-2.amazonaws.com/images.365alba.com/icons/star_empty.png");
                }
            } else {
                if (result.msg === "server_error") {
                } else {
                }
            }
        };
        var f_cb = function () {
        };
        methods["the_world"]["is_one"]({
            show_animation: true,
            data: {id: encodeURIComponent(id)},
            pathname:"/scrap-toggle-alba",
            s_cb:s_cb,
            f_cb:f_cb
        });
        return false;
    });
});