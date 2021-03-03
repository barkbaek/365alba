$(document).ready(function() {
    var updated_at = $(".resume-updated-at").attr("data-updated-at");
    var date = new Date(parseInt(updated_at));
    $(".resume-updated-at").html(get_date(date));

    /* 스크랩 버튼 클릭 이벤트 */
    $(document).on("click", ".resume-scrap", function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("data-id");
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
            pathname:"/scrap-toggle-resume",
            s_cb:s_cb,
            f_cb:f_cb
        });
        return false;
    });

    /* 전화번호 확인하기 클릭 이벤트 */
    $(document).on("click", "#phone", function (e) {
        e.preventDefault();
        var is_loggedin = $("body").attr("is-loggedin") === "true";
        if (is_loggedin === true) {
            modal("#check-phone-prompt", "open");
        } else {
            modal("#request-login-prompt", "open");
        }
        return false;
    });

    $(document).on("click", ".btn-cancel", function (e) {
        e.preventDefault();
        modal("#check-phone-prompt", "close");
        return false;
    });

    $(document).on("click", "#btn-confirm", function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("data-id");
        var s_cb = function (result) {
            modal("#check-phone-prompt", "close");
            if ( result['response'] === true ) {
                window.location.reload();
            } else {
                if (result.msg === "server_error") {
                    return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                } else if (result.msg === "no_points") {
                    return show_bert("danger", 2000, "포인트가 부족합니다. 충전 후 다시 시도해주세요.");
                } else {
                    return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                }
            }
        };
        var f_cb = function () {
            modal("#check-phone-prompt", "close");
            return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
        };
        methods["the_world"]["is_one"]({
            show_animation: true,
            data: {id: encodeURIComponent(id)},
            pathname:"/pay-phone",
            s_cb:s_cb,
            f_cb:f_cb
        });
        return false;
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