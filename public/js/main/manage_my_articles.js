$(document).ready(function() {
    $(".created-at").each(function (i) {
        var created_at = $(this).attr("data-created-at");
        var date = new Date(parseInt(created_at));
        $(this).html("등록일 " + get_date(date));
    });

    // 수정 버튼 클릭 이벤트
    $(document).on("click", ".edit", function (e) {
        e.preventDefault();
        var url = $(e.currentTarget).attr("data-url");
        window.location = url;
        return false;
    });

    // 삭제 버튼 클릭 이벤트
    $(document).on("click", ".remove", function (e) {
        e.preventDefault();
        $("#remove-prompt").attr("data-id", $(e.currentTarget).attr("data-id"));
        modal("#remove-prompt", "open");
        return false;
    });

    $(document).on("click", ".btn-cancel", function (e) {
        e.preventDefault();
        modal("#remove-prompt", "close");
        return false;
    });

    $(document).on("click", "#btn-remove", function (e) {
        e.preventDefault();
        var id = $("#remove-prompt").attr("data-id");
        var s_cb = function (result) {
            if ( result['response'] === true ) {
                window.location.reload();
            } else {
                if (result.msg === "server_error") {
                    return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                } else {
                    return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                }
            }
        };
        var f_cb = function () {
            return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
        };
        methods["the_world"]["is_one"]({
            show_animation: true,
            data: {
                id: encodeURIComponent(id)
            },
            pathname:"/remove-article",
            s_cb:s_cb,
            f_cb:f_cb
        });
        return false;
    });
});