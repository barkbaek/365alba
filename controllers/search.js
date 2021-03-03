const methods = require("../methods");
const config = require('../env.json')[process.env.NODE_ENV || 'development'];
const limit = require('../limit').get_all();
module.exports = function (is_mobile, user, info, final, template) {
    template.render('search', {
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
            return "알바톡톡 - 365알바";
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
        final: function () {
            if (info.type === "total") {
                if (final.companies_total === 0) {
                    final.is_companies_no_empty = false;
                } else {
                    final.is_companies_no_empty = true;
                }
                if (final.resumes_total === 0) {
                    final.is_resumes_no_empty = false;
                } else {
                    final.is_resumes_no_empty = true;
                }
                if (final.albaboard_total === 0) {
                    final.is_albaboard_no_empty = false;
                } else {
                    final.is_albaboard_no_empty = true;
                }
                if (final.albareview_total === 0) {
                    final.is_albareview_no_empty = false;
                } else {
                    final.is_albareview_no_empty = true;
                }
                if (final.companies_total > 0) {
                    for (var i = 0; i < final.companies.length; i++) {
                        if (final.companies[i].salary_type === "hour") {
                            final.companies[i].salary_type = "시급";
                        } else if (final.companies[i].salary_type === "day") {
                            final.companies[i].salary_type = "일급";
                        } else if (final.companies[i].salary_type === "week") {
                            final.companies[i].salary_type = "주급";
                        } else if (final.companies[i].salary_type === "month") {
                            final.companies[i].salary_type = "월급";
                        } else if (final.companies[i].salary_type === "year") {
                            final.companies[i].salary_type = "연봉";
                        } else if (final.companies[i].salary_type === "per") {
                            final.companies[i].salary_type = "건별";
                        }
                        final.companies[i].salary = methods.put_comma_between_three_digits(final.companies[i].salary);
                    }
                }
                if (final.resumes_total > 0) {
                    for (var i = 0; i < final.resumes.length; i++) {
                        if (final.resumes[i].salary_type === "hour") {
                            final.resumes[i].salary_type = "시급";
                        } else if (final.resumes[i].salary_type === "day") {
                            final.resumes[i].salary_type = "일급";
                        } else if (final.resumes[i].salary_type === "week") {
                            final.resumes[i].salary_type = "주급";
                        } else if (final.resumes[i].salary_type === "month") {
                            final.resumes[i].salary_type = "월급";
                        } else if (final.resumes[i].salary_type === "year") {
                            final.resumes[i].salary_type = "연봉";
                        } else if (final.resumes[i].salary_type === "per") {
                            final.resumes[i].salary_type = "건별";
                        }
                        final.resumes[i].salary = methods.put_comma_between_three_digits(final.resumes[i].salary);
                        if (final.resumes[i].sex === "male") {
                            final.resumes[i].sex = "남자";
                        } else {
                            final.resumes[i].sex = "여자";
                        }
                        final.resumes[i].age = new Date().getFullYear() - final.resumes[i].birth_year + 1;
                    }
                }
            } else {
                if (info.type === "companies") {
                    for (var i = 0; i < final.sources.length; i++) {
                        if (final.sources[i].salary_type === "hour") {
                            final.sources[i].salary_type = "시급";
                        } else if (final.sources[i].salary_type === "day") {
                            final.sources[i].salary_type = "일급";
                        } else if (final.sources[i].salary_type === "week") {
                            final.sources[i].salary_type = "주급";
                        } else if (final.sources[i].salary_type === "month") {
                            final.sources[i].salary_type = "월급";
                        } else if (final.sources[i].salary_type === "year") {
                            final.sources[i].salary_type = "연봉";
                        } else if (final.sources[i].salary_type === "per") {
                            final.sources[i].salary_type = "건별";
                        }
                        final.sources[i].salary = methods.put_comma_between_three_digits(final.sources[i].salary);
                    }
                } else if (info.type === "resumes") {
                    for (var i = 0; i < final.sources.length; i++) {
                        if (final.sources[i].salary_type === "hour") {
                            final.sources[i].salary_type = "시급";
                        } else if (final.sources[i].salary_type === "day") {
                            final.sources[i].salary_type = "일급";
                        } else if (final.sources[i].salary_type === "week") {
                            final.sources[i].salary_type = "주급";
                        } else if (final.sources[i].salary_type === "month") {
                            final.sources[i].salary_type = "월급";
                        } else if (final.sources[i].salary_type === "year") {
                            final.sources[i].salary_type = "연봉";
                        } else if (final.sources[i].salary_type === "per") {
                            final.sources[i].salary_type = "건별";
                        }
                        final.sources[i].salary = methods.put_comma_between_three_digits(final.sources[i].salary);
                        if (final.sources[i].sex === "male") {
                            final.sources[i].sex = "남자";
                        } else {
                            final.sources[i].sex = "여자";
                        }
                        final.sources[i].age = new Date().getFullYear() - final.sources[i].birth_year + 1;
                    }
                }
            }
            return final;
        },
        count: function () {
            return methods.put_comma_between_three_digits(final.total);
        },
        pagination: function () {
            if (info.type !== "total") {
                var temp = parseInt(final.total) / limit["search_" + info.type];
                var totalPages = Math.floor(parseInt(final.total)/limit["search_" + info.type]);
                if (temp > totalPages) {
                    totalPages = totalPages + 1;
                }
                var pagination = methods.pagination(parseInt(info.page), totalPages);
                var array = [];
                for (var i = 0; i < pagination.length; i++) {
                    if (pagination[i] !== "...") {
                        var url = "/search?type=" + info.type + "&page=" + pagination[i] + "&query=" + methods.encode_for_url(info.query);
                        array.push({
                            is_current: pagination[i] === info.page,
                            url: url,
                            page: pagination[i]
                        });
                    }
                }
                return array;
            } else {
                return [];
            }
        },
        query: function () {
            return methods.encode_for_url(info.query);
        },
        type: function () {
            return info.type;
        },
        is_no_total: function () {
            return info.type !== "total";
        },
        is_total: function () {
            return info.type === "total";
        },
        is_companies: function () {
            return info.type === "companies";
        },
        is_resumes: function () {
            return info.type === "resumes";
        },
        is_albaboard: function () {
            return info.type === "albaboard";
        },
        is_albareview: function () {
            return info.type === "albareview";
        },
        is_empty: function () {
            if (info.type === "total") {
                var total = final.companies_total + final.resumes_total + final.albaboard_total + final.albareview_total;
                return total === 0;
            } else {
                return final.total === 0;
            }
        }
    });
};