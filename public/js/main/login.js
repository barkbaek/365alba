$(document).ready(function() {
    var submit = function (e) {
        e.preventDefault();
        var member_type = $("input[name='member-type']:checked").val();
        var email = $("#email").val();
        var password1 = $("#password1").val();
        if ((email === "") || (password1 === "")) {
            return show_bert("danger", 2000, "이메일과 비밀번호를 입력하세요.");
        }
        if (is_email_valid(email) === false) {
            return show_bert("danger", 2000, "잘못된 이메일 형식입니다.");
        }
        var encoded_email = get_encoded_html_preventing_xss(email);
        if ( encoded_email !== email ) {
            return show_bert("danger", 2000, "잘못된 이메일 형식입니다.");
        }
        if (is_password_format_valid(password1) !== true) {
            return show_bert("danger", 2000, is_password_format_valid(password1));
        }
        var s_cb = function (result) {
            if ( result['response'] === true ) {
                window.location = "/";
            } else {
                if (result.msg === "no_nick_name") {
                    window.location = "/set/nick-name";
                } else if (result.msg === "server_error") {
                    return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                } else if (result.msg === "wrong_info") {
                    return show_bert("danger", 2000, "잘못된 정보입니다. 잠시 후 다시 시도해주세요.");
                } else if (result.msg === 'not_verified') {
                    return show_bert("danger", 2000, "이메일을 인증해주세요.");
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
                email:encodeURIComponent(email),
                password:encodeURIComponent(password1)
            },
            pathname:"/login",
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