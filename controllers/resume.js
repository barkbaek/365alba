const methods = require("../methods");
const config = require('../env.json')[process.env.NODE_ENV || 'development'];
module.exports = function (is_mobile, user, doc, template) {
    template.render('resume', {
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
            return "인재정보 - 365알바";
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
            if (user === null) {
                doc.name = doc.name.substring(0, 1) + "OO";
                doc.phone = "확인하기";
                doc.email = "비공개";
                doc.is_paid = false;
            } else {
                var is_paid = false;
                for (var i = 0; i < doc.paid_users.length; i++) {
                    if (user._id.toString() === doc.paid_users[i]) {
                        is_paid = true;
                    }
                }
                if (is_paid === true) {
                    doc.is_paid = true;
                } else {
                    doc.name = doc.name.substring(0, 1) + "OO";
                    doc.phone = "확인하기";
                    doc.email = "비공개";
                    doc.is_paid = false;
                }
            }

            if (doc.sex === "female") {
                doc.sex = "여자";
            } else {
                doc.sex = "남자";
            }
            doc.age = new Date().getFullYear() - doc.birth_year + 1;

            if (doc.final_education !== "") {
                doc.is_final_education = true;
                if (doc.final_education === "primary") {
                    doc.final_education = "초등학교졸업";
                } else if (doc.final_education === "middle") {
                    doc.final_education = "중학교졸업";
                } else if (doc.final_education === "high-in") {
                    doc.final_education = "고등학교재학";
                } else if (doc.final_education === "high") {
                    doc.final_education = "고등학교졸업";
                } else if (doc.final_education === "university2-in") {
                    doc.final_education = "대학교2,3년제재학";
                } else if (doc.final_education === "university2") {
                    doc.final_education = "대학교2,3년제졸업";
                } else if (doc.final_education === "university4-in") {
                    doc.final_education = "대학교4년제재학";
                } else if (doc.final_education === "university4") {
                    doc.final_education = "대학교4년제졸업";
                } else if (doc.final_education === "graduate") {
                    doc.final_education = "대학원졸업";
                }
            } else {
                doc.is_final_education = false;
            }

            if (doc.work_types.length > 0) {
                doc.is_work_types = true;
                for (var i = 0; i < doc.work_types.length; i++) {
                    if (doc.work_types[i] === "alba") {
                        doc.work_types[i] = "알바";
                    } else if (doc.work_types[i] === "permanent") {
                        doc.work_types[i] = "정규직";
                    } else if (doc.work_types[i] === "contract") {
                        doc.work_types[i] = "계약직";
                    } else if (doc.work_types[i] === "intern") {
                        doc.work_types[i] = "인턴";
                    }
                }
            } else {
                doc.is_work_types = false;
            }

            if (doc.work_period !== "") {
                doc.is_work_period = true;
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
            } else {
                doc.is_work_period = false;
            }

            if (doc.work_days.length > 0) {
                doc.is_work_days = true;
            } else {
                doc.is_work_days = false;
            }

            if (doc.work_start_time !== "" && doc.work_end_time !== "") {
                doc.is_work_start_time = true;
            } else {
                doc.is_work_start_time = false;
            }

            if (doc.salary_type !== "") {
                doc.is_salary_type = true;
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
            } else {
                doc.is_salary_type = false;
            }

            doc.salary = methods.put_comma_between_three_digits(doc.salary);

            if (doc.self_introduction !== "") {
                doc.is_self_introduction = true;
            } else {
                doc.is_self_introduction = false;
            }

            if (doc.careers.length > 0) {
                doc.is_careers = true;
            } else {
                doc.is_careers = false;
            }

            if (doc.language_skills.length > 0) {
                doc.is_language_skills = true;
                for (var i = 0; i < doc.language_skills.length; i++) {
                    if (doc.language_skills[i].skill === "high") {
                        doc.language_skills[i].skill = "상";
                    } else if (doc.language_skills[i].skill === "middle") {
                        doc.language_skills[i].skill = "중";
                    } else if (doc.language_skills[i].skill === "low") {
                        doc.language_skills[i].skill = "하";
                    }
                }
            } else {
                doc.is_language_skills = false;
            }

            if (doc.certificates.length > 0) {
                doc.is_certificates = true;
            } else {
                doc.is_certificates = false;
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
        }
    });
};