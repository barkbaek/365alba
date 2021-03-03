$(document).ready(function() {
    /* 생년월일 초기화 */
    var is_user = $("body").attr("is-user") === "true";
    var options = "", html;
    if (is_user === true) {
        options = "";
        var current_year = new Date().getFullYear();
        for (var i = current_year; i >= 1880; i--) {
            if (i === 1988) {
                options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
            } else {
                options = options + "<option value='" + i + "'>" + i + "</option>";
            }
        }
        html = $.parseHTML(options);
        $("#birth-year").append(html);

        options = "";
        for (var i = 1; i <= 12; i++) {
            if ( i === 1) {
                options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
            } else {
                options = options + "<option value='" + i + "'>" + i + "</option>";
            }
        }
        html = $.parseHTML(options);
        $("#birth-month").append(html);

        options = "";
        for (var i = 1; i <= 31; i++) {
            if ( i === 1) {
                options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
            } else {
                options = options + "<option value='" + i + "'>" + i + "</option>";
            }
        }
        html = $.parseHTML(options);
        $("#birth-day").append(html);
    }

    /* 주소 초기화 */
    var si = area.si();
    options = "";
    for (var i = 0; i < si.length; i++) {
        if (i === 0) {
            options = options + "<option value='" + si[i] + "' selected='selected'>" + si[i] + "</option>";
        } else {
            options = options + "<option value='" + si[i] + "'>" + si[i] + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#address-si").append(html);

    var goo = area.goo(si[0]);
    options = "";
    for (var i = 0; i < goo.length; i++) {
        if (i === 0) {
            options = options + "<option value='" + goo[i] + "' selected='selected'>" + goo[i] + "</option>";
        } else {
            options = options + "<option value='" + goo[i] + "'>" + goo[i] + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#address-goo").append(html);

    var dong = area.dong(si[0], goo[0]);
    options = "";
    for (var i = 0; i < dong.length; i++) {
        if (i === 0) {
            options = options + "<option value='" + dong[i] + "' selected='selected'>" + dong[i] + "</option>";
        } else {
            options = options + "<option value='" + dong[i] + "'>" + dong[i] + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#address-dong").append(html);

    var submit = function (e) {
        e.preventDefault();
        var data = {};
        var is_user = $("body").attr("is-user") === "true";
        var user_name
            , company_name
            , nick_name
            , sex
            , phone
            , business_number
            , address_si
            , address_goo
            , address_dong
            , address_detail
            , birth_year
            , birth_month
            , birth_day;
        data.is_user = encodeURIComponent(is_user);
        if (is_user === true) {
            user_name = $("#user-name").val();
            nick_name = $("#nick-name").val();
            sex = $("input[name='sex']:checked").val();
            phone = $("#phone").val();
            address_si = $("#address-si option:selected").text();
            address_goo = $("#address-goo option:selected").text();
            address_dong = $("#address-dong option:selected").text();
            birth_year = $("#birth-year option:selected").text();
            birth_month = $("#birth-month option:selected").text();
            birth_day = $("#birth-day option:selected").text();
            if (user_name === "") {
                return show_bert("danger", 2000, "이름을 입력하세요.");
            }
            if (nick_name === "") {
                return show_bert("danger", 2000, "닉네임을 입력하세요.");
            }
            if (phone === "") {
                return show_bert("danger", 2000, "전화번호를 입력하세요.");
            }
            data.user_name = encodeURIComponent(user_name);
            data.nick_name = encodeURIComponent(nick_name);
            data.sex = encodeURIComponent(sex);
            data.phone = encodeURIComponent(phone);
            data.address_si = encodeURIComponent(address_si);
            data.address_goo = encodeURIComponent(address_goo);
            data.address_dong = encodeURIComponent(address_dong);
            data.birth_year = encodeURIComponent(birth_year);
            data.birth_month = encodeURIComponent(birth_month);
            data.birth_day = encodeURIComponent(birth_day);
        } else {
            company_name = $("#company-name").val();
            nick_name = $("#nick-name").val();
            phone = $("#phone").val();
            business_number = $("#business-number").val();
            address_si = $("#address-si option:selected").text();
            address_goo = $("#address-goo option:selected").text();
            address_dong = $("#address-dong option:selected").text();
            address_detail = $("#address-detail").val();
            if (company_name === "") {
                return show_bert("danger", 2000, "회사명을 입력하세요.");
            }
            if (nick_name === "") {
                return show_bert("danger", 2000, "닉네임을 입력하세요.");
            }
            if (phone === "") {
                return show_bert("danger", 2000, "전화번호를 입력하세요.");
            }
            if (business_number === "") {
                return show_bert("danger", 2000, "사업자번호를 입력하세요.");
            }
            if (address_detail === "") {
                return show_bert("danger", 2000, "상세주소를 입력하세요.");
            }
            data.company_name = encodeURIComponent(company_name);
            data.nick_name = encodeURIComponent(nick_name);
            data.phone = encodeURIComponent(phone);
            data.business_number = encodeURIComponent(business_number);
            data.address_si = encodeURIComponent(address_si);
            data.address_goo = encodeURIComponent(address_goo);
            data.address_dong = encodeURIComponent(address_dong);
            data.address_detail = encodeURIComponent(address_detail);
        }

        var s_cb = function (result) {
            if ( result['response'] === true ) {
                window.location = "/";
            } else {
                if (result.msg === "server_error") {
                    return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                } else if (result.msg === "wrong_info") {
                    return show_bert("danger", 2000, "잘못된 정보가 등록되었습니다. 잠시 후 다시 시도해주세요.");
                } else if (result.msg === "nick_name_exists") {
                    return show_bert("danger", 2000, "이미 존재하는 닉네임입니다. 닉네임을 변경하세요.");
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
            pathname:"/set/nick-name",
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
    /* 주소 시 변경 시, 구와 동 첫번째 선택 */
    $(document).on("change", "#address-si", function (e) {
       e.preventDefault();
       var si = $("#address-si option:selected").text();
       var goo = area.goo(si);

       options = "";
       for (var i = 0; i < goo.length; i++) {
           if (i === 0) {
                options = options + "<option value='" + goo[i] + "' selected='selected'>" + goo[i] + "</option>";
           } else {
                options = options + "<option value='" + goo[i] + "'>" + goo[i] + "</option>";
           }
       }
       html = $.parseHTML(options);
       $("#address-goo").empty();
       $("#address-goo").append(html);

        var dong = area.dong(si, goo[0]);

       options = "";
       for (var i = 0; i < dong.length; i++) {
           if (i === 0) {
               options = options + "<option value='" + dong[i] + "' selected='selected'>" + dong[i] + "</option>";
           } else {
               options = options + "<option value='" + dong[i] + "'>" + dong[i] + "</option>";
           }
       }
       html = $.parseHTML(options);
       $("#address-dong").empty();
       $("#address-dong").append(html);
       return false;
    });
    /* 주소 구 변경 시, 동 첫번째 선택 */
    $(document).on("change", "#address-goo", function (e) {
        e.preventDefault();
        var si = $("#address-si option:selected").text();
        var goo = $("#address-goo option:selected").text();
        var dong = area.dong(si, goo);

        options = "";
        for (var i = 0; i < dong.length; i++) {
            if (i === 0) {
                options = options + "<option value='" + dong[i] + "' selected='selected'>" + dong[i] + "</option>";
            } else {
                options = options + "<option value='" + dong[i] + "'>" + dong[i] + "</option>";
            }
        }
        html = $.parseHTML(options);
        $("#address-dong").empty();
        $("#address-dong").append(html);
        return false;
    });
});