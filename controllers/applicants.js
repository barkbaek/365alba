const methods = require("../methods");
const config = require('../env.json')[process.env.NODE_ENV || 'development'];
const limit = require('../limit').get_all();
module.exports = function (is_mobile, user, page, doc, template) {
    template.render('applicants', {
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
            return "지원자관리 - 365알바";
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
        doc: function () {
            doc.resumes = [];
            var skip = (page - 1) * limit.applicants;
            var end = skip + limit.applicants;
            var temp = doc.applied_resumes.length;
            if (end > temp) {
                end = temp;
            }
            for (var i = skip; i < end; i++) {
                doc.resumes.push(doc.applied_resumes[i]);
            }
            for (var i = 0; i < doc.resumes.length; i++) {
                doc.resumes[i].age = new Date().getFullYear() - doc.resumes[i].birth_year + 1;
                if (doc.resumes[i].sex === "female") {
                    doc.resumes[i].sex = "여자";
                } else {
                    doc.resumes[i].sex = "남자";
                }
                if (doc.resumes[i].final_education === "primary") {
                    doc.resumes[i].final_education = "초등학교졸업";
                } else if (doc.resumes[i].final_education === "middle") {
                    doc.resumes[i].final_education = "중학교졸업";
                } else if (doc.resumes[i].final_education === "high-in") {
                    doc.resumes[i].final_education = "고등학교재학";
                } else if (doc.resumes[i].final_education === "high") {
                    doc.resumes[i].final_education = "고등학교졸업";
                } else if (doc.resumes[i].final_education === "university2-in") {
                    doc.resumes[i].final_education = "대학교2,3년제재학";
                } else if (doc.resumes[i].final_education === "university2") {
                    doc.resumes[i].final_education = "대학교2,3년제졸업";
                } else if (doc.resumes[i].final_education === "university4-in") {
                    doc.resumes[i].final_education = "대학교4년제재학";
                } else if (doc.resumes[i].final_education === "university4") {
                    doc.resumes[i].final_education = "대학교4년제졸업";
                } else if (doc.resumes[i].final_education === "graduate") {
                    doc.resumes[i].final_education = "대학원졸업";
                }
            }
            var today = new Date()
                , today_date
                , today_year = today.getFullYear()
                , today_month = (today.getMonth() + 1)
                , today_day = today.getDate();

            if (today_month < 10) {
                today_date = today_year + "/0" + today_month;
            } else {
                today_date = today_year + "/" + today_month;
            }
            if (today_day < 10) {
                today_date = today_date + "/0" + today_day;
            } else {
                today_date = today_date + "/" + today_day;
            }
            if (doc.finish_date < today_date) {
                doc.is_finished = true;
            } else {
                doc.is_finished = false;
            }
            doc.id = doc._id.toString();
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
            return doc;
        },
        count: function () {
            return methods.put_comma_between_three_digits(doc.applied_resumes.length);
        },
        pagination: function () {
            var temp = parseInt(doc.applied_resumes.length) / limit.applicants;
            var totalPages = Math.floor(parseInt(doc.applied_resumes.length)/limit.applicants);
            if (temp > totalPages) {
                totalPages = totalPages + 1;
            }
            var pagination = methods.pagination(parseInt(page), totalPages);
            var array = [];
            for (var i = 0; i < pagination.length; i++) {
                if (pagination[i] !== "...") {
                    var url = "/applicants/" + doc._id.toString() + "?page=" + pagination[i];
                    array.push({
                        is_current: pagination[i] === page,
                        url: url,
                        page: pagination[i]
                    });
                }
            }
            return array;
        }
    });
};