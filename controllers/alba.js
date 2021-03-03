const methods = require("../methods");
const config = require('../env.json')[process.env.NODE_ENV || 'development'];
const limit = require('../limit').get_all();
module.exports = function (is_mobile, user, info, page, docs, count, template) {
    template.render('alba', {
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
            if (info.type === "today") {
                return "오늘의알바 - 365알바";
            } else if (info.type === "express") {
                return "급구알바 - 365알바";
            } else if (info.type === "area") {
                return "지역별알바 - 365알바";
            } else if (info.type === "business-type") {
                return "업직종알바 - 365알바";
            } else if (info.type === "day") {
                return "일용직알바 - 365알바";
            } else if (info.type === "teenagers") {
                return "청소년알바 - 365알바";
            } else if (info.type === "university-students") {
                return "대학생알바 - 365알바";
            } else if (info.type === "middle-aged-men") {
                return "중장년알바 - 365알바";
            } else if (info.type === "foreigners") {
                return "외국인알바 - 365알바";
            } else {
                return "365알바";
            }
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
        docs: function () {
            for (var i = 0; i < docs.length; i++) {
                if (docs[i].salary_type === "hour") {
                    docs[i].salary_type = "시급";
                } else if (docs[i].salary_type === "day") {
                    docs[i].salary_type = "일급";
                } else if (docs[i].salary_type === "week") {
                    docs[i].salary_type = "주급";
                } else if (docs[i].salary_type === "month") {
                    docs[i].salary_type = "월급";
                } else if (docs[i].salary_type === "year") {
                    docs[i].salary_type = "연봉";
                } else if (docs[i].salary_type === "per") {
                    docs[i].salary_type = "건별";
                }
                docs[i].salary = methods.put_comma_between_three_digits(docs[i].salary);
                docs[i].id = docs[i]._id.toString();
                if (user === null) {
                    docs[i].scrap_url = config.aws_s3_url + "/icons/star_empty.png";
                } else {
                    var is_scrapped = false;
                    for (var j = 0; j < docs[i].scrapped_users.length; j++) {
                        if (user._id.toString() === docs[i].scrapped_users[j]) {
                            is_scrapped = true;
                        }
                    }
                    if (is_scrapped === true) {
                        docs[i].scrap_url = config.aws_s3_url + "/icons/star.png";
                    } else {
                        docs[i].scrap_url = config.aws_s3_url + "/icons/star_empty.png";
                    }
                }
            }
            return docs;
        },
        count: function () {
            return methods.put_comma_between_three_digits(count);
        },
        pagination: function () {
            var temp = parseInt(count) / limit.companies;
            var totalPages = Math.floor(parseInt(count)/limit.companies);
            if (temp > totalPages) {
                totalPages = totalPages + 1;
            }
            var pagination = methods.pagination(parseInt(page), totalPages);
            var array = [];
            for (var i = 0; i < pagination.length; i++) {
                if (pagination[i] !== "...") {
                    var url = info.url + "?page=" + pagination[i];
                    if (info.si !== undefined) {
                        url = url + "&si=" + info.si;
                    }
                    if (info.goo !== undefined) {
                        url = url + "&goo=" + info.goo;
                    }
                    if (info.dong !== undefined) {
                        url = url + "&dong=" + info.dong;
                    }
                    if (info.business_type_big !== undefined) {
                        url = url + "&business_type_big=" + info.business_type_big;
                    }
                    if (info.business_type_small !== undefined) {
                        url = url + "&business_type_small=" + info.business_type_small;
                    }
                    if (info.work_period !== undefined) {
                        url = url + "&work_period=" + info.work_period;
                    }
                    if (info.work_days !== undefined) {
                        url = url + "&work_days=" + info.work_days;
                    }
                    if (info.work_start_time !== undefined) {
                        url = url + "&work_start_time=" + info.work_start_time;
                    }
                    if (info.work_end_time !== undefined) {
                        url = url + "&work_end_time=" + info.work_end_time;
                    }
                    if (info.sex !== undefined) {
                        url = url + "&sex=" + info.sex;
                    }
                    if (info.age !== undefined) {
                        url = url + "&age=" + info.age;
                    }
                    if (info.salary_type !== undefined) {
                        url = url + "&salary_type=" + info.salary_type;
                    }
                    if (info.salary !== undefined) {
                        url = url + "&salary=" + info.salary;
                    }
                    if (info.employment_type !== undefined) {
                        url = url + "&employment_type=" + info.employment_type;
                    }
                    if (info.educational_background !== undefined) {
                        url = url + "&educational_background=" + info.educational_background;
                    }
                    if (info.near_subway !== undefined) {
                        url = url + "&near_subway=" + info.near_subway;
                    }
                    if (info.near_university !== undefined) {
                        url = url + "&near_university=" + info.near_university;
                    }
                    array.push({
                        is_current: pagination[i] === page,
                        url: url,
                        page: pagination[i]
                    });
                }
            }
            return array;
        },
        detail_title: function () {
            if (info.type === "today") {
                return "오늘의알바";
            } else if (info.type === "express") {
                return "급구알바";
            } else if (info.type === "area") {
                return "지역별알바";
            } else if (info.type === "business-type") {
                return "업직종알바";
            } else if (info.type === "day") {
                return "일용직알바";
            } else if (info.type === "teenagers") {
                return "청소년알바";
            } else if (info.type === "university-students") {
                return "대학생알바";
            } else if (info.type === "middle-aged-men") {
                return "중장년알바";
            } else if (info.type === "foreigners") {
                return "외국인알바";
            } else {
                return "알바공고";
            }
        },
        with_work_period: function () {
            if (info.type === "day") {
                return false;
            } else {
                return true;
            }
        },
        with_age: function () {
            if (info.type === "teenagers") {
                return false;
            } else if (info.type === "middle-aged-men") {
                return false;
            } else {
                return true;
            }
        }
    });
};