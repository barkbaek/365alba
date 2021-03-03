$(document).ready(function() {
    // textarea autosize
    $("textarea").on('keydown keyup', function () {
        $(this).height(1).height( $(this).prop('scrollHeight')+12 );
    });

    var submit = function (e) {
        e.preventDefault();
        var data = {};
        var title = $("#title").val();
        var content = $("#content").val();
        data.title = encodeURIComponent(title);
        data.content = encodeURIComponent(content);
        var s_cb = function (result) {
            if ( result['response'] === true ) {
                window.location = "/event-winners";
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
            data: data,
            pathname:"/create-event-winners",
            s_cb:s_cb,
            f_cb:f_cb
        });
    };
    $(document).on("submit", "#create-event-winners-form", function(e) {
        submit(e);
        return false;
    });
    $(document).on("click", "#create-event-winners-submit", function(e) {
        submit(e);
        return false;
    });
});