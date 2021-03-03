$(document).ready(function() {
    var created_at = $(".created-at").attr("data-created-at");
    var date = new Date(parseInt(created_at));
    $(".created-at").html("등록일 " + get_date(date));
    var updated_at = $(".updated-at").attr("data-updated-at");
    date = new Date(parseInt(updated_at));
    $(".updated-at").html("수정일 " + get_date(date));

    $(".comment-created-at").each(function (i) {
        created_at = $(this).attr("data-created-at");
        date = new Date(parseInt(created_at));
        $(this).html(get_date(date));
    });

    // 댓글 등록 클릭 이벤트
    $(document).on("click", "#create-comment", function (e) {
        e.preventDefault();
        var comment = $("#comment").val();
        var id = $(this).attr("data-id");
        var s_cb = function (result) {
            if ( result['response'] === true ) {
                $("#comment").val("");
                var nick_name = $("#user-nick-name").text();
                var div1 = '<div class="remove-comment" data-id="' + id + '" data-comment-id="' + result.id + '">삭제</div>';
                var span1 = '<span class="user-nick-name">' + nick_name + '</span>';
                var date = new Date().valueOf();
                var span2 = '<span class="comment-created-at" data-created-at="' + date + '">' + get_date(date) + '</span>';
                var div2 = '<div>' + span1 + '&nbsp;|&nbsp;' + span2 + '</div>';
                var div3 = '<div class="comment-content">' + comment + '</div>';
                var div4 = '<div class="comment">' + div1 + div2 + div3 + '</div>';
                var html = $.parseHTML(div4);
                $(".comments").append(html);
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
                id: encodeURIComponent(id),
                comment: encodeURIComponent(comment)
            },
            pathname:"/create-comment",
            s_cb:s_cb,
            f_cb:f_cb
        });
        return false;
    });

    // 댓글 삭제 클릭 이벤트
    $(document).on("click", ".remove-comment", function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("data-id");
        var comment_id = $(e.currentTarget).attr("data-comment-id");
        var s_cb = function (result) {
            if ( result['response'] === true ) {
                $(e.currentTarget).parent().remove();
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
                id: encodeURIComponent(id),
                comment_id: encodeURIComponent(comment_id)
            },
            pathname:"/remove-comment",
            s_cb:s_cb,
            f_cb:f_cb
        });
        return false;
    });
    $(document).on("click", "#edit", function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("data-id");
        window.location = "/edit-albaboard/" + id;
        return false;
    });


    $(document).on("click", "#remove", function (e) {
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
                window.location = "/albaboard";
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