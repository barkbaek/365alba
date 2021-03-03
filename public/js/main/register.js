$(document).ready(function() {
    var submit = function (e) {
        e.preventDefault();
        var member_type = $("input[name='member-type']:checked").val();
        var email = $("#email").val();
        var password1 = $("#password1").val();
        var password2 = $("#password2").val();
        if ((email === "") || (password1 === "") || (password2 === "")) {
            return show_bert("danger", 2000, "이메일과 비밀번호를 입력하세요.");
        }
        if (is_email_valid(email) === false) {
            return show_bert("danger", 2000, "잘못된 이메일 형식입니다.");
        }
        var encoded_email = get_encoded_html_preventing_xss(email);
        if ( encoded_email !== email ) {
            return show_bert("danger", 2000, "잘못된 이메일 형식입니다.");
        }
        if (password1 !== password2) {
            return show_bert("danger", 2000, "입력된 비밀번호가 서로 다릅니다.");
        }
        if (is_password_format_valid(password1) !== true) {
            return show_bert("danger", 2000, is_password_format_valid(password1));
        }
        var s_cb = function (result) {
            if ( result['response'] === true ) {
                window.location = "/success/sent-register";
            } else {
                if (result.msg === "server_error") {
                    return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                } else if (result.msg === "wrong_info") {
                    return show_bert("danger", 2000, "잘못된 정보가 등록되었습니다. 잠시 후 다시 시도해주세요.");
                } else if (result.msg === "email_exists") {
                    return show_bert("danger", 2000, "이미 등록된 이메일입니다.");
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
            pathname:"/register",
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
    $(document).on("keyup", "#password1", function (e) {
        var password = $("#password1").val();
        if (password.search(/[a-zA-Z]/) === -1) {
            $('#password-alphabet-checker').removeClass("format-checker-green").addClass("format-checker-red");
        } else {
            $('#password-alphabet-checker').removeClass("format-checker-red").addClass("format-checker-green");
        }
        if (password.search(/\d/) === -1) {
            $('#password-number-checker').removeClass("format-checker-green").addClass("format-checker-red");
        } else {
            $('#password-number-checker').removeClass("format-checker-red").addClass("format-checker-green");
        }
        if (password.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) === -1) {
            $('#password-special-checker').removeClass("format-checker-green").addClass("format-checker-red");
        } else {
            $('#password-special-checker').removeClass("format-checker-red").addClass("format-checker-green");
        }
        if (password.length < 8) {
            $('#password-length-checker').removeClass("format-checker-green").addClass("format-checker-red");
        } else {
            $('#password-length-checker').removeClass("format-checker-red").addClass("format-checker-green");
        }
    });
});