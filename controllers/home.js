const methods = require("../methods");
const config = require('../env.json')[process.env.NODE_ENV || 'development'];
module.exports = function (is_mobile, user, data, template) {
    template.render('home', {
        layout: false,
        aws_s3_url: function () {
            return config["aws_s3_url"];
        },
        css_version: function () {
            return config["css_version"];
        },
        date: function () {
            return new Date();
        },
        description: function () {
            return "365알바에 오신 것을 환영합니다. 365알바는 대한민국 NO 1. 아르바이트 사이트입니다.";
        },
        image: function () {
            return config["image"];
        },
        js_version: function () {
            return config["js_version"];
        },
        keywords: function () {
            return config["keywords"];
        },
        lang: function () {
            return "ko";
        },
        published_date: function () {
            var published = new Date();
            published.setFullYear(2020);
            published.setMonth(6);
            published.setDate(1);
            published.setHours(12);
            published.setMinutes(00);
            published.setSeconds(00);
            return published;
        },
        site_name: function () {
            return config["site_name"];
        },
        title: function () {
            return "365알바";
        },
        twitter_site: function () {
            return config["twitter_site"];
        },
        url: function () {
            return config["url"];
        },
        menu1: function () {
            // 채용정보
            return [
                {url: "/alba/today", name: "오늘의알바"},
                {url: "/alba/express", name: "급구알바"},
                {url: "/alba/area", name: "지역별알바"},
                {url: "/alba/business-type", name: "업직종알바"},
                {url: "/alba/day", name: "일용직알바"},
                {url: "/alba/teenagers", name: "청소년"},
                {url: "/alba/university-students", name: "대학생"},
                {url: "/alba/middle-aged-men", name: "중장년"},
                {url: "/alba/foreigners", name: "외국인"}
            ];
        },
        menu2: function () {
            // 인재정보
            return [
                {url: "/talented/area", name: "지역별인재"}
            ];
        },
        menu3: function () {
            // 알바플러스
            return [
                {url: "/albaboard", name: "알바톡톡"},
                {url: "/ceoboard", name: "사장님게시판"},
                {url: "/albareview", name: "알바후기"}
            ];
        },
        menu4: function () {
            // 알바백과
            return [
                {url: "/minimum-wages", name: "최저임금"},
                {url: "/four-major-social-insurance", name: "4대사회보험"},
                {url: "/youth-labor-rights-center", name: "청소년근로권익센터"},
                {url: "/prevent-employment-fraud", name: "취업사기예방"},
                {url: "/wage-deferred-business-owners", name: "임금체불사업주"}
            ];
        },
        menu5: function () {
            // 이벤트
            return [
                {url: "/events", name: "이벤트"}
            ];
        },
        menu6: function () {
            // 개인서비스
            return [
                {url: "/my-resume", name: "내이력서"},
                {url: "/application-status", name: "지원현황"},
                {url: "/resume-reading-companies", name: "이력서열람기업"},
                {url: "/scrap-alba", name: "스크랩알바"},
                {url: "/manage-my-articles", name: "내가쓴글관리"},
                {url: "/charge-use-details", name: "유료이용내역"},
                {url: "/member-information", name: "회원정보"}
            ];
        },
        menu7: function () {
            // 기업서비스
            return [
                {url: "/register-notice", name: "공고등록"},
                {url: "/manage-notices", name: "공고·지원자관리"},
                {url: "/charged-products", name: "유료상품"},
                {url: "/scrap-alba", name: "스크랩알바"},
                {url: "/manage-my-articles", name: "내가쓴글관리"},
                {url: "/charge-use-details", name: "유료이용내역"},
                {url: "/member-information", name: "회원정보"}
            ];
        },
        is_loggedin: function () {
            return user !== null;
        },
        nick_name: function () {
            return user === null ? "" : user.nick_name;
        },
        is_user: function () {
            return user === null ? false: user.is_user;
        },
        points: function () {
            return user === null ? 0 : user.points;
        },
        alba_today: function () {
            for (var i = 0; i < data.today.length; i++) {
                data.today[i].id = data.today[i]._id.toString();
                if (data.today[i].salary_type === "hour") {
                    data.today[i].salary_type = "시급";
                } else if (data.today[i].salary_type === "day") {
                    data.today[i].salary_type = "일급";
                } else if (data.today[i].salary_type === "week") {
                    data.today[i].salary_type = "주급";
                } else if (data.today[i].salary_type === "month") {
                    data.today[i].salary_type = "월급";
                } else if (data.today[i].salary_type === "year") {
                    data.today[i].salary_type = "연봉";
                } else if (data.today[i].salary_type === "per") {
                    data.today[i].salary_type = "건별";
                }
                data.today[i].salary = methods.put_comma_between_three_digits(data.today[i].salary);
            }
            return data.today;
        },
        alba_express: function () {
            for (var i = 0; i < data.express.length; i++) {
                data.express[i].id = data.express[i]._id.toString();
                if (data.express[i].salary_type === "hour") {
                    data.express[i].salary_type = "시급";
                } else if (data.express[i].salary_type === "day") {
                    data.express[i].salary_type = "일급";
                } else if (data.express[i].salary_type === "week") {
                    data.express[i].salary_type = "주급";
                } else if (data.express[i].salary_type === "month") {
                    data.express[i].salary_type = "월급";
                } else if (data.express[i].salary_type === "year") {
                    data.express[i].salary_type = "연봉";
                } else if (data.express[i].salary_type === "per") {
                    data.express[i].salary_type = "건별";
                }
                data.express[i].salary = methods.put_comma_between_three_digits(data.express[i].salary);
            }
            return data.express;
        },
        albaboard: function () {
            for (var i = 0; i < data.albaboard.length; i++) {
                data.albaboard[i].id = data.albaboard[i]._id.toString();
                data.albaboard[i].count_comments = data.albaboard[i].comments.length;
            }
            return data.albaboard;
        },
        albareview: function () {
            for (var i = 0; i < data.albareview.length; i++) {
                data.albareview[i].id = data.albareview[i]._id.toString();
                data.albareview[i].count_comments = data.albareview[i].comments.length;
            }
            return data.albareview;
        }
    });
};