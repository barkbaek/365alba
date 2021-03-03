$(document).ready(function() {
    var id = window.location.pathname.replace("/edit-ceoboard/", "");
    var s_cb = function (result) {
        if ( result['response'] === true ) {
            var doc = result.doc;
            $("#title").val(doc.title);
            $("#content").val(doc.content);
            var tags = "";
            for (var i = 0; i < doc.tags.length; i++) {
                tags = tags + "#" + doc.tags[i];
            }
            $("#tags").val(tags);
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
        data: {id:encodeURIComponent(id)},
        pathname:"/get-article",
        s_cb:s_cb,
        f_cb:f_cb
    });

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

        data.id = encodeURIComponent(id);
        data.title = encodeURIComponent(title);
        data.content = encodeURIComponent(content);
        data.tags = encodeURIComponent(JSON.stringify(tags));

        var s_cb = function (result) {
            if ( result['response'] === true ) {
                window.location = "/ceoboard/" + id;
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
            pathname:"/edit-ceoboard",
            s_cb:s_cb,
            f_cb:f_cb
        });
    };
    $(document).on("submit", "#edit-ceoboard-form", function(e) {
        submit(e);
        return false;
    });
    $(document).on("click", "#edit-ceoboard-submit", function(e) {
        submit(e);
        return false;
    });
});