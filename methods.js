const config = require('./env.json')[process.env.NODE_ENV || 'development'];
const nodemailer = require('nodemailer');
const ses = require('nodemailer-ses-transport');
const smtp = require('nodemailer-smtp-transport');
const aws = require('aws-sdk');
const aws_config = require('./aws.json');
const image_size = require('image-size');
const randomstring = require('randomstring');
const sharp = require('sharp');

var transporter;
transporter = nodemailer.createTransport(smtp({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
}));

/* AWS 초기화 */
aws.config.update(aws_config);
const s3 = new aws.S3();

module.exports = {
    convert_to_two_digits : function (number) {
        return number < 10 ? "0" + number : "" + number;
    },
    encode_for_url: function (str) {
        return encodeURIComponent(str).replace(/\-/gi, '%2D').replace(/\'/gi, '%27').replace(/\./gi, '%2E').replace(/\~/gi, '%7E').replace(/\!/gi, '%21').replace(/\*/gi, '%2A').replace(/\(/gi, '%28').replace(/\)/gi, '%29').replace(/\_/gi, '%5F');
    },
    es_albaboard: function (doc) {
        doc.content = doc.content.replace(/\n/gi, " ");
        return {
            article_id : doc._id.toString(),
            user_id: doc.user_id,
            nick_name: doc.nick_name,
            title: doc.title,
            content: doc.content,
            tags: doc.tags,
            created_at: doc.created_at,
            updated_at: doc.updated_at
        };
    },
    es_albareview: function (doc) {
        doc.content = doc.content.replace(/\n/gi, " ");
        return {
            article_id : doc._id.toString(),
            user_id: doc.user_id,
            nick_name: doc.nick_name,
            title: doc.title,
            content: doc.content,
            tags: doc.tags,
            created_at: doc.created_at,
            updated_at: doc.updated_at
        };
    },
    es_companies: function (doc) {
        var finish_date = doc.finish_year + "/";
        if (doc.finish_month < 10) {
            finish_date = finish_date + "0" + doc.finish_month + "/";
        } else {
            finish_date = finish_date + doc.finish_month + "/";
        }
        if (doc.finish_day < 10) {
            finish_date = finish_date + "0" + doc.finish_day;
        } else {
            finish_date = finish_date + doc.finish_day;
        }
        var address = doc.address_si + " " + doc.address_goo + " " + doc.address_dong + " " + doc.address_detail;

        return {
            article_id : doc._id.toString(),
            title : doc.title,
            company_name : doc.company_name,
            employment_type : doc.employment_type,
            salary : doc.salary,
            salary_type : doc.salary_type,
            finish_date : finish_date,
            address : address,
            near_subway : doc.near_subway,
            near_university : doc.near_university,
            logo : "",
            created_at : doc.created_at,
            updated_at : doc.updated_at
        };
    },
    es_resumes: function (doc) {
        var work_place = doc.work_place_si + " " + doc.work_place_goo + " " + doc.work_place_dong;
        return {
            article_id: doc._id.toString(),
            name: doc.name,
            photo: doc.photo,
            title: doc.title,
            work_place: work_place,
            sex: doc.sex,
            birth_year: doc.birth_year,
            work_types: doc.work_types,
            work_days: doc.work_days,
            salary: doc.salary,
            salary_type: doc.salary_type,
            created_at: doc.created_at,
            updated_at: doc.updated_at
        };
    },
    get_cookie : function (cookies, cname) {
        if (cookies) {
            var name = cname + "=";
            var ca = cookies.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length,c.length);
                }
            }
        }
        return "";
    },
    /**
     * obj - 객체
     * obj.lang - en || ja || ko || zh-Hans
     * obj.type
     * year
     * month
     * date
     * weekday - Eg. 월요일 등
     * years
     * weeks
     * days
     * hours
     * minutes
     * seconds
     * ago
     * deadline
     * obj.number - 숫자
     * 주의할 점은 type이 month일 때 범위는 0~11이다.
     **/
    get_i18n_time_text : function (obj) {
        var lang = obj.lang
            , type = obj.type
            , number = obj.number;
        if (lang === undefined) {
            lang = "en";
        }

        var i18n_time_text = {};
        i18n_time_text.en = {};
        i18n_time_text.ja = {};
        i18n_time_text.ko = {};
        i18n_time_text["zh-Hans"] = {};

        /* year */
        if (type === "year") {
            if (lang === "en") {
                return number + "";
            } else if (lang === "ja") {
                return number + "年";
            } else if (lang === "ko") {
                return number + "년";
            } else if (lang === "zh-Hans") {
                return number + "年";
            }
        }

        i18n_time_text.en.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        /* month */
        if (type === "month") {
            if (lang === "en") {
                return i18n_time_text.en.months[number];
            } else if (lang === "ja") {
                return (number + 1) + "月";
            } else if (lang === "ko") {
                return (number + 1) + "월";
            } else if (lang === "zh-Hans") {
                return (number + 1) + "月";
            }
        }

        /* date */
        if (type === "date") {
            if (lang === "en") {
                return number + "";
            } else if (lang === "ja") {
                return number + "日";
            } else if (lang === "ko") {
                return number + "일";
            } else if (lang === "zh-Hans") {
                return number + "日";
            }
        }

        /* weekday */
        i18n_time_text.en.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        i18n_time_text.ja.weekdays = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
        i18n_time_text.ko.weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        i18n_time_text["zh-Hans"].weekdays = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

        if (type === "weekday") {
            return i18n_time_text[lang].weekdays[number];
        }

        i18n_time_text.en.year = "year";
        i18n_time_text.en.years  = "years";
        i18n_time_text.ja.years = "年";
        i18n_time_text.ko.years = "년";
        i18n_time_text["zh-Hans"].years = "年";
        if (type === "years") {
            if (lang === 'en') {
                if (number > 1) {
                    return number + " " + i18n_time_text[lang].years;
                } else {
                    return number + " " + i18n_time_text[lang].year;
                }
            } else {
                return number + i18n_time_text[lang].years;
            }
        }
        i18n_time_text.en.week = "week";
        i18n_time_text.en.weeks  = "weeks";
        i18n_time_text.ja.weeks = "週間";
        i18n_time_text.ko.weeks = "주";
        i18n_time_text["zh-Hans"].weeks = "周";
        if (type === "weeks") {
            if (lang === 'en') {
                if (number > 1) {
                    return number + " " + i18n_time_text[lang].weeks;
                } else {
                    return number + " " + i18n_time_text[lang].week;
                }
            } else {
                return number + i18n_time_text[lang].weeks;
            }
        }
        i18n_time_text.en.day = "day";
        i18n_time_text.en.days  = "days";
        i18n_time_text.ja.days = "日";
        i18n_time_text.ko.days = "일";
        i18n_time_text["zh-Hans"].days = "天";
        if (type === "days") {
            if (lang === 'en') {
                if (number > 1) {
                    return number + " " + i18n_time_text[lang].days;
                } else {
                    return number + " " + i18n_time_text[lang].day;
                }
            } else {
                return number + i18n_time_text[lang].days;
            }
        }
        i18n_time_text.en.hour = "hour";
        i18n_time_text.en.hours = "hours";
        i18n_time_text.ja.hours = "時間";
        i18n_time_text.ko.hours = "시간";
        i18n_time_text["zh-Hans"].hours = "小时";
        if (type === "hours") {
            if (lang === 'en') {
                if (number > 1) {
                    return number + " " + i18n_time_text[lang].hours;
                } else {
                    return number + " " + i18n_time_text[lang].hour;
                }
            } else {
                return number + i18n_time_text[lang].hours;
            }
        }
        i18n_time_text.en.minute = "minute";
        i18n_time_text.en.minutes = "minutes";
        i18n_time_text.ja.minutes = "分";
        i18n_time_text.ko.minutes = "분";
        i18n_time_text["zh-Hans"].minutes = "分";
        if (type === "minutes") {
            if (lang === 'en') {
                if (number > 1) {
                    return number + " " + i18n_time_text[lang].minutes;
                } else {
                    return number + " " + i18n_time_text[lang].minute;
                }
            } else {
                return number + i18n_time_text[lang].minutes;
            }
        }
        i18n_time_text.en.second = "second";
        i18n_time_text.en.seconds = "seconds";
        i18n_time_text.ja.seconds = "秒";
        i18n_time_text.ko.seconds = "초";
        i18n_time_text["zh-Hans"].seconds = "秒";
        if (type === "seconds") {
            if (lang === 'en') {
                if (number > 1) {
                    return number + " " + i18n_time_text[lang].seconds;
                } else {
                    return number + " " + i18n_time_text[lang].second;
                }
            } else {
                return number + i18n_time_text[lang].seconds;
            }
        }
    },
    /**
     * obj - 객체
     * obj.lang - en || ja || ko || zh-Hans
     * obj.year
     * obj.month
     * obj.date
     * 주의할 점: 들어오는 month는 0 ~ 11.
     **/
    get_i18n_year_month_date: function (obj) {
        var lang = obj.lang;
        if (lang === undefined) {
            lang = "en";
        }

        var year = this.get_i18n_time_text({lang: lang, type: "year", number: obj.year})
            , month = this.get_i18n_time_text({lang: lang, type: "month", number: obj.month})
            , date = this.get_i18n_time_text({lang: lang, type: "date", number: obj.date});

        if (lang === "en") {
            return date + " " +  month + " " + year;
        } else if (lang === "ja") {
            return year + month + date;
        } else if (lang === "ko") {
            return year + " " + month + " " + date;
        } else if (lang === "zh-Hans") {
            return year + month + date;
        } else {
            return date + " " +  month + " " + year;
        }
    },
    get_image_info: function (user_id, original_size, filename, content_type) {
        // user, is_freephoto, is_profile
        var MAX_WIDTH = 640
            , image_info = {}
            , date = Date.now().toString()
            , type = ""
            , utc_eight_digits = this.to_eight_digits_date()
            , random_id = randomstring.generate()
            , small_length
            , final_length
            , top
            , left;

        image_info["final_filename"] = "upload/images/" + utc_eight_digits + "/" + user_id + "/resized/";
        image_info["final_thumbnail_name"] = "upload/images/" + utc_eight_digits + "/" + user_id + "/thumbnail/";
        image_info["final_square_name"] = "upload/images/" + utc_eight_digits + "/" + user_id + "/square/";
        image_info["original_size"] = original_size;
        image_info["content_type"] = content_type;
        if (image_info["content_type"] === "image/jpeg") {
            if (filename) {
                type = filename.split('.');
                type = type[type.length - 1];
                if (type !== "jpg") {
                    type = "jpeg";
                } else {
                    type = "jpg";
                }
            } else {
                type = "jpg";
            }
        } else if (image_info["content_type"] === "image/gif") {
            type = "gif";
        } else if (image_info["content_type"] === "image/png") {
            type = "png";
        }

        image_info["final_width"] = image_info["original_size"]["width"];
        image_info["final_height"] = image_info["original_size"]["height"];
        image_info["square"] = {};

        if (image_info["final_width"] > image_info["final_height"]) {
            small_length = image_info["final_height"];
            left = Math.floor((image_info["final_width"] - small_length) / 2);
            top = 0;
        } else if (image_info["final_width"] < image_info["final_height"]) {
            small_length = image_info["final_width"];
            left = 0;
            top = Math.floor((image_info["final_height"] - small_length) / 2);
        } else {
            small_length = image_info["final_width"];
            left = 0;
            top = 0;
        }
        if (small_length > MAX_WIDTH) {
            final_length = MAX_WIDTH;
        } else {
            final_length = small_length;
        }
        image_info["final_width"] = image_info["final_height"] = final_length;
        image_info["sharp"] = {};
        image_info["sharp"]["extract"] = {};
        image_info["square"]["top"] = image_info["sharp"]["extract"]["top"] = top;
        image_info["square"]["left"] = image_info["sharp"]["extract"]["left"] = left;
        image_info["square"]["width"] = image_info["sharp"]["extract"]["width"] = small_length;
        image_info["square"]["height"] = image_info["sharp"]["extract"]["height"] = small_length;

        image_info["final_filename"] = image_info["final_filename"] + date + "-" +  random_id + "-" + image_info["final_width"] + "-" + image_info["final_height"] + "." + type;
        image_info["final_thumbnail_name"] = image_info["final_thumbnail_name"] + date + "-" +  random_id + "-" + image_info["final_width"] + "-" + image_info["final_height"] + "." + type;
        image_info["final_square_name"] = image_info["final_square_name"] + date + "-" +  random_id + "-" + image_info["final_width"] + "-" + image_info["final_height"] + "." + type;
        return image_info;
    },
    is_email_valid: function (email) {
        return ( /(.+)@(.+){2,}\.(.+){2,}/.test(email) );
    },
    is_mobile: function (ua) {
        if (ua) {
            ua = ua.toLowerCase();
            return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));
        } else {
            return false;
        }
    },
    is_password_format_valid: function (password) {
        if (password.length < 8) {
            return false;
        } else if (password.length > 50) {
            return false;
        } else if (password.search(/\d/) === -1) {
            return false;
        } else if (password.search(/[a-zA-Z]/) === -1) {
            return false;
        } else if (password.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) === -1) {
            return false;
        }
        return true;
    },
    mail: function (type, email, token, f_cb, s_cb) {
        var subject, url, content, date, a, b, c, d, e, f, g, h, i, j, k, l;
        url = require('./env.json')[process.env.NODE_ENV || 'development']["url"];
        if (type === "register") {
            subject = "365알바에 오신 것을 환영합니다. 이메일을 인증하세요.";
            date = this.to_i18n_utc_fixed_datetime({lang: "ko", datetime: new Date()});
            a = "<div style='margin:auto;text-align:center;padding:10px 0;'><img style='width:240px;' src='" + config.aws_s3_url + "/icons/logo.jpeg' alt='365알바' title='365알바'></div>";
            b = "<div style='font-size:18px;text-align:center;margin-bottom:5px;'>365알바에 오신 것을 환영합니다.</div>";
            c = "<div style='font-size:14px;text-align:center;'>이메일을 인증하세요.</div>";
            d = "<div style='border-bottom:2px solid #ebebeb;padding:10px;'><span style='margin-right:10px;font-weight:bold;'>이메일</span>" + email + "</div>";
            e = "<div style='padding:10px;'><span style='margin-right:10px;font-weight:bold;'>날짜(UTC)</span>" + date + "</div>";
            f = "<div style='border:2px solid #ebebeb;margin:20px 10px;font-size:14px;'>" + d + e +  "</div>";
            g = "<div style='text-align:center;font-size:14px;'>아래 버튼을 클릭하세요.</div>";
            h = "<div style='font-size:14px;padding:10px 15px;background:#58bcea;border:1px solid #58bcea;border-radius:10px;color:#ffffff;cursor:pointer;text-align:center;'>이메일 인증</div>";
            i = "<a href='" + url + "/verify/" + token + "' target='_blank' style='display:inline-block;text-decoration:none;margin:20px auto;'>" + h +"</a>";
            j = "<div style='margin:auto;text-align:center;'>" + i + "</div>";
            k = "<div style='text-align:center;font-size:12px;'>버튼 클릭이 안될시, 아래의 URL을 이용하세요.</div>";
            l = "<div style='font-size:9px;text-align:left;word-wrap:break-word;text-decoration:underline;padding:20px 10px;margin-top:10px;margin-bottom:10px;border:1px solid #ebebeb;'>" + url + "/verify/" + token + "</div>";
            content = "<div style='text-align:left;margin:10px auto;max-width:450px;'>" + a + b + c + f + g + j + k + l + "</div>";
        } else if (type === "forgot_password") {
            subject = "365알바에 오신 것을 환영합니다. 비밀번호를 변경하세요.";
            date = this.to_i18n_utc_fixed_datetime({lang: "ko", datetime: new Date()});
            a = "<div style='margin:auto;text-align:center;padding:10px 0;'><img style='width:240px;' src='" + config.aws_s3_url + "/icons/logo.jpeg' alt='365알바' title='365알바'></div>";
            j = "<div style='font-size:18px;text-align:center;margin-bottom:5px;'><span style='text-decoration:underline;'>365알바에 오신 것을 환영합니다.</div>";
            b = "<div style='padding:10px;'><span style='margin-right:10px;font-weight:bold;'>날짜(UTC)</span>" + date + "</div>";
            i = "<div style='border:2px solid #ebebeb;margin:20px 10px;font-size:14px;'>" + b +  "</div>";
            c = "<div style='text-align:center;font-size:14px;'>아래 버튼을 클릭하세요.</div>";
            d = "<div style='font-size:14px;padding:10px 15px;background:#58bcea;border:1px solid #58bcea;border-radius:10px;color:#ffffff;cursor:pointer;text-align:center;'>비밀번호 변경</div>";
            e = "<a href='" + url + "/reset-password/" + token + "' target='_blank' style='display:inline-block;text-decoration:none;margin:20px auto;'>" + d + "</a>";
            f = "<div style='margin:auto;text-align:center;'>" + e + "</div>";
            g = "<div style='text-align:center;font-size:12px;'>버튼 클릭이 안될시, 아래의 URL을 이용하세요.</div>";
            h = "<div style='font-size:9px;text-align:left;word-wrap:break-word;text-decoration:underline;padding:20px 10px;margin-top:10px;margin-bottom:10px;border:1px solid #ebebeb;'>" + url + "/reset-password/" + token + "</div>";
            content = "<div style='text-align:left;margin:10px auto;max-width:450px;'>" + a + j + i + c + f + g + h + "</div>";
        }
        var mailOptions = {
            from: "365알바<admin@365alba.com>",
            to: email,
            subject: subject,
            html: content
        };
        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                console.log("메일 전송 실패");
                console.dir(err);
                f_cb();
            } else {
                s_cb();
            }
        });
    },
    pagination: function (c, m) {
        var current = c,
            last = m,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        for (var i = 1; i <= last; i++) {
            if (i == 1 || i == last || i >= left && i < right) {
                range.push(i);
            }
        }

        for (var i in range) {
            if (l) {
                if (range[i] - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (range[i] - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(range[i]);
            l = range[i];
        }

        return rangeWithDots;
    },
    put_comma_between_three_digits: function (num) {
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
    },
    remove_photo: function (key, cb) {
        s3.deleteObject({
            Bucket: 'images.365alba.com',
            Key: key
        },function (err, resp) {
            if (err === null) {
                return cb();
            } else {
                console.log("remove_photo fail.");
                console.log("err:");
                console.dir(err);
                return cb();
            }
        });
    },
    to_eight_digits_date : function (date) {
        var now;
        if (date === null || date === undefined) {
            now = new Date();
        } else {
            now = date;
        }
        return parseInt(now.getUTCFullYear() + this.convert_to_two_digits(now.getUTCMonth() + 1) + this.convert_to_two_digits(now.getUTCDate()));
    },
    /**
     * obj
     * obj.lang - "en" || "ja" || "ko" || "zh-Hans"
     * obj.datetime - new Date()
     * @returns {string}
     */
    to_i18n_utc_fixed_datetime : function (obj) {
        var datetime = obj.datetime;
        var lang = obj.lang;
        if (datetime === undefined) {
            datetime = new Date();
        }
        if (lang === undefined) {
            lang = "en";
        }
        var year_month_date = this.get_i18n_year_month_date({lang: lang, year: datetime.getUTCFullYear(), month: datetime.getUTCMonth(), date: datetime.getUTCDate()})
            , weekday = this.get_i18n_time_text({lang: lang, type: "weekday", number: datetime.getUTCDay()})
            , hours_minutes_seconds =  this.convert_to_two_digits(datetime.getUTCHours()) + ":" + this.convert_to_two_digits(datetime.getUTCMinutes()) + ":" + this.convert_to_two_digits(datetime.getUTCSeconds());

        if (lang === "en") {
            final = weekday + ", " +  year_month_date + ", " + hours_minutes_seconds;
        } else if (lang === "ja") {
            final = year_month_date + " " + weekday + " " + hours_minutes_seconds;
        } else if (lang === "ko") {
            final = year_month_date + " " + weekday + " " + hours_minutes_seconds;
        } else if (lang === "zh-Hans") {
            final = year_month_date + " " + weekday + " " + hours_minutes_seconds;
        } else {
            final = weekday + ", " +  year_month_date + ", " + hours_minutes_seconds;
        }
        return final;
    },
    upload_logo: function (req, res, next, cb) {
        var self = this
            , data = []
            , buffer
            , image_info
            , original_size;

        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            file.on('error', function (err) {
                return cb("");
            });
            file.on('data', function (chunk) {
                data.push(chunk);
            });
            file.on('end', function () {
                if (
                    mimetype !== "image/jpeg" &&
                    mimetype !== "image/gif" &&
                    mimetype !== "image/png"
                ) {
                    return cb("");
                }
                buffer = Buffer.concat(data);
                try {
                    original_size = image_size(buffer);
                } catch (e) {
                    return cb("");
                }
                image_info = self.get_image_info(1, original_size, filename, mimetype);
                self.upload_logo_aws(buffer, image_info, cb);
            });
        });
        req.busboy.on('error', function (err) {
            f_cb(null);
            next(err);
        });
        req.busboy.on('finish', function () {
        });
        req.pipe(req.busboy);
    },
    upload_logo_aws: function (buffer, image_info, cb) {
        var self = this
            , etag;

        sharp(buffer).extract({
            left: image_info["square"]["left"]
            , top: image_info["square"]["top"]
            , width: image_info["square"]["width"]
            , height: image_info["square"]["height"] })
            .resize(128, 128)

            .toBuffer(function (err, data) {
                if (err) {
                    return f_cb(null);
                } else {
                    s3.putObject({
                        Bucket: 'images.365alba.com',
                        Key: image_info["final_square_name"],
                        Body: data,
                        ACL: 'public-read',
                        CacheControl: 'max-age=31536000',
                        ContentType: image_info["content_type"]
                    },function (err, resp) {
                        if (err === null) {
                            etag = resp["ETag"].replace(/\"/gi, '');
                            console.log("upload_logo_aws success. etag: " + etag);
                            console.log("image_info: ");
                            console.dir(image_info);
                            return cb(config.aws_s3_url + "/" + image_info["final_square_name"]);
                        } else {
                            console.log("upload_logo_aws fail.");
                            console.log("err:");
                            console.dir(err);
                            return cb("");
                        }
                    });
                }
            });

    },
    upload_photo: function (req, res, next, user_id, cb) {
        var self = this
            , data = []
            , buffer
            , image_info
            , original_size;

        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            file.on('error', function (err) {
                return cb("");
            });
            file.on('data', function (chunk) {
                data.push(chunk);
            });
            file.on('end', function () {
                if (
                    mimetype !== "image/jpeg" &&
                    mimetype !== "image/gif" &&
                    mimetype !== "image/png"
                ) {
                    return cb("");
                }
                buffer = Buffer.concat(data);
                try {
                    original_size = image_size(buffer);
                } catch (e) {
                    return cb("");
                }
                image_info = self.get_image_info(user_id, original_size, filename, mimetype);
                self.upload_photo_aws(buffer, image_info, cb);
            });
        });
        req.busboy.on('error', function (err) {
            f_cb(null);
            next(err);
        });
        req.busboy.on('finish', function () {
        });
        req.pipe(req.busboy);
    },
    upload_photo_aws: function (buffer, image_info, cb) {
        var self = this
            , etag;

        sharp(buffer).extract({
            left: image_info["square"]["left"]
            , top: image_info["square"]["top"]
            , width: image_info["square"]["width"]
            , height: image_info["square"]["height"] })
            .resize(128, 128)
            .toBuffer(function (err, data) {
                if (err) {
                    return f_cb(null);
                } else {
                    s3.putObject({
                        Bucket: 'images.365alba.com',
                        Key: image_info["final_square_name"],
                        Body: data,
                        ACL: 'public-read',
                        CacheControl: 'max-age=31536000',
                        ContentType: image_info["content_type"]
                    },function (err, resp) {
                        if (err === null) {
                            etag = resp["ETag"].replace(/\"/gi, '');
                            return cb(config.aws_s3_url + "/" + image_info["final_square_name"]);
                        } else {
                            console.log("upload_logo_aws fail.");
                            console.log("err:");
                            console.dir(err);
                            return cb("");
                        }
                    });
                }
            });
    }
};