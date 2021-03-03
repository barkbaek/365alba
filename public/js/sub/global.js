var bert_alert = 0;
var show_bert = function (type, duration, message) {
    clearTimeout(bert_alert);
    $('.bert-alert').remove();
    var i, s, e;
    if (type === "success") {
        s = "<div class='bert-alert success'>" + message + "</div>";
    } else if (type === "danger") {
        s = "<div class='bert-alert danger'>" + message + "</div>";
    }
    e = $.parseHTML(s);
    $('body').append(e);
    bert_alert = setTimeout(function () {
        if ($(".bert-alert").is(":visible") === true) {
            var height = $('.bert-alert').height() + 20;
            $(".bert-alert").animate({top: "-=" + height + "px"}, 200, function () {
                $('.bert-alert').remove();
            });
        }
    }, duration);
};
var get_encoded_html_preventing_xss = function (str) {
    return str.replace(/\&/gi, '&amp;')
        .replace(/\ /gi, '&nbsp;')
        .replace(/\</gi, '&lt;')
        .replace(/\>/gi, '&gt;')
        .replace(/\¢/gi, '&cent;')
        .replace(/\£/gi, '&pound;')
        .replace(/\¥/gi, '&yen;')
        .replace(/\€/gi, '&euro;')
        .replace(/\§/gi, '&sect;')
        .replace(/\©/gi, '&copy;')
        .replace(/\®/gi, '&reg;')
        .replace(/\™/gi, '&trade;')
        .replace(/\"/gi, '&quot;')
        .replace(/\'/gi, '&#39;');
};
var is_email_valid = function (email) {
    return ( /(.+)@(.+){2,}\.(.+){2,}/.test(email) );
};
var is_password_format_valid = function (password) {
    if (password.length < 8) {
        return "비밀번호 최소 길이는 8입니다.";
    } else if (password.length > 50) {
        return "비밀번호 최대 길이는 50입니다.";
    } else if (password.search(/\d/) === -1) {
        return "비밀번호는 최소 하나의 숫자를 가져야 합니다.";
    } else if (password.search(/[a-zA-Z]/) === -1) {
        return "비밀번호는 최소 하나의 알파벳을 가져야 합니다.";
    } else if (password.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) === -1) {
        return "비밀번호는 최소 하나의 특수문자를 가져야 합니다.";
    }
    return true;
};
var animation = function (type, action) {
    if (type === "wait") {
        if (action === "play") {
            $("#loader").css("display", "block");
        } else if (action === "stop") {
            $("#loader").css("display", "none");
        }
    }
};
var methods = {};
methods["the_world"] = {};
methods["the_world"]["is_one"] = function (obj) {
    if (obj.show_animation === true) {
        animation("wait", "play");
    }
    $.ajax({
        url: window.location.protocol + "//" + window.location.hostname + (window.location.port === "" ? "" : ":" + window.location.port) + obj.pathname,
        dataType: 'json',
        type: 'POST',
        data: obj.data,
        success: function(result) {
            if (obj.show_animation === true) {
                animation("wait", "stop");
            }
            obj.s_cb(result);
            return false;
        },
        error: function(xhr, status, error) {
            if (obj.show_animation === true) {
                animation("wait", "stop");
            }
            obj.f_cb();
            return false;
        },
        timeout: 10000
    });
};
var get_date = function (date) {
    if (date === null) {
        date = new Date();
    } else {
        date = new Date(date);
    }
    var text = date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일 ";
    var day = date.getDay();
    if (day === 0) {
        text = text + "일요일 " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    } else if (day === 1) {
        text = text + "월요일 " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    } else if (day === 2) {
        text = text + "화요일 " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    } else if (day === 3) {
        text = text + "수요일 " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    } else if (day === 4) {
        text = text + "목요일 " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    } else if (day === 5) {
        text = text + "금요일 " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    } else if (day === 6) {
        text = text + "토요일 " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
    return text;
};
var modal = function (prompt_id, display) {
    if (display === "open") {
        $("#overlay2").css("display", "block");
        $(prompt_id).css("display", "table");
    } else {
        $("#overlay2").css("display", "none");
        $(prompt_id).css("display", "none");
    }
};
var put_comma_between_three_digits = function (num) {
    try {
        var str = num + "";
        var counter = 1;
        var temp = "";
        var final = "";

        var array = str.split('.');
        str = array[0];

        for (var i=(str.length-1); i >= 0; i--){
            temp = temp + str[i];
            if (counter === 3) {
                temp = temp + ',';
                counter = 0;
            }
            counter++;
        }
        for (var i=(temp.length-1); i>=0; i--){
            if (temp.length % 4 === 0 && i === (temp.length - 1)) {
                continue;
            }
            final = final + temp[i];
        }
        if (array[1] !== undefined) {
            final = final + "." + array[1];
        }
        return final;
    } catch (e) {
        if (num === undefined || num === null || num === "") {
            return 0;
        } else {
            return num;
        }
    }
};
var is_ie = function () {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE");
    var trident = ua.indexOf("Trident");
    return msie > -1 ? true : (trident > -1);
};
var is_mobile = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};
var encode_for_url = function (str) {
    return encodeURIComponent(str).replace(/\-/gi, '%2D').replace(/\'/gi, '%27').replace(/\./gi, '%2E').replace(/\~/gi, '%7E').replace(/\!/gi, '%21').replace(/\*/gi, '%2A').replace(/\(/gi, '%28').replace(/\)/gi, '%29').replace(/\_/gi, '%5F');
};
$(document).ready(function() {
    if (is_mobile() === false && $("#search-input").length > 0) {
        $("#search-input").focus();
    }
    $(document).on('click', '.prompt .close', function (e) {
        e.preventDefault();
        modal(".prompt", "close");
        return false;
    });
});