$(document).ready(function() {
    var submit = function (e) {
        e.preventDefault();
        var member_type = $("input[name='member-type']:checked").val();
        var email = $("#email").val();
        if (email === "") {
            return show_bert("danger", 2000, "이메일을 입력하세요.");
        }
        if (is_email_valid(email) === false) {
            return show_bert("danger", 2000, "잘못된 이메일 형식입니다.");
        }
        var encoded_email = get_encoded_html_preventing_xss(email);
        if ( encoded_email !== email ) {
            return show_bert("danger", 2000, "잘못된 이메일 형식입니다.");
        }
        var s_cb = function (result) {
            if ( result['response'] === true ) {
                window.location = "/success/sent-reset-password";
            } else {
                if (result.msg === "server_error") {
                    return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                } else if (result.msg === "wrong_info") {
                    return show_bert("danger", 2000, "잘못된 정보가 등록되었습니다. 잠시 후 다시 시도해주세요.");
                } else if (result.msg === "email_no_exists") {
                    return show_bert("danger", 2000, "등록되지 않은 이메일입니다.");
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
            data:{
                member_type:encodeURIComponent(member_type),
                email:encodeURIComponent(email)
            },
            pathname:"/forgot-password",
            s_cb:s_cb,
            f_cb:f_cb
        });
    };
    $(document).on("submit", "#authorization-form", function(e) {
        submit(e);
        return false;
    });
    $(document).on("click", "#authorization-submit", function(e) {
        submit(e);
        return false;
    });
});