const methods = require("../methods");
const config = require('../env.json')[process.env.NODE_ENV || 'development'];
module.exports = function (is_mobile, user, doc, template) {
    template.render('company', {
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
            return "알바공고 - 365알바";
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
        is_writer: function () {
            return user === null ? false: (user._id.toString() === doc.user_id);
        },
        created_at: function () {
            return doc.created_at;
        },
        total_applicants: function () {
            return doc.applied_resumes.length;
        },
        doc: function () {
            if (doc.employment_type === "alba") {
                doc.employment_type = "알바";
            } else if (doc.employment_type === "permanent") {
                doc.employment_type = "정규직";
            } else if (doc.employment_type === "contract") {
                doc.employment_type = "계약직";
            } else if (doc.employment_type === "intern") {
                doc.employment_type = "인턴";
            }
            if (doc.work_period === "1day") {
                doc.work_period = "하루";
            } else if (doc.work_period === "1week") {
                doc.work_period = "일주일이하";
            } else if (doc.work_period === "1month") {
                doc.work_period = "1주일~1개월";
            } else if (doc.work_period === "3months") {
                doc.work_period = "1개월~3개월";
            } else if (doc.work_period === "6months") {
                doc.work_period = "3개월~6개월";
            } else if (doc.work_period === "1year") {
                doc.work_period = "6개월~1년";
            } else if (doc.work_period === "over_1year") {
                doc.work_period = "1년이상";
            }
            if (doc.salary_type === "hour") {
                doc.salary_type = "시급";
            } else if (doc.salary_type === "day") {
                doc.salary_type = "일급";
            } else if (doc.salary_type === "week") {
                doc.salary_type = "주급";
            } else if (doc.salary_type === "month") {
                doc.salary_type = "월급";
            } else if (doc.salary_type === "year") {
                doc.salary_type = "연봉";
            } else if (doc.salary_type === "per") {
                doc.salary_type = "건별";
            }
            doc.salary = methods.put_comma_between_three_digits(doc.salary);
            if (doc.sex === "none") {
                doc.sex = "성별무관";
            } else if (doc.sex === "male") {
                doc.sex = "남자";
            } else if (doc.sex === "female") {
                doc.sex = "여자";
            }
            if (doc.educational_background === "none") {
                doc.educational_background = "학력무관";
            } else if (doc.educational_background === "primary") {
                doc.educational_background = "초등학교졸업";
            } else if (doc.educational_background === "middle") {
                doc.educational_background = "중학교졸업";
            } else if (doc.educational_background === "high") {
                doc.educational_background = "고등학교졸업";
            } else if (doc.educational_background === "university2") {
                doc.educational_background = "대학교2,3년제졸업";
            } else if (doc.educational_background === "university4") {
                doc.educational_background = "대학교4년제졸업";
            } else if (doc.educational_background === "graduate") {
                doc.educational_background = "대학원졸업";
            }
            doc.is_online = false;
            doc.is_email = false;
            doc.is_phone_message = false;
            doc.is_homepage = false;
            doc.is_visit = false;
            for (var i = 0; i < doc.receipt_methods.length; i++) {
                if (doc.receipt_methods[i] === "online") {
                    doc.is_online = true;
                } else if (doc.receipt_methods[i] === "email") {
                    doc.is_email = true;
                } else if (doc.receipt_methods[i] === "phone_message") {
                    doc.is_phone_message = true;
                } else if (doc.receipt_methods[i] === "homepage") {
                    doc.is_homepage = true;
                } else if (doc.receipt_methods[i] === "visit") {
                    doc.is_visit = true;
                }
            }
            doc.id = doc._id.toString();

            if (user === null) {
                doc.scrap_url = config.aws_s3_url + "/icons/star_empty.png";
            } else {
                var is_scrapped = false;
                for (var j = 0; j < doc.scrapped_users.length; j++) {
                    if (user._id.toString() === doc.scrapped_users[j]) {
                        is_scrapped = true;
                    }
                }
                if (is_scrapped === true) {
                    doc.scrap_url = config.aws_s3_url + "/icons/star.png";
                } else {
                    doc.scrap_url = config.aws_s3_url + "/icons/star_empty.png";
                }
            }

            return doc;
        },
        id: function () {
            return doc._id.toString();
        },
        email: function () {
            return doc.email;
        },
        phone: function () {
            return doc.phone;
        },
        is_no_deadline: function () {
            var today = new Date()
                , year = today.getFullYear()
                , month = (today.getMonth() + 1)
                , day = today.getDate()
                , date;

            if (month < 10) {
                date = year + "/0" + month;
            } else {
                date = year + "/" + month;
            }
            if (day < 10) {
                date = date + "/0" + day;
            } else {
                date = date + "/" + day;
            }
            return date <= doc.finish_date;
        }
    });
};