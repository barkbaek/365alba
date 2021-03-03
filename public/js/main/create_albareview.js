$(document).ready(function() {
    // textarea autosize
    $("textarea").on('keydown keyup', function () {
        $(this).height(1).height( $(this).prop('scrollHeight')+12 );
    });
    $(document).on("keyup", "input[type='text']#tags", function (e) {
        if (is_ie() === false) {
            var text = $(e.currentTarget).val().replace(/\s+/gi, '').toLowerCase();
            $(e.currentTarget).val(text);
        }
    });

    var submit = function (e) {
        e.preventDefault();
        var data = {};
        var title = $("#title").val();
        var content = $("#content").val();
        var temp = $("#tags").val();
        temp  = temp.split("#");

        var tags = [];
        for (var i = 0; i < temp.length; i++) {
            if (temp[i] !== "") {
                tags.push(temp[i]);
            }
        }

        data.title = encodeURIComponent(title);
        data.content = encodeURIComponent(content);
        data.tags = encodeURIComponent(JSON.stringify(tags));

        var s_cb = function (result) {
            if ( result['response'] === true ) {
                window.location = result.path;
            } else {
                if (result.msg === "server_error") {
                    return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                } else if (result.msg === "no_user") {
                    return show_bert("danger", 2000, "개인서비스 로그인 후 다시 시도해주세요.");
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
            pathname:"/create-albareview",
            s_cb:s_cb,
            f_cb:f_cb
        });
    };
    $(document).on("submit", "#create-albareview-form", function(e) {
        submit(e);
        return false;
    });
    $(document).on("click", "#create-albareview-submit", function(e) {
        submit(e);
        return false;
    });
});