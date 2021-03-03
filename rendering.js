const config = require('./env.json')[process.env.NODE_ENV || 'development'];
const cookie_names = require('./cookie_names').get_all();
const crypto = require('crypto');
const es_methods = require('./es_methods');
const limit = require('./limit').get_all();
const md_methods = require('./md_methods');
const methods = require('./methods');
const randomstring = require('randomstring');

// controllers 설정
const alba = require('./controllers/alba');
const albaboard = require('./controllers/albaboard');
const albareview = require('./controllers/albareview');
const applicants = require('./controllers/applicants');
const application_status = require('./controllers/application_status');
const ceoboard = require('./controllers/ceoboard');
const charged_products = require('./controllers/charged_products');
const charge_use_details = require('./controllers/charge_use_details');
const company = require('./controllers/company');
const create_albaboard = require('./controllers/create_albaboard');
const create_albareview = require('./controllers/create_albareview');
const create_ceoboard = require('./controllers/create_ceoboard');
const create_event = require('./controllers/create_event');
const create_event_winners = require('./controllers/create_event_winners');
const edit_albaboard = require('./controllers/edit_albaboard');
const edit_albareview = require('./controllers/edit_albareview');
const edit_ceoboard = require('./controllers/edit_ceoboard');
const edit_company = require('./controllers/edit_company');
const error_404 = require('./controllers/error_404');
const event = require('./controllers/event');
const events = require('./controllers/events');
const event_winner = require('./controllers/event_winner');
const event_winners = require('./controllers/event_winners');
const forgot_password = require('./controllers/forgot_password');
const four_major_social_insurance = require('./controllers/four_major_social_insurance');
const home = require('./controllers/home');
const login = require('./controllers/login');
const manage_my_articles = require('./controllers/manage_my_articles');
const manage_notices = require('./controllers/manage_notices');
const member_information = require('./controllers/member_information');
const minimum_wages = require('./controllers/minimum_wages');
const my_resume = require('./controllers/my_resume');
const prevent_employment_fraud = require('./controllers/prevent_employment_fraud');
const register = require('./controllers/register');
const register_notice = require('./controllers/register_notice');
const reset_password = require('./controllers/reset_password');
const resume = require('./controllers/resume');
const resume_reading_companies = require('./controllers/resume_reading_companies');
const scrap_alba = require('./controllers/scrap_alba');
const search = require('./controllers/search');
const set_nick_name = require('./controllers/set_nick_name');
const single_albaboard = require('./controllers/single_albaboard');
const single_albareview = require('./controllers/single_albareview');
const single_ceoboard = require('./controllers/single_ceoboard');
const success_register = require('./controllers/success_register');
const success_reset_password = require('./controllers/success_reset_password');
const success_sent_register = require('./controllers/success_sent_register');
const success_sent_reset_password = require('./controllers/success_sent_reset_password');
const talented = require('./controllers/talented');
const wage_deferred_business_owners = require('./controllers/wage_deferred_business_owners');
const youth_labor_rights_center = require('./controllers/youth_labor_rights_center');

module.exports = {
    get_alba_area: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/alba/area?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }

        var skip = (page - 1) * limit.companies;
        var type = "area";
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        var find = {};
        var info = {};
        info.type = type;
        info.url = "/alba/area";

        try {
            if (req.query.si !== undefined) {
                find.exposure_area_si = req.query.si;
                info.si = req.query.si;
            }
            if (req.query.goo !== undefined) {
                find.exposure_area_goo = req.query.goo;
                info.goo = req.query.goo;
            }
            if (req.query.dong !== undefined) {
                find.exposure_area_dong = req.query.dong;
                info.dong = req.query.dong;
            }
            if (req.query.business_type_big !== undefined) {
                find.business_type_big = req.query.business_type_big;
                info.business_type_big = req.query.business_type_big;
            }
            if (req.query.business_type_small !== undefined) {
                find.business_type_small = req.query.business_type_small;
                info.business_type_small = req.query.business_type_small;
            }
            if (req.query.work_period !== undefined) {
                find.work_period = req.query.work_period;
                info.work_period = req.query.work_period;
            }
            if (req.query.work_days !== undefined) {
                find.work_days = req.query.work_days.split(",");
                info.work_days = req.query.work_days;
            }
            if (req.query.work_start_time !== undefined) {
                find.work_start_time = { "$lte": req.query.work_start_time};
                info.work_start_time = req.query.work_start_time;
            }
            if (req.query.work_end_time !== undefined) {
                find.work_end_time = { "$gte": req.query.work_end_time};
                info.work_end_time = req.query.work_end_time;
            }
            if (req.query.sex !== undefined) {
                find.sex = req.query.sex;
                info.sex = req.query.sex;
            }
            if (req.query.age !== undefined) {
                find.age_start = { "$lte": parseInt(req.query.age)};
                find.age_end = { "$gte": parseInt(req.query.age)};
                info.age = req.query.age;
            }
            if (req.query.salary_type !== undefined) {
                find.salary_type = req.query.salary_type;
                info.salary_type = req.query.salary_type;
            }
            if (req.query.salary !== undefined) {
                find.salary = { "$gte": parseInt(req.query.salary)};
                info.salary = req.query.salary;
            }
            if (req.query.employment_type !== undefined) {
                find.employment_type = req.query.employment_type;
                info.employment_type = req.query.employment_type;
            }
            if (req.query.educational_background !== undefined) {
                find.educational_background = req.query.educational_background;
                info.educational_background = req.query.educational_background;
            }
            if (req.query.near_subway !== undefined) {
                find.near_subway = req.query.near_subway;
                info.near_subway = req.query.near_subway;
            }
            if (req.query.near_university !== undefined) {
                find.near_university = req.query.near_university;
                info.near_university = req.query.near_university;
            }
        } catch (e) {
            return res.redirect(301, "/error/404");
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
        find.finish_date = { "$gte": today_date };
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.alba(connected_db, find, skip, function (docs) {
                md_methods.company_count(connected_db, find, function (count) {
                    return alba(is_mobile, null, info, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, null, info, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, user, info, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_alba_business_type: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/alba/business-type?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }

        var skip = (page - 1) * limit.companies;
        var type = "business-type";
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        var find = {};
        var info = {};
        info.type = type;
        info.url = "/alba/business-type";

        try {
            if (req.query.si !== undefined) {
                find.exposure_area_si = req.query.si;
                info.si = req.query.si;
            }
            if (req.query.goo !== undefined) {
                find.exposure_area_goo = req.query.goo;
                info.goo = req.query.goo;
            }
            if (req.query.dong !== undefined) {
                find.exposure_area_dong = req.query.dong;
                info.dong = req.query.dong;
            }
            if (req.query.business_type_big !== undefined) {
                find.business_type_big = req.query.business_type_big;
                info.business_type_big = req.query.business_type_big;
            }
            if (req.query.business_type_small !== undefined) {
                find.business_type_small = req.query.business_type_small;
                info.business_type_small = req.query.business_type_small;
            }
            if (req.query.work_period !== undefined) {
                find.work_period = req.query.work_period;
                info.work_period = req.query.work_period;
            }
            if (req.query.work_days !== undefined) {
                find.work_days = req.query.work_days.split(",");
                info.work_days = req.query.work_days;
            }
            if (req.query.work_start_time !== undefined) {
                find.work_start_time = { "$lte": req.query.work_start_time};
                info.work_start_time = req.query.work_start_time;
            }
            if (req.query.work_end_time !== undefined) {
                find.work_end_time = { "$gte": req.query.work_end_time};
                info.work_end_time = req.query.work_end_time;
            }
            if (req.query.sex !== undefined) {
                find.sex = req.query.sex;
                info.sex = req.query.sex;
            }
            if (req.query.age !== undefined) {
                find.age_start = { "$lte": parseInt(req.query.age)};
                find.age_end = { "$gte": parseInt(req.query.age)};
                info.age = req.query.age;
            }
            if (req.query.salary_type !== undefined) {
                find.salary_type = req.query.salary_type;
                info.salary_type = req.query.salary_type;
            }
            if (req.query.salary !== undefined) {
                find.salary = { "$gte": parseInt(req.query.salary)};
                info.salary = req.query.salary;
            }
            if (req.query.employment_type !== undefined) {
                find.employment_type = req.query.employment_type;
                info.employment_type = req.query.employment_type;
            }
            if (req.query.educational_background !== undefined) {
                find.educational_background = req.query.educational_background;
                info.educational_background = req.query.educational_background;
            }
            if (req.query.near_subway !== undefined) {
                find.near_subway = req.query.near_subway;
                info.near_subway = req.query.near_subway;
            }
            if (req.query.near_university !== undefined) {
                find.near_university = req.query.near_university;
                info.near_university = req.query.near_university;
            }
        } catch (e) {
            return res.redirect(301, "/error/404");
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
        find.finish_date = { "$gte": today_date };
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.alba(connected_db, find, skip, function (docs) {
                md_methods.company_count(connected_db, find, function (count) {
                    return alba(is_mobile, null, info, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, null, info, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, user, info, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_alba_day: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/alba/day?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }

        var skip = (page - 1) * limit.companies;
        var type = "day";
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        var find = {};
        var info = {};
        info.type = type;
        info.url = "/alba/day";

        try {
            if (req.query.si !== undefined) {
                find.exposure_area_si = req.query.si;
                info.si = req.query.si;
            }
            if (req.query.goo !== undefined) {
                find.exposure_area_goo = req.query.goo;
                info.goo = req.query.goo;
            }
            if (req.query.dong !== undefined) {
                find.exposure_area_dong = req.query.dong;
                info.dong = req.query.dong;
            }
            if (req.query.business_type_big !== undefined) {
                find.business_type_big = req.query.business_type_big;
                info.business_type_big = req.query.business_type_big;
            }
            if (req.query.business_type_small !== undefined) {
                find.business_type_small = req.query.business_type_small;
                info.business_type_small = req.query.business_type_small;
            }
            find.work_period = "1day";
            info.work_period = "1day";
            if (req.query.work_days !== undefined) {
                find.work_days = req.query.work_days.split(",");
                info.work_days = req.query.work_days;
            }
            if (req.query.work_start_time !== undefined) {
                find.work_start_time = { "$lte": req.query.work_start_time};
                info.work_start_time = req.query.work_start_time;
            }
            if (req.query.work_end_time !== undefined) {
                find.work_end_time = { "$gte": req.query.work_end_time};
                info.work_end_time = req.query.work_end_time;
            }
            if (req.query.sex !== undefined) {
                find.sex = req.query.sex;
                info.sex = req.query.sex;
            }
            if (req.query.age !== undefined) {
                find.age_start = { "$lte": parseInt(req.query.age)};
                find.age_end = { "$gte": parseInt(req.query.age)};
                info.age = req.query.age;
            }
            if (req.query.salary_type !== undefined) {
                find.salary_type = req.query.salary_type;
                info.salary_type = req.query.salary_type;
            }
            if (req.query.salary !== undefined) {
                find.salary = { "$gte": parseInt(req.query.salary)};
                info.salary = req.query.salary;
            }
            if (req.query.employment_type !== undefined) {
                find.employment_type = req.query.employment_type;
                info.employment_type = req.query.employment_type;
            }
            if (req.query.educational_background !== undefined) {
                find.educational_background = req.query.educational_background;
                info.educational_background = req.query.educational_background;
            }
            if (req.query.near_subway !== undefined) {
                find.near_subway = req.query.near_subway;
                info.near_subway = req.query.near_subway;
            }
            if (req.query.near_university !== undefined) {
                find.near_university = req.query.near_university;
                info.near_university = req.query.near_university;
            }
        } catch (e) {
            return res.redirect(301, "/error/404");
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
        find.finish_date = { "$gte": today_date };
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.alba(connected_db, find, skip, function (docs) {
                md_methods.company_count(connected_db, find, function (count) {
                    return alba(is_mobile, null, info, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, null, info, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, user, info, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_alba_express: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/alba/express?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }

        var skip = (page - 1) * limit.companies;
        var type = "express";
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        var find = {};
        var info = {};
        info.type = type;
        info.url = "/alba/express";

        try {
            if (req.query.si !== undefined) {
                find.exposure_area_si = req.query.si;
                info.si = req.query.si;
            }
            if (req.query.goo !== undefined) {
                find.exposure_area_goo = req.query.goo;
                info.goo = req.query.goo;
            }
            if (req.query.dong !== undefined) {
                find.exposure_area_dong = req.query.dong;
                info.dong = req.query.dong;
            }
            if (req.query.business_type_big !== undefined) {
                find.business_type_big = req.query.business_type_big;
                info.business_type_big = req.query.business_type_big;
            }
            if (req.query.business_type_small !== undefined) {
                find.business_type_small = req.query.business_type_small;
                info.business_type_small = req.query.business_type_small;
            }
            if (req.query.work_period !== undefined) {
                find.work_period = req.query.work_period;
                info.work_period = req.query.work_period;
            }
            if (req.query.work_days !== undefined) {
                find.work_days = req.query.work_days.split(",");
                info.work_days = req.query.work_days;
            }
            if (req.query.work_start_time !== undefined) {
                find.work_start_time = { "$lte": req.query.work_start_time};
                info.work_start_time = req.query.work_start_time;
            }
            if (req.query.work_end_time !== undefined) {
                find.work_end_time = { "$gte": req.query.work_end_time};
                info.work_end_time = req.query.work_end_time;
            }
            if (req.query.sex !== undefined) {
                find.sex = req.query.sex;
                info.sex = req.query.sex;
            }
            if (req.query.age !== undefined) {
                find.age_start = { "$lte": parseInt(req.query.age)};
                find.age_end = { "$gte": parseInt(req.query.age)};
                info.age = req.query.age;
            }
            if (req.query.salary_type !== undefined) {
                find.salary_type = req.query.salary_type;
                info.salary_type = req.query.salary_type;
            }
            if (req.query.salary !== undefined) {
                find.salary = { "$gte": parseInt(req.query.salary)};
                info.salary = req.query.salary;
            }
            if (req.query.employment_type !== undefined) {
                find.employment_type = req.query.employment_type;
                info.employment_type = req.query.employment_type;
            }
            if (req.query.educational_background !== undefined) {
                find.educational_background = req.query.educational_background;
                info.educational_background = req.query.educational_background;
            }
            if (req.query.near_subway !== undefined) {
                find.near_subway = req.query.near_subway;
                info.near_subway = req.query.near_subway;
            }
            if (req.query.near_university !== undefined) {
                find.near_university = req.query.near_university;
                info.near_university = req.query.near_university;
            }
        } catch (e) {
            return res.redirect(301, "/error/404");
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
        find.finish_date = { "$gte": today_date };

        find.is_express = true;
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.alba(connected_db, find, skip, function (docs) {
                md_methods.company_count(connected_db, find, function (count) {
                    return alba(is_mobile, null, info, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, null, info, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, user, info, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_alba_foreigners: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/alba/foreigners?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }

        var skip = (page - 1) * limit.companies;
        var type = "foreigners";
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        var find = {};
        var info = {};
        info.type = type;
        info.url = "/alba/foreigners";

        try {
            if (req.query.si !== undefined) {
                find.exposure_area_si = req.query.si;
                info.si = req.query.si;
            }
            if (req.query.goo !== undefined) {
                find.exposure_area_goo = req.query.goo;
                info.goo = req.query.goo;
            }
            if (req.query.dong !== undefined) {
                find.exposure_area_dong = req.query.dong;
                info.dong = req.query.dong;
            }
            if (req.query.business_type_big !== undefined) {
                find.business_type_big = req.query.business_type_big;
                info.business_type_big = req.query.business_type_big;
            }
            if (req.query.business_type_small !== undefined) {
                find.business_type_small = req.query.business_type_small;
                info.business_type_small = req.query.business_type_small;
            }
            if (req.query.work_period !== undefined) {
                find.work_period = req.query.work_period;
                info.work_period = req.query.work_period;
            }
            if (req.query.work_days !== undefined) {
                find.work_days = req.query.work_days.split(",");
                info.work_days = req.query.work_days;
            }
            if (req.query.work_start_time !== undefined) {
                find.work_start_time = { "$lte": req.query.work_start_time};
                info.work_start_time = req.query.work_start_time;
            }
            if (req.query.work_end_time !== undefined) {
                find.work_end_time = { "$gte": req.query.work_end_time};
                info.work_end_time = req.query.work_end_time;
            }
            if (req.query.sex !== undefined) {
                find.sex = req.query.sex;
                info.sex = req.query.sex;
            }
            if (req.query.age !== undefined) {
                find.age_start = { "$lte": parseInt(req.query.age)};
                find.age_end = { "$gte": parseInt(req.query.age)};
                info.age = req.query.age;
            }
            if (req.query.salary_type !== undefined) {
                find.salary_type = req.query.salary_type;
                info.salary_type = req.query.salary_type;
            }
            if (req.query.salary !== undefined) {
                find.salary = { "$gte": parseInt(req.query.salary)};
                info.salary = req.query.salary;
            }
            if (req.query.employment_type !== undefined) {
                find.employment_type = req.query.employment_type;
                info.employment_type = req.query.employment_type;
            }
            if (req.query.educational_background !== undefined) {
                find.educational_background = req.query.educational_background;
                info.educational_background = req.query.educational_background;
            }
            if (req.query.near_subway !== undefined) {
                find.near_subway = req.query.near_subway;
                info.near_subway = req.query.near_subway;
            }
            if (req.query.near_university !== undefined) {
                find.near_university = req.query.near_university;
                info.near_university = req.query.near_university;
            }
        } catch (e) {
            return res.redirect(301, "/error/404");
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
        find.finish_date = { "$gte": today_date };

        find.foreigner = true;
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.alba(connected_db, find, skip, function (docs) {
                md_methods.company_count(connected_db, find, function (count) {
                    return alba(is_mobile, null, info, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, null, info, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, user, info, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_alba_middle_aged_men: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/alba/middle-aged-men?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }

        var skip = (page - 1) * limit.companies;
        var type = "middle-aged-men";
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        var find = {};
        var info = {};
        info.type = type;
        info.url = "/alba/middle-aged-men";

        try {
            if (req.query.si !== undefined) {
                find.exposure_area_si = req.query.si;
                info.si = req.query.si;
            }
            if (req.query.goo !== undefined) {
                find.exposure_area_goo = req.query.goo;
                info.goo = req.query.goo;
            }
            if (req.query.dong !== undefined) {
                find.exposure_area_dong = req.query.dong;
                info.dong = req.query.dong;
            }
            if (req.query.business_type_big !== undefined) {
                find.business_type_big = req.query.business_type_big;
                info.business_type_big = req.query.business_type_big;
            }
            if (req.query.business_type_small !== undefined) {
                find.business_type_small = req.query.business_type_small;
                info.business_type_small = req.query.business_type_small;
            }
            if (req.query.work_period !== undefined) {
                find.work_period = req.query.work_period;
                info.work_period = req.query.work_period;
            }
            if (req.query.work_days !== undefined) {
                find.work_days = req.query.work_days.split(",");
                info.work_days = req.query.work_days;
            }
            if (req.query.work_start_time !== undefined) {
                find.work_start_time = { "$lte": req.query.work_start_time};
                info.work_start_time = req.query.work_start_time;
            }
            if (req.query.work_end_time !== undefined) {
                find.work_end_time = { "$gte": req.query.work_end_time};
                info.work_end_time = req.query.work_end_time;
            }
            if (req.query.sex !== undefined) {
                find.sex = req.query.sex;
                info.sex = req.query.sex;
            }
            find.age_start = { "$lte": 40};
            find.age_end = { "$gte": 40};
            if (req.query.salary_type !== undefined) {
                find.salary_type = req.query.salary_type;
                info.salary_type = req.query.salary_type;
            }
            if (req.query.salary !== undefined) {
                find.salary = { "$gte": parseInt(req.query.salary)};
                info.salary = req.query.salary;
            }
            if (req.query.employment_type !== undefined) {
                find.employment_type = req.query.employment_type;
                info.employment_type = req.query.employment_type;
            }
            if (req.query.educational_background !== undefined) {
                find.educational_background = req.query.educational_background;
                info.educational_background = req.query.educational_background;
            }
            if (req.query.near_subway !== undefined) {
                find.near_subway = req.query.near_subway;
                info.near_subway = req.query.near_subway;
            }
            if (req.query.near_university !== undefined) {
                find.near_university = req.query.near_university;
                info.near_university = req.query.near_university;
            }
        } catch (e) {
            return res.redirect(301, "/error/404");
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
        find.finish_date = { "$gte": today_date };
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.alba(connected_db, find, skip, function (docs) {
                md_methods.company_count(connected_db, find, function (count) {
                    return alba(is_mobile, null, info, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, null, info, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, user, info, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_alba_teenagers: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/alba/teenagers?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }

        var skip = (page - 1) * limit.companies;
        var type = "teenagers";
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        var find = {};
        var info = {};
        info.type = type;
        info.url = "/alba/teenagers";

        try {
            if (req.query.si !== undefined) {
                find.exposure_area_si = req.query.si;
                info.si = req.query.si;
            }
            if (req.query.goo !== undefined) {
                find.exposure_area_goo = req.query.goo;
                info.goo = req.query.goo;
            }
            if (req.query.dong !== undefined) {
                find.exposure_area_dong = req.query.dong;
                info.dong = req.query.dong;
            }
            if (req.query.business_type_big !== undefined) {
                find.business_type_big = req.query.business_type_big;
                info.business_type_big = req.query.business_type_big;
            }
            if (req.query.business_type_small !== undefined) {
                find.business_type_small = req.query.business_type_small;
                info.business_type_small = req.query.business_type_small;
            }
            if (req.query.work_period !== undefined) {
                find.work_period = req.query.work_period;
                info.work_period = req.query.work_period;
            }
            if (req.query.work_days !== undefined) {
                find.work_days = req.query.work_days.split(",");
                info.work_days = req.query.work_days;
            }
            if (req.query.work_start_time !== undefined) {
                find.work_start_time = { "$lte": req.query.work_start_time};
                info.work_start_time = req.query.work_start_time;
            }
            if (req.query.work_end_time !== undefined) {
                find.work_end_time = { "$gte": req.query.work_end_time};
                info.work_end_time = req.query.work_end_time;
            }
            if (req.query.sex !== undefined) {
                find.sex = req.query.sex;
                info.sex = req.query.sex;
            }
            find.age_start = { "$lte": 19};
            find.age_end = { "$gte": 19};
            if (req.query.salary_type !== undefined) {
                find.salary_type = req.query.salary_type;
                info.salary_type = req.query.salary_type;
            }
            if (req.query.salary !== undefined) {
                find.salary = { "$gte": parseInt(req.query.salary)};
                info.salary = req.query.salary;
            }
            if (req.query.employment_type !== undefined) {
                find.employment_type = req.query.employment_type;
                info.employment_type = req.query.employment_type;
            }
            if (req.query.educational_background !== undefined) {
                find.educational_background = req.query.educational_background;
                info.educational_background = req.query.educational_background;
            }
            if (req.query.near_subway !== undefined) {
                find.near_subway = req.query.near_subway;
                info.near_subway = req.query.near_subway;
            }
            if (req.query.near_university !== undefined) {
                find.near_university = req.query.near_university;
                info.near_university = req.query.near_university;
            }
        } catch (e) {
            return res.redirect(301, "/error/404");
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
        find.finish_date = { "$gte": today_date };
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.alba(connected_db, find, skip, function (docs) {
                md_methods.company_count(connected_db, find, function (count) {
                    return alba(is_mobile, null, info, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, null, info, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, user, info, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_alba_today: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/alba/today?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }

        var skip = (page - 1) * limit.companies;
        var type = "today";
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        var find = {};
        var info = {};
        info.type = type;
        info.url = "/alba/today";

        try {
            if (req.query.si !== undefined) {
                find.exposure_area_si = req.query.si;
                info.si = req.query.si;
            }
            if (req.query.goo !== undefined) {
                find.exposure_area_goo = req.query.goo;
                info.goo = req.query.goo;
            }
            if (req.query.dong !== undefined) {
                find.exposure_area_dong = req.query.dong;
                info.dong = req.query.dong;
            }
            if (req.query.business_type_big !== undefined) {
                find.business_type_big = req.query.business_type_big;
                info.business_type_big = req.query.business_type_big;
            }
            if (req.query.business_type_small !== undefined) {
                find.business_type_small = req.query.business_type_small;
                info.business_type_small = req.query.business_type_small;
            }
            if (req.query.work_period !== undefined) {
                find.work_period = req.query.work_period;
                info.work_period = req.query.work_period;
            }
            if (req.query.work_days !== undefined) {
                find.work_days = req.query.work_days.split(",");
                info.work_days = req.query.work_days;
            }
            if (req.query.work_start_time !== undefined) {
                find.work_start_time = { "$lte": req.query.work_start_time};
                info.work_start_time = req.query.work_start_time;
            }
            if (req.query.work_end_time !== undefined) {
                find.work_end_time = { "$gte": req.query.work_end_time};
                info.work_end_time = req.query.work_end_time;
            }
            if (req.query.sex !== undefined) {
                find.sex = req.query.sex;
                info.sex = req.query.sex;
            }
            if (req.query.age !== undefined) {
                find.age_start = { "$lte": parseInt(req.query.age)};
                find.age_end = { "$gte": parseInt(req.query.age)};
                info.age = req.query.age;
            }
            if (req.query.salary_type !== undefined) {
                find.salary_type = req.query.salary_type;
                info.salary_type = req.query.salary_type;
            }
            if (req.query.salary !== undefined) {
                find.salary = { "$gte": parseInt(req.query.salary)};
                info.salary = req.query.salary;
            }
            if (req.query.employment_type !== undefined) {
                find.employment_type = req.query.employment_type;
                info.employment_type = req.query.employment_type;
            }
            if (req.query.educational_background !== undefined) {
                find.educational_background = req.query.educational_background;
                info.educational_background = req.query.educational_background;
            }
            if (req.query.near_subway !== undefined) {
                find.near_subway = req.query.near_subway;
                info.near_subway = req.query.near_subway;
            }
            if (req.query.near_university !== undefined) {
                find.near_university = req.query.near_university;
                info.near_university = req.query.near_university;
            }
        } catch (e) {
            return res.redirect(301, "/error/404");
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
        find.finish_date = { "$gte": today_date };
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.alba(connected_db, find, skip, function (docs) {
                md_methods.company_count(connected_db, find, function (count) {
                    return alba(is_mobile, null, info, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, null, info, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, user, info, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_alba_university_students: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/alba/university-students?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }

        var skip = (page - 1) * limit.companies;
        var type = "university-students";
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        var find = {};
        var info = {};
        info.type = type;
        info.url = "/alba/university-students";

        try {
            if (req.query.si !== undefined) {
                find.exposure_area_si = req.query.si;
                info.si = req.query.si;
            }
            if (req.query.goo !== undefined) {
                find.exposure_area_goo = req.query.goo;
                info.goo = req.query.goo;
            }
            if (req.query.dong !== undefined) {
                find.exposure_area_dong = req.query.dong;
                info.dong = req.query.dong;
            }
            if (req.query.business_type_big !== undefined) {
                find.business_type_big = req.query.business_type_big;
                info.business_type_big = req.query.business_type_big;
            }
            if (req.query.business_type_small !== undefined) {
                find.business_type_small = req.query.business_type_small;
                info.business_type_small = req.query.business_type_small;
            }
            if (req.query.work_period !== undefined) {
                find.work_period = req.query.work_period;
                info.work_period = req.query.work_period;
            }
            if (req.query.work_days !== undefined) {
                find.work_days = req.query.work_days.split(",");
                info.work_days = req.query.work_days;
            }
            if (req.query.work_start_time !== undefined) {
                find.work_start_time = { "$lte": req.query.work_start_time};
                info.work_start_time = req.query.work_start_time;
            }
            if (req.query.work_end_time !== undefined) {
                find.work_end_time = { "$gte": req.query.work_end_time};
                info.work_end_time = req.query.work_end_time;
            }
            if (req.query.sex !== undefined) {
                find.sex = req.query.sex;
                info.sex = req.query.sex;
            }
            if (req.query.age !== undefined) {
                find.age_start = { "$lte": parseInt(req.query.age)};
                find.age_end = { "$gte": parseInt(req.query.age)};
                info.age = req.query.age;
            }
            if (req.query.salary_type !== undefined) {
                find.salary_type = req.query.salary_type;
                info.salary_type = req.query.salary_type;
            }
            if (req.query.salary !== undefined) {
                find.salary = { "$gte": parseInt(req.query.salary)};
                info.salary = req.query.salary;
            }
            if (req.query.employment_type !== undefined) {
                find.employment_type = req.query.employment_type;
                info.employment_type = req.query.employment_type;
            }
            if (req.query.educational_background !== undefined) {
                find.educational_background = req.query.educational_background;
                info.educational_background = req.query.educational_background;
            }
            if (req.query.near_subway !== undefined) {
                find.near_subway = req.query.near_subway;
                info.near_subway = req.query.near_subway;
            }
            if (req.query.near_university !== undefined) {
                find.near_university = req.query.near_university;
                info.near_university = req.query.near_university;
            }
        } catch (e) {
            return res.redirect(301, "/error/404");
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
        find.finish_date = { "$gte": today_date };

        find.university_student = true;
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.alba(connected_db, find, skip, function (docs) {
                md_methods.company_count(connected_db, find, function (count) {
                    return alba(is_mobile, null, info, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, null, info, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return alba(is_mobile, user, info, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_albaboard: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/albaboard?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }
        var skip = (page - 1) * limit.articles;
        var find = {};
        find.type = "albaboard";
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.articles(connected_db, find, skip, function (docs) {
                md_methods.article_count(connected_db, find, function (count) {
                    return albaboard(is_mobile, null, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.articles(connected_db, find, skip, function (docs) {
                    md_methods.article_count(connected_db, find, function (count) {
                        return albaboard(is_mobile, null, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.articles(connected_db, find, skip, function (docs) {
                    md_methods.article_count(connected_db, find, function (count) {
                        return albaboard(is_mobile, user, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_albareview: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/albareview?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }
        var skip = (page - 1) * limit.articles;
        var find = {};
        find.type = "albareview";
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.articles(connected_db, find, skip, function (docs) {
                md_methods.article_count(connected_db, find, function (count) {
                    return albareview(is_mobile, null, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.articles(connected_db, find, skip, function (docs) {
                    md_methods.article_count(connected_db, find, function (count) {
                        return albareview(is_mobile, null, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.articles(connected_db, find, skip, function (docs) {
                    md_methods.article_count(connected_db, find, function (count) {
                        return albareview(is_mobile, user, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_applicants: function (req, res, connected_db, es_client) {
        var id = req.params.id;
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/applicants/" + id + "?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/error/404');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/error/404');
            }, function (user) {
                md_methods.company(connected_db, id, function (nothing) {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    if (doc.user_id === user_id) {
                        return applicants(is_mobile, user, page, doc, res);
                    } else {
                        return res.redirect(301, '/error/404');
                    }
                });
            });
        }
    },
    get_application_status: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/application-status?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }
        var skip = (page - 1) * limit.companies;
        var find = {};
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, "/error/404");
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, "/error/404");
            }, function (user) {
                if (user.is_user === false) {
                    return res.redirect(301, "/error/404");
                }
                md_methods.my_resume(connected_db, user_id, function () {
                    return res.redirect(301, "/error/404");
                }, function () {
                    return res.redirect(301, "/error/404");
                }, function (doc) {
                    user.resume_id = doc._id.toString();
                    find["applied_resumes._id"] = doc._id.toString();
                    md_methods.alba(connected_db, find, skip, function (docs) {
                        md_methods.company_count(connected_db, find, function (count) {
                            return application_status(is_mobile, user, page, docs, count, res);
                        });
                    });
                });
            });
        }
    },
    get_ceoboard: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/ceoboard?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }
        var skip = (page - 1) * limit.articles;
        var find = {};
        find.type = "ceoboard";
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.articles(connected_db, find, skip, function (docs) {
                md_methods.article_count(connected_db, find, function (count) {
                    return ceoboard(is_mobile, null, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.articles(connected_db, find, skip, function (docs) {
                    md_methods.article_count(connected_db, find, function (count) {
                        return ceoboard(is_mobile, null, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.articles(connected_db, find, skip, function (docs) {
                    md_methods.article_count(connected_db, find, function (count) {
                        return ceoboard(is_mobile, user, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_charged_products: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return charged_products(is_mobile, null, res);
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return charged_products(is_mobile, null, res);
            }, function (user) {
                return charged_products(is_mobile, user, res);
            });
        }
    },
    get_charge_use_details: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return charge_use_details(is_mobile, null, res);
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return charge_use_details(is_mobile, null, res);
            }, function (user) {
                return charge_use_details(is_mobile, user, res);
            });
        }
    },
    get_company: function (req, res, connected_db, es_client) {
        var id = req.params.id;
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.company(connected_db, id, function (nothing) {
                return res.redirect(301, '/error/404');
            }, function (doc) {
                doc.count_view = doc.count_view + 1;
                md_methods.update_count_view(connected_db, "companies", id, doc.count_view, function () {
                    return company(is_mobile, null, doc, res);
                }, function () {
                    return company(is_mobile, null, doc, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.company(connected_db, id, function (nothing) {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    doc.count_view = doc.count_view + 1;
                    md_methods.update_count_view(connected_db, "companies", id, doc.count_view, function () {
                        return company(is_mobile, null, doc, res);
                    }, function () {
                        return company(is_mobile, null, doc, res);
                    });
                });
            }, function (user) {
                md_methods.company(connected_db, id, function (nothing) {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    doc.count_view = doc.count_view + 1;
                    md_methods.update_count_view(connected_db, "companies", id, doc.count_view, function () {
                        return company(is_mobile, user, doc, res);
                    }, function () {
                        return company(is_mobile, user, doc, res);
                    });
                });
            });
        }
    },
    get_create_albaboard: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/login');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/login');
            }, function (user) {
                return create_albaboard(is_mobile, user, res);
            });
        }
    },
    get_create_albareview: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/login');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/login');
            }, function (user) {
                return create_albareview(is_mobile, user, res);
            });
        }
    },
    get_create_ceoboard: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/login');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/login');
            }, function (user) {
                return create_ceoboard(is_mobile, user, res);
            });
        }
    },
    get_create_event: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/login');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/login');
            }, function (user) {
                if (user.nick_name !== "관리자") {
                    return res.redirect(301, '/login');
                } else {
                    return create_event(is_mobile, user, res);
                }
            });
        }
    },
    get_create_event_winners: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/login');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/login');
            }, function (user) {
                if (user.nick_name !== "관리자") {
                    return res.redirect(301, '/login');
                } else {
                    return create_event_winners(is_mobile, user, res);
                }
            });
        }
    },
    get_edit_albaboard: function (req, res, connected_db, es_client) {
        var id = req.params.id;
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/error/404');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/error/404');
            }, function (user) {
                md_methods.article(connected_db, id, function (nothing) {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    if (doc.user_id === user_id) {
                        return edit_albaboard(is_mobile, user, res);
                    } else {
                        return res.redirect(301, '/error/404');
                    }
                });
            });
        }
    },
    get_edit_albareview: function (req, res, connected_db, es_client) {
        var id = req.params.id;
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/error/404');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/error/404');
            }, function (user) {
                md_methods.article(connected_db, id, function (nothing) {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    if (doc.user_id === user_id) {
                        return edit_albareview(is_mobile, user, res);
                    } else {
                        return res.redirect(301, '/error/404');
                    }
                });
            });
        }
    },
    get_edit_ceoboard: function (req, res, connected_db, es_client) {
        var id = req.params.id;
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/error/404');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/error/404');
            }, function (user) {
                md_methods.article(connected_db, id, function (nothing) {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    if (doc.user_id === user_id) {
                        return edit_ceoboard(is_mobile, user, res);
                    } else {
                        return res.redirect(301, '/error/404');
                    }
                });
            });
        }
    },
    get_edit_company: function (req, res, connected_db, es_client) {
        var id = req.params.id;
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/error/404');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/error/404');
            }, function (user) {
                md_methods.company(connected_db, id, function (nothing) {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    if (doc.user_id === user_id) {
                        return edit_company(is_mobile, user, res);
                    } else {
                        return res.redirect(301, '/error/404');
                    }
                });
            });
        }
    },
    get_error_404: function (req, res, connected_db, es_client) {
        return error_404(res);
    },
    get_event: function (req, res, connected_db, es_client) {
        var number = req.params.number;
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.event(connected_db, number, function () {
                return res.redirect(301, '/error/404');
            }, function (doc) {
                md_methods.update_count_view(connected_db, "events", doc._id.toString(), doc.count_view + 1, function () {
                    return event(is_mobile, null, doc, res);
                }, function () {
                    doc.count_view = doc.count_view + 1;
                    return event(is_mobile, null, doc, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.event(connected_db, number, function () {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    md_methods.update_count_view(connected_db, "events", doc._id.toString(), doc.count_view + 1, function () {
                        return event(is_mobile, null, doc, res);
                    }, function () {
                        doc.count_view = doc.count_view + 1;
                        return event(is_mobile, null, doc, res);
                    });
                });
            }, function (user) {
                md_methods.event(connected_db, number, function () {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    md_methods.update_count_view(connected_db, "events", doc._id.toString(), doc.count_view + 1, function () {
                        return event(is_mobile, user, doc, res);
                    }, function () {
                        doc.count_view = doc.count_view + 1;
                        return event(is_mobile, user, doc, res);
                    });
                });
            });
        }
    },
    get_events: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/events?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }
        var skip = (page - 1) * limit.events;
        var find = {};
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.events(connected_db, find, skip, function (docs) {
                md_methods.event_count(connected_db, find, function (count) {
                    return events(is_mobile, null, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.events(connected_db, find, skip, function (docs) {
                    md_methods.event_count(connected_db, find, function (count) {
                        return events(is_mobile, null, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.events(connected_db, find, skip, function (docs) {
                    md_methods.event_count(connected_db, find, function (count) {
                        return events(is_mobile, user, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_event_winner: function (req, res, connected_db, es_client) {
        var id = req.params.id;
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.winner(connected_db, id, function () {
                return res.redirect(301, '/error/404');
            }, function (doc) {
                md_methods.update_count_view(connected_db, "winners", doc._id.toString(), doc.count_view + 1, function () {
                    return event_winner(is_mobile, null, doc, res);
                }, function () {
                    doc.count_view = doc.count_view + 1;
                    return event_winner(is_mobile, null, doc, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.winner(connected_db, id, function () {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    md_methods.update_count_view(connected_db, "winners", doc._id.toString(), doc.count_view + 1, function () {
                        return event_winner(is_mobile, null, doc, res);
                    }, function () {
                        doc.count_view = doc.count_view + 1;
                        return event_winner(is_mobile, null, doc, res);
                    });
                });
            }, function (user) {
                md_methods.winner(connected_db, id, function () {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    md_methods.update_count_view(connected_db, "winners", doc._id.toString(), doc.count_view + 1, function () {
                        return event_winner(is_mobile, user, doc, res);
                    }, function () {
                        doc.count_view = doc.count_view + 1;
                        return event_winner(is_mobile, user, doc, res);
                    });
                });
            });
        }
    },
    get_event_winners: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/event-winners?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }
        var skip = (page - 1) * limit.winners;
        var find = {};
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.winners(connected_db, find, skip, function (docs) {
                md_methods.winner_count(connected_db, find, function (count) {
                    return event_winners(is_mobile, null, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.winners(connected_db, find, skip, function (docs) {
                    md_methods.winner_count(connected_db, find, function (count) {
                        return event_winners(is_mobile, null, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.winners(connected_db, find, skip, function (docs) {
                    md_methods.winner_count(connected_db, find, function (count) {
                        return event_winners(is_mobile, user, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_forgot_password: function (req, res, connected_db, es_client) {
        return forgot_password(res);
    },
    get_four_major_social_insurance: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return four_major_social_insurance(is_mobile, null, res);
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return four_major_social_insurance(is_mobile, null, res);
            }, function (user) {
                return four_major_social_insurance(is_mobile, user, res);
            });
        }
    },
    get_home: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        var data = {};
        md_methods.home_alba_today(connected_db, function (docs) {
            data.today = docs;
            md_methods.home_alba_express(connected_db, function (docs) {
                data.express = docs;
                md_methods.home_albaboard(connected_db, function (docs) {
                    data.albaboard = docs;
                    md_methods.home_albareview(connected_db, function (docs) {
                        data.albareview = docs;
                        if (user_id === null) {
                            return home(is_mobile, null, data, res);
                        } else {
                            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                                return home(is_mobile, null, data, res);
                            }, function (user) {
                                return home(is_mobile, user, data, res);
                            });
                        }
                    });
                });
            });
        });
    },
    get_login: function (req, res, connected_db, es_client) {
        return login(res);
    },
    get_logout: function (req, res, connected_db, es_client) {
        res.cookie(cookie_names["user_id"], '', {maxAge : 365 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.redirect(301, '/');
    },
    get_manage_my_articles: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/manage-my-articles?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }
        var skip = (page - 1) * limit.articles;
        var find = {};

        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/error/404');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/error/404');
            }, function (user) {
                find.user_id = user_id;
                md_methods.articles(connected_db, find, skip, function (docs) {
                    md_methods.article_count(connected_db, find, function (count) {
                        return manage_my_articles(is_mobile, user, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_manage_notices: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/manage-notices?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }
        var skip = (page - 1) * limit.companies;
        var find = {};
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/error/404');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/error/404');
            }, function (user) {
                find.user_id = user_id;
                md_methods.my_companies(connected_db, user_id, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return manage_notices(is_mobile, user, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_member_information: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return member_information(is_mobile, null, res);
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return member_information(is_mobile, null, res);
            }, function (user) {
                return member_information(is_mobile, user, res);
            });
        }
    },
    get_minimum_wages: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return minimum_wages(is_mobile, null, res);
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return minimum_wages(is_mobile, null, res);
            }, function (user) {
                return minimum_wages(is_mobile, user, res);
            });
        }
    },
    get_my_resume: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/login');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/login');
            }, function (user) {
                return my_resume(is_mobile, user, res);
            });
        }
    },
    get_prevent_employment_fraud: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return prevent_employment_fraud(is_mobile, null, res);
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return prevent_employment_fraud(is_mobile, null, res);
            }, function (user) {
                return prevent_employment_fraud(is_mobile, user, res);
            });
        }
    },
    get_register: function (req, res, connected_db, es_client) {
        return register(res);
    },
    get_register_notice: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return register_notice(is_mobile, null, res);
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return register_notice(is_mobile, null, res);
            }, function (user) {
                return register_notice(is_mobile, user, res);
            });
        }
    },
    get_reset_password: function (req, res, connected_db, es_client) {
        return reset_password(res);
    },
    get_resume: function (req, res, connected_db, es_client) {
        var id = req.params.id;
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.resume(connected_db, id, function (nothing) {
                return res.redirect(301, '/error/404');
            }, function (doc) {
                return resume(is_mobile, null, doc, res);
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.resume(connected_db, id, function (nothing) {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    return resume(is_mobile, null, doc, res);
                });
            }, function (user) {
                if (user.is_user === true) {
                    md_methods.resume(connected_db, id, function (nothing) {
                        return res.redirect(301, '/error/404');
                    }, function (doc) {
                        return resume(is_mobile, user, doc, res);
                    });
                } else {
                    md_methods.my_last_company(connected_db, user_id, function (doc) {
                        if (doc === null) {
                            md_methods.resume(connected_db, id, function (nothing) {
                                return res.redirect(301, '/error/404');
                            }, function (doc) {
                                return resume(is_mobile, user, doc, res);
                            });
                        } else {
                            for (var i = 0; i < doc.applied_resumes.length; i++) {
                                if (doc.applied_resumes[i]._id === id) {
                                    doc.applied_resumes[i].is_opened = true;
                                }
                            }
                            var is_opened = false;
                            for (var i = 0; i < doc.opened_resumes.length; i++) {
                                if (doc.opened_resumes[i] === id) {
                                    is_opened = true;
                                }
                            }
                            if (is_opened === false) {
                                doc.opened_resumes.push(id);
                            }
                            var set = { "$set": {} };
                            set["$set"].applied_resumes = doc.applied_resumes;
                            set["$set"].opened_resumes = doc.opened_resumes;
                            md_methods.update_company(connected_db, doc._id.toString(), doc.user_id, set, function () {
                                md_methods.resume(connected_db, id, function (nothing) {
                                    return res.redirect(301, '/error/404');
                                }, function (doc) {
                                    return resume(is_mobile, user, doc, res);
                                });
                            }, function () {
                                md_methods.resume(connected_db, id, function (nothing) {
                                    return res.redirect(301, '/error/404');
                                }, function (doc) {
                                    return resume(is_mobile, user, doc, res);
                                });
                            });
                        }
                    });
                }
            });
        }
    },
    get_resume_reading_companies: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/resume-reading-companies?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }
        var skip = (page - 1) * limit.companies;
        var find = {};
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, "/error/404");
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, "/error/404");
            }, function (user) {
                if (user.is_user === false) {
                    return res.redirect(301, "/error/404");
                }
                md_methods.my_resume(connected_db, user_id, function () {
                    return res.redirect(301, "/error/404");
                }, function () {
                    return res.redirect(301, "/error/404");
                }, function (doc) {
                    user.resume_id = doc._id.toString();
                    find["opened_resumes"] = doc._id.toString();
                    md_methods.alba(connected_db, find, skip, function (docs) {
                        md_methods.company_count(connected_db, find, function (count) {
                            return resume_reading_companies(is_mobile, user, page, docs, count, res);
                        });
                    });
                });
            });
        }
    },
    get_scrap_alba: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/scrap-alba?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }
        var skip = (page - 1) * limit.companies;
        var find = {};
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/error/404');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/error/404');
            }, function (user) {
                find.scrapped_users = user_id;
                md_methods.alba(connected_db, find, skip, function (docs) {
                    md_methods.company_count(connected_db, find, function (count) {
                        return scrap_alba(is_mobile, user, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_search: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        var info = {};
        info.type = req.query.type;
        info.query = req.query.query;
        info.page = req.query.page;
        try {
            info.page = parseInt(info.page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }
        if (info.query === undefined || info.query === null) {
            info.query = "";
        }
        info.from = 0;
        info.size = limit.search_all;
        if (info.type === undefined) {
            return res.redirect(301, "/search?type=total&query=" + methods.encode_for_url(info.query));
        }
        if (info.type === "total") {
            info.from = 0;
            info.size = limit.search_all;
        } else if (info.type === "companies") {
            if (info.page === undefined || info.page === null) {
                return res.redirect(301, "/search?type=companies&page=1&query=" + methods.encode_for_url(info.query));
            }
            info.from = (info.page - 1) * limit.search_companies;
            info.size = limit.search_companies;
        } else if (info.type === "resumes") {
            if (info.page === undefined || info.page === null) {
                return res.redirect(301, "/search?type=resumes&page=1&query=" + methods.encode_for_url(info.query));
            }
            info.from = (info.page - 1) * limit.search_resumes;
            info.size = limit.search_resumes;
        } else if (info.type === "albaboard") {
            if (info.page === undefined || info.page === null) {
                return res.redirect(301, "/search?type=albaboard&page=1&query=" + methods.encode_for_url(info.query));
            }
            info.from = (info.page - 1) * limit.search_albaboard;
            info.size = limit.search_albaboard;
        } else if (info.type === "albareview") {
            if (info.page === undefined || info.page === null) {
                return res.redirect(301, "/search?type=albareview&page=1&query=" + methods.encode_for_url(info.query));
            }
            info.from = (info.page - 1) * limit.search_albareview;
            info.size = limit.search_albareview;
        } else {
            return res.redirect(301, "/error/404");
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;

        if (info.type === "total") {
            es_methods.search_all(es_client, info, function (final) {
                console.dir(final);
                if (user_id === null) {
                    return search(is_mobile, null, info, final, res);
                } else {
                    md_methods.check_user_by_user_id(connected_db, user_id, function () {
                        return search(is_mobile, null, info, final, res);
                    }, function (user) {
                        return search(is_mobile, user, info, final, res);
                    });
                }
            });
        } else {
            es_methods.search(es_client, info.type, info, function (final) {
                console.dir(final);
                if (user_id === null) {
                    return search(is_mobile, null, info, final, res);
                } else {
                    md_methods.check_user_by_user_id(connected_db, user_id, function () {
                        return search(is_mobile, null, info, final, res);
                    }, function (user) {
                        return search(is_mobile, user, info, final, res);
                    });
                }
            });
        }
    },
    get_set_nick_name: function (req, res, connected_db, es_client) {
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/login');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/login');
            }, function (user) {
                return set_nick_name(user, res);
            });
        }
    },
    get_single_albaboard: function (req, res, connected_db, es_client) {
        var id = req.params.id;
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.article(connected_db, id, function (nothing) {
                return res.redirect(301, '/error/404');
            }, function (doc) {
                doc.count_view = doc.count_view + 1;
                md_methods.update_count_view(connected_db, "articles", id, doc.count_view, function () {
                    return single_albaboard(is_mobile, null, doc, res);
                }, function () {
                    return single_albaboard(is_mobile, null, doc, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.article(connected_db, id, function (nothing) {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    doc.count_view = doc.count_view + 1;
                    md_methods.update_count_view(connected_db, "articles", id, doc.count_view, function () {
                        return single_albaboard(is_mobile, null, doc, res);
                    }, function () {
                        return single_albaboard(is_mobile, null, doc, res);
                    });
                });
            }, function (user) {
                md_methods.article(connected_db, id, function (nothing) {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    doc.count_view = doc.count_view + 1;
                    md_methods.update_count_view(connected_db, "articles", id, doc.count_view, function () {
                        return single_albaboard(is_mobile, user, doc, res);
                    }, function () {
                        return single_albaboard(is_mobile, user, doc, res);
                    });
                });
            });
        }
    },
    get_single_albareview: function (req, res, connected_db, es_client) {
        var id = req.params.id;
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.article(connected_db, id, function (nothing) {
                return res.redirect(301, '/error/404');
            }, function (doc) {
                doc.count_view = doc.count_view + 1;
                md_methods.update_count_view(connected_db, "articles", id, doc.count_view, function () {
                    return single_albareview(is_mobile, null, doc, res);
                }, function () {
                    return single_albareview(is_mobile, null, doc, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.article(connected_db, id, function (nothing) {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    doc.count_view = doc.count_view + 1;
                    md_methods.update_count_view(connected_db, "articles", id, doc.count_view, function () {
                        return single_albareview(is_mobile, null, doc, res);
                    }, function () {
                        return single_albareview(is_mobile, null, doc, res);
                    });
                });
            }, function (user) {
                md_methods.article(connected_db, id, function (nothing) {
                    return res.redirect(301, '/error/404');
                }, function (doc) {
                    doc.count_view = doc.count_view + 1;
                    md_methods.update_count_view(connected_db, "articles", id, doc.count_view, function () {
                        return single_albareview(is_mobile, user, doc, res);
                    }, function () {
                        return single_albareview(is_mobile, user, doc, res);
                    });
                });
            });
        }
    },
    get_single_ceoboard: function (req, res, connected_db, es_client) {
        var id = req.params.id;
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return res.redirect(301, '/login');
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return res.redirect(301, '/login');
            }, function (user) {
                if (user.is_user === true) {
                    return res.redirect(301, '/login');
                } else {
                    md_methods.article(connected_db, id, function (nothing) {
                        return res.redirect(301, '/error/404');
                    }, function (doc) {
                        doc.count_view = doc.count_view + 1;
                        md_methods.update_count_view(connected_db, "articles", id, doc.count_view, function () {
                            return single_ceoboard(is_mobile, user, doc, res);
                        }, function () {
                            return single_ceoboard(is_mobile, user, doc, res);
                        });
                    });
                }
            });
        }
    },
    get_success_register: function (req, res, connected_db, es_client) {
        return success_register(res);
    },
    get_success_reset_password: function (req, res, connected_db, es_client) {
        return success_reset_password(res);
    },
    get_success_sent_register: function (req, res, connected_db, es_client) {
        return success_sent_register(res);
    },
    get_success_sent_reset_password: function (req, res, connected_db, es_client) {
        return success_sent_reset_password(res);
    },
    get_talented_area: function (req, res, connected_db, es_client) {
        var page = req.query.page;
        if (page === undefined) {
            return res.redirect(301, "/talented/area?page=1");
        }
        try {
            page = parseInt(page);
        } catch (e) {
            return res.redirect(301, "/error/404");
        }

        var skip = (page - 1) * limit.resumes;
        var type = "area";
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        var find = {};
        var info = {};
        info.type = type;
        info.url = "/talented/area";

        try {
            if (req.query.si !== undefined) {
                find.work_place_si = req.query.si;
                info.si = req.query.si;
            }
            if (req.query.goo !== undefined) {
                find.work_place_goo = req.query.goo;
                info.goo = req.query.goo;
            }
            if (req.query.dong !== undefined) {
                find.work_place_dong = req.query.dong;
                info.dong = req.query.dong;
            }
            if (req.query.sex !== undefined) {
                find.sex = req.query.sex;
                info.sex = req.query.sex;
            }
            if (req.query.age_start !== undefined) {
                var age_start = parseInt(req.query.age_start);
                var birth_year_start = (new Date().getFullYear()) - age_start + 1;
                var age_end = parseInt(req.query.age_end);
                var birth_year_end = (new Date().getFullYear()) - age_end + 1;
                find.birth_year = { "$lte": birth_year_start, "$gte": birth_year_end};
                info.age_start = req.query.age_start;
                info.age_end = req.query.age_end;
            }
        } catch (e) {
            return res.redirect(301, "/error/404");
        }

        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            md_methods.resumes(connected_db, find, skip, function (docs) {
                md_methods.resume_count(connected_db, find, function (count) {
                    return talented(is_mobile, null, info, page, docs, count, res);
                });
            });
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                md_methods.resumes(connected_db, find, skip, function (docs) {
                    md_methods.resume_count(connected_db, find, function (count) {
                        return talented(is_mobile, null, info, page, docs, count, res);
                    });
                });
            }, function (user) {
                md_methods.resumes(connected_db, find, skip, function (docs) {
                    md_methods.resume_count(connected_db, find, function (count) {
                        return talented(is_mobile, user, info, page, docs, count, res);
                    });
                });
            });
        }
    },
    get_verify_token: function (req, res, connected_db, es_client) {
        var token = req.params.token;
        var f_cb = function () {return res.redirect(301, '/error/404');};
        var s_cb = function () {return res.redirect(301, '/success/register');};
        md_methods.check_token(connected_db, token, f_cb, function () {
            md_methods.verify(connected_db, token, f_cb, s_cb);
        });
    },
    get_wage_deferred_business_owners: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return wage_deferred_business_owners(is_mobile, null, res);
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return wage_deferred_business_owners(is_mobile, null, res);
            }, function (user) {
                return wage_deferred_business_owners(is_mobile, user, res);
            });
        }
    },
    get_youth_labor_rights_center: function (req, res, connected_db, es_client) {
        var is_mobile = false;
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
        // user_id 가져오기
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return youth_labor_rights_center(is_mobile, null, res);
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return youth_labor_rights_center(is_mobile, null, res);
            }, function (user) {
                return youth_labor_rights_center(is_mobile, user, res);
            });
        }
    },
    post_apply_email: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                md_methods.company(connected_db, id, f_cb, function (doc) {
                    var count = doc.count_email + 1;
                    md_methods.apply_email(connected_db, id, count, s_cb);
                });
            });
        }
    },
    post_apply_online: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var f_cb1 = function () {return res.json({response:false, msg: "not_user"});};
        var f_cb2 = function () {return res.json({response:false, msg: "already_applied"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                if (user.is_user === false) {
                    return f_cb1();
                }
                md_methods.company(connected_db, id, f_cb, function (doc) {
                    md_methods.my_resume(connected_db, user_id, f_cb, f_cb, function (resume) {
                        for (var i = 0; i < doc.applied_resumes.length; i++) {
                            if (doc.applied_resumes[i]._id === resume._id.toString()) {
                                return f_cb2();
                            }
                        }
                        doc.applied_resumes.unshift({
                            _id: resume._id.toString(),
                            name: resume.name,
                            photo: resume.photo,
                            birth_year: resume.birth_year,
                            sex: resume.sex,
                            phone: resume.phone,
                            email: resume.email,
                            address_si: resume.address_si,
                            address_goo: resume.address_goo,
                            address_dong: resume.address_dong,
                            title: resume.title,
                            final_education: resume.final_education,
                            career_months: resume.career_months,
                            is_opened: false,
                            created_at: new Date().valueOf()
                        });
                        return md_methods.update_applied_resumes(connected_db, id, doc.applied_resumes, f_cb, s_cb);
                    });
                });
            });
        }
    },
    post_apply_phone: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                md_methods.company(connected_db, id, f_cb, function (doc) {
                    var count = doc.count_phone + 1;
                    md_methods.apply_phone(connected_db, id, count, s_cb);
                });
            });
        }
    },
    post_create_albaboard: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var f_cb1 = function () {return res.json({response:false, msg: "no_user"});};
        var s_cb = function (id) {
            var path = "/albaboard/" + id;
            return res.json({response:true, path: path});
        };
        if (
            req.body.title === undefined ||
            req.body.content === undefined ||
            req.body.tags === undefined
        ) {
            return f_cb();
        }

        var obj = {};
        var date = new Date().valueOf();
        try {
            obj.type = "albaboard";
            obj.title = decodeURIComponent(req.body.title);
            obj.content = decodeURIComponent(req.body.content);
            obj.tags = JSON.parse(decodeURIComponent(req.body.tags));
            obj.comments = [];
            obj.count_view = 0;
            obj.created_at = date;
            obj.updated_at = date;
        } catch (e) {
            return f_cb();
        }

        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                if (user.is_user === false) {
                    return f_cb1();
                }
                obj.user_id = user_id;
                obj.nick_name = user.nick_name;
                md_methods.insert_article(connected_db, obj, f_cb, function (id) {
                    s_cb(id);
                    obj._id = id;
                    var body = methods.es_albaboard(obj);
                    es_methods.index(es_client, "albaboard", body, function (res) {});
                });
            });
        }
    },
    post_create_albareview: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var f_cb1 = function () {return res.json({response:false, msg: "no_user"});};
        var s_cb = function (id) {
            var path = "/albareview/" + id;
            return res.json({response:true, path: path});
        };
        if (
            req.body.title === undefined ||
            req.body.content === undefined ||
            req.body.tags === undefined
        ) {
            return f_cb();
        }

        var obj = {};
        var date = new Date().valueOf();
        try {
            obj.type = "albareview";
            obj.title = decodeURIComponent(req.body.title);
            obj.content = decodeURIComponent(req.body.content);
            obj.tags = JSON.parse(decodeURIComponent(req.body.tags));
            obj.comments = [];
            obj.count_view = 0;
            obj.created_at = date;
            obj.updated_at = date;
        } catch (e) {
            return f_cb();
        }

        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                if (user.is_user === false) {
                    return f_cb1();
                }
                obj.user_id = user_id;
                obj.nick_name = user.nick_name;
                return md_methods.insert_article(connected_db, obj, f_cb, function (id) {
                    s_cb(id);
                    obj._id = id;
                    var body = methods.es_albareview(obj);
                    es_methods.index(es_client, "albareview", body, function (res) {});
                });
            });
        }
    },
    post_create_ceoboard: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var f_cb1 = function () {return res.json({response:false, msg: "no_company"});};
        var s_cb = function (id) {
            var path = "/ceoboard/" + id;
            return res.json({response:true, path: path});
        };
        if (
            req.body.title === undefined ||
            req.body.content === undefined ||
            req.body.tags === undefined
        ) {
            return f_cb();
        }

        var obj = {};
        var date = new Date().valueOf();
        try {
            obj.type = "ceoboard";
            obj.title = decodeURIComponent(req.body.title);
            obj.content = decodeURIComponent(req.body.content);
            obj.tags = JSON.parse(decodeURIComponent(req.body.tags));
            obj.comments = [];
            obj.count_view = 0;
            obj.created_at = date;
            obj.updated_at = date;
        } catch (e) {
            return f_cb();
        }

        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                if (user.is_user === true) {
                    return f_cb1();
                }
                obj.user_id = user_id;
                obj.nick_name = user.nick_name;
                return md_methods.insert_article(connected_db, obj, f_cb, s_cb);
            });
        }
    },
    post_create_comment: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function (id) {return res.json({response:true, id:id});};
        if (
            req.body.id === undefined ||
            req.body.comment === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var comment = decodeURIComponent(req.body.comment);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                var obj = {};
                obj.id = randomstring.generate();
                obj.user_id = user_id;
                obj.nick_name = user.nick_name;
                obj.comment = comment;
                obj.created_at = new Date().valueOf();
                md_methods.article(connected_db, id, f_cb, function (doc) {
                    doc.comments.push(obj);
                    md_methods.update_comment(connected_db, id, doc.comments, f_cb, function () {
                        return s_cb(obj.id);
                    });
                });
            });
        }
    },
    post_create_event: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function (number) {return res.json({response:true, number:number});};
        if (
            req.body.title === undefined ||
            req.body.number === undefined ||
            req.body.start_year === undefined ||
            req.body.start_month === undefined ||
            req.body.start_day === undefined ||
            req.body.end_year === undefined ||
            req.body.end_month === undefined ||
            req.body.end_day === undefined ||
            req.body.thumbnail_image === undefined ||
            req.body.content_image === undefined
        ) {
            return f_cb();
        }
        var title = decodeURIComponent(req.body.title);
        var number = decodeURIComponent(req.body.number);
        var start_year = decodeURIComponent(req.body.start_year);
        var start_month = decodeURIComponent(req.body.start_month);
        var start_day = decodeURIComponent(req.body.start_day);
        var end_year = decodeURIComponent(req.body.end_year);
        var end_month = decodeURIComponent(req.body.end_month);
        var end_day = decodeURIComponent(req.body.end_day);
        var thumbnail_image = decodeURIComponent(req.body.thumbnail_image);
        var content_image = decodeURIComponent(req.body.content_image);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                if (user.nick_name !== "관리자") {
                    return f_cb();
                }
                var obj = {};
                obj.title = title;
                obj.number = number;
                obj.start_year = start_year;
                obj.start_month = start_month;
                obj.start_day = start_day;
                obj.end_year = end_year;
                obj.end_month = end_month;
                obj.end_day = end_day;
                obj.thumbnail_image = thumbnail_image;
                obj.content_image = content_image;
                obj.applicants = [];
                obj.count_view = 0;
                obj.created_at = new Date().valueOf();
                md_methods.insert_event(connected_db, obj, f_cb, s_cb);
            });
        }
    },
    post_create_event_winners: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.title === undefined ||
            req.body.content === undefined
        ) {
            return f_cb();
        }
        var title = decodeURIComponent(req.body.title);
        var content = decodeURIComponent(req.body.content);

        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                if (user.nick_name !== "관리자") {
                    return f_cb();
                }
                var obj = {};
                obj.title = title;
                obj.content = content;
                obj.count_view = 0;
                obj.created_at = new Date().valueOf();
                md_methods.insert_winner(connected_db, obj, f_cb, s_cb);
            });
        }
    },
    post_deadline_company: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                md_methods.update_deadline(connected_db, id, user_id, f_cb, s_cb);
            });
        }
    },
    post_edit_albaboard: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.id === undefined ||
            req.body.title === undefined ||
            req.body.content === undefined ||
            req.body.tags === undefined
        ) {
            return f_cb();
        }

        var set = { "$set": {} };
        var date = new Date().valueOf();
        try {
            set["$set"].title = decodeURIComponent(req.body.title);
            set["$set"].content = decodeURIComponent(req.body.content);
            set["$set"].tags = JSON.parse(decodeURIComponent(req.body.tags));
            set["$set"].updated_at = date;
        } catch (e) {
            return f_cb();
        }

        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                md_methods.update_article(connected_db, id, user_id, set, f_cb, function () {
                    s_cb();
                    md_methods.article(connected_db, id, function () {}, function (doc) {
                        es_methods.deleteByQuery(es_client, "albaboard", doc._id.toString(), function () {
                            var body = methods.es_albaboard(doc);
                            es_methods.index(es_client, "albaboard", body, function (res) {});
                        });
                    });
                });
            });
        }
    },
    post_edit_albareview: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.id === undefined ||
            req.body.title === undefined ||
            req.body.content === undefined ||
            req.body.tags === undefined
        ) {
            return f_cb();
        }

        var set = { "$set": {} };
        var date = new Date().valueOf();
        try {
            set["$set"].title = decodeURIComponent(req.body.title);
            set["$set"].content = decodeURIComponent(req.body.content);
            set["$set"].tags = JSON.parse(decodeURIComponent(req.body.tags));
            set["$set"].updated_at = date;
        } catch (e) {
            return f_cb();
        }

        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                return md_methods.update_article(connected_db, id, user_id, set, f_cb, function () {
                    s_cb();
                    md_methods.article(connected_db, id, function () {}, function (doc) {
                        es_methods.deleteByQuery(es_client, "albareview", doc._id.toString(), function () {
                            var body = methods.es_albareview(doc);
                            es_methods.index(es_client, "albareview", body, function (res) {});
                        });
                    });
                });
            });
        }
    },
    post_edit_ceoboard: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.id === undefined ||
            req.body.title === undefined ||
            req.body.content === undefined ||
            req.body.tags === undefined
        ) {
            return f_cb();
        }

        var set = { "$set": {} };
        var date = new Date().valueOf();
        try {
            set["$set"].title = decodeURIComponent(req.body.title);
            set["$set"].content = decodeURIComponent(req.body.content);
            set["$set"].tags = JSON.parse(decodeURIComponent(req.body.tags));
            set["$set"].updated_at = date;
        } catch (e) {
            return f_cb();
        }

        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                return md_methods.update_article(connected_db, id, user_id, set, f_cb, s_cb);
            });
        }
    },
    post_edit_company: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "wrong_info"});};
        var f_cb1 = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function (path) {return res.json({response:true, path:path});};
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        }
        if (
            req.body.id === undefined ||
            req.body.title === undefined ||
            req.body.company_name === undefined ||
            req.body.employment_type === undefined ||
            req.body.business_type_big === undefined ||
            req.body.business_type_small === undefined ||
            req.body.the_number_of_recruitment === undefined ||
            req.body.is_express === undefined ||
            req.body.work_period === undefined ||
            req.body.work_start_year === undefined ||
            req.body.work_start_month === undefined ||
            req.body.work_start_day === undefined ||
            req.body.work_end_year === undefined ||
            req.body.work_end_month === undefined ||
            req.body.work_end_day === undefined ||
            req.body.work_days === undefined ||
            req.body.work_start_time === undefined ||
            req.body.work_end_time === undefined ||
            req.body.salary_type === undefined ||
            req.body.salary === undefined ||
            req.body.sex === undefined ||
            req.body.age_start === undefined ||
            req.body.age_end === undefined ||
            req.body.university_student === undefined ||
            req.body.disabled_person === undefined ||
            req.body.foreigner === undefined ||
            req.body.educational_background === undefined ||
            req.body.finish_year === undefined ||
            req.body.finish_month === undefined ||
            req.body.finish_day === undefined ||
            req.body.receipt_methods === undefined ||
            req.body.homepage === undefined ||
            req.body.manager_name === undefined ||
            req.body.email === undefined ||
            req.body.phone === undefined ||
            req.body.fax === undefined ||
            req.body.address_si === undefined ||
            req.body.address_goo === undefined ||
            req.body.address_dong === undefined ||
            req.body.address_detail === undefined ||
            req.body.exposure_area_si === undefined ||
            req.body.exposure_area_goo === undefined ||
            req.body.exposure_area_dong === undefined ||
            req.body.near_subway === undefined ||
            req.body.near_university === undefined
        ) {
            return f_cb();
        }
        var set = {};
        set["$set"] = {};
        var id = decodeURIComponent(req.body.id);
        try {
            set["$set"].title = decodeURIComponent(req.body.title);
            set["$set"].company_name = decodeURIComponent(req.body.company_name);
            set["$set"].employment_type = decodeURIComponent(req.body.employment_type);
            set["$set"].business_type_big = decodeURIComponent(req.body.business_type_big);
            set["$set"].business_type_small = decodeURIComponent(req.body.business_type_small);
            set["$set"].the_number_of_recruitment = parseInt(decodeURIComponent(req.body.the_number_of_recruitment));
            set["$set"].is_express = decodeURIComponent(req.body.is_express) === "true";
            set["$set"].work_period = decodeURIComponent(req.body.work_period);
            set["$set"].work_start_year = parseInt(decodeURIComponent(req.body.work_start_year));
            set["$set"].work_start_month = parseInt(decodeURIComponent(req.body.work_start_month));
            set["$set"].work_start_day = parseInt(decodeURIComponent(req.body.work_start_day));
            set["$set"].work_end_year = parseInt(decodeURIComponent(req.body.work_end_year));
            set["$set"].work_end_month = parseInt(decodeURIComponent(req.body.work_end_month));
            set["$set"].work_end_day = parseInt(decodeURIComponent(req.body.work_end_day));
            set["$set"].work_days = JSON.parse(decodeURIComponent(req.body.work_days));
            set["$set"].work_start_time = decodeURIComponent(req.body.work_start_time);
            set["$set"].work_end_time = decodeURIComponent(req.body.work_end_time);
            set["$set"].salary_type = decodeURIComponent(req.body.salary_type);
            set["$set"].salary = parseInt(decodeURIComponent(req.body.salary));
            set["$set"].sex = decodeURIComponent(req.body.sex);
            set["$set"].age_start = parseInt(decodeURIComponent(req.body.age_start));
            set["$set"].age_end = parseInt(decodeURIComponent(req.body.age_end));
            set["$set"].university_student = decodeURIComponent(req.body.university_student) === "true";
            set["$set"].disabled_person = decodeURIComponent(req.body.disabled_person) === "true";
            set["$set"].foreigner = decodeURIComponent(req.body.foreigner) === "true";
            set["$set"].educational_background = decodeURIComponent(req.body.educational_background);
            set["$set"].finish_year = parseInt(decodeURIComponent(req.body.finish_year));
            set["$set"].finish_month = parseInt(decodeURIComponent(req.body.finish_month));
            set["$set"].finish_day = parseInt(decodeURIComponent(req.body.finish_day));
            set["$set"].receipt_methods = JSON.parse(decodeURIComponent(req.body.receipt_methods));
            set["$set"].homepage = decodeURIComponent(req.body.homepage);
            set["$set"].manager_name = decodeURIComponent(req.body.manager_name);
            set["$set"].email = decodeURIComponent(req.body.email);
            set["$set"].phone = decodeURIComponent(req.body.phone);
            set["$set"].fax = decodeURIComponent(req.body.fax);
            set["$set"].address_si = decodeURIComponent(req.body.address_si);
            set["$set"].address_goo = decodeURIComponent(req.body.address_goo);
            set["$set"].address_dong = decodeURIComponent(req.body.address_dong);
            set["$set"].address_detail = decodeURIComponent(req.body.address_detail);
            set["$set"].exposure_area_si = decodeURIComponent(req.body.exposure_area_si);
            set["$set"].exposure_area_goo = decodeURIComponent(req.body.exposure_area_goo);
            set["$set"].exposure_area_dong = decodeURIComponent(req.body.exposure_area_dong);
            set["$set"].near_subway = decodeURIComponent(req.body.near_subway);
            set["$set"].near_university = decodeURIComponent(req.body.near_university);
        } catch (e) {
            return f_cb();
        }

        var date = new Date().valueOf();
        if (set["$set"].finish_month < 10) {
            set["$set"].finish_date = set["$set"].finish_year + "/0" + set["$set"].finish_month;
        } else {
            set["$set"].finish_date = set["$set"].finish_year + "/" + set["$set"].finish_month;
        }
        if (set["$set"].finish_day < 10) {
            set["$set"].finish_date = set["$set"].finish_date + "/0" + set["$set"].finish_day;
        } else {
            set["$set"].finish_date = set["$set"].finish_date + "/" + set["$set"].finish_day;
        }
        set["$set"].updated_at = date;

        md_methods.check_user_by_user_id(connected_db, user_id, function () {
            return f_cb();
        }, function (user) {
            md_methods.update_company(connected_db, id, user_id, set, f_cb1, function () {
                md_methods.company(connected_db, id, s_cb, function (doc) {
                    es_methods.deleteByQuery(es_client, "companies", doc._id.toString(), function () {
                        var body = methods.es_companies(doc);
                        es_methods.index(es_client, "companies", body, function (res) {
                            return s_cb();
                        });
                    });
                });
            });
        });
    },
    post_forgot_password: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "wrong_info"});};
        var f_cb1 = function () {return res.json({response:false, msg: "email_no_exists"});};
        var f_cb2 = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.member_type === undefined ||
            req.body.email === undefined
        ) {
            return f_cb();
        }
        var is_user = decodeURIComponent(req.body.member_type) === "user";
        var email = decodeURIComponent(req.body.email);
        if (methods.is_email_valid(email) === false) {
            return f_cb();
        }
        var token = randomstring.generate() + randomstring.generate();
        var type = "forgot_password";

        md_methods.check_email(connected_db, type, is_user, email, f_cb2, f_cb1, function () {
            md_methods.update_token(connected_db, is_user, email, token, f_cb2, function () {
                methods.mail(type, email, token, f_cb2, s_cb);
            });
        });
    },
    post_get_article: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function (doc) {return res.json({response:true, doc:doc});};
        if (
            req.body.id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                md_methods.article(connected_db, id, f_cb, function (doc) {
                    if (user_id === doc.user_id) {
                        return s_cb(doc);
                    } else {
                        return f_cb();
                    }
                });
            });
        }
    },
    post_get_company: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function (doc) {return res.json({response:true, doc:doc});};
        if (
            req.body.id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                md_methods.company(connected_db, id, f_cb, function (doc) {
                   if (user_id === doc.user_id) {
                       return s_cb(doc);
                   } else {
                       return f_cb();
                   }
                });
            });
        }
    },
    post_get_my_resume: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function (doc) {return res.json({response:true, doc:doc});};
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                if (user.is_user === false) {
                    return f_cb();
                } else {
                    return md_methods.my_resume(connected_db, user_id, f_cb, function () {
                        return md_methods.insert_resume(connected_db, user, f_cb, function (doc) {
                            s_cb(doc);
                            var body = methods.es_resumes(doc);
                            es_methods.index(es_client, "resumes", body, function (res) {});
                        });
                    },s_cb);
                }
            });
        }
    },
    post_insert_photo: function (req, res, next, connected_db, es_client) {
        var cb = function (path) {
            var result = {
                result:true,
                path: path
            };
            return res.send("<div id='result-inserting-photo'>" + JSON.stringify(result) + "</div>");
        };
        res.setHeader('content-type', 'text/html');
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return cb("");
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return cb("");
            }, function (user) {
                methods.upload_photo(req, res, next, user_id, function (path) {
                    md_methods.update_photo(connected_db, user_id, path, cb);
                });
            });
        }
    },
    post_login: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var f_cb1 = function () {return res.json({response:false, msg: "wrong_info"});};
        var f_cb2 = function () {return res.json({response:false, msg: "not_verified"});};
        var f_cb3 = function () {return res.json({response:false, msg: "no_nick_name"});};

        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.member_type === undefined ||
            req.body.email === undefined ||
            req.body.password === undefined
        ) {
            return f_cb();
        }
        var is_user = decodeURIComponent(req.body.member_type) === "user";
        var email = decodeURIComponent(req.body.email);
        var password = decodeURIComponent(req.body.password);

        md_methods.check_verified(connected_db, is_user, email, f_cb, f_cb1, f_cb2, function () {
            md_methods.check_user_by_pwd(connected_db, is_user, email, password, f_cb, f_cb1, function (user_id, nick_name) {
                res.cookie(cookie_names["user_id"], user_id, {maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true});
                if (nick_name === "") {
                    return f_cb3();
                } else {
                    return s_cb();
                }
            });
        });
    },
    post_logout: function (req, res, connected_db, es_client) {
        res.cookie(cookie_names["user_id"], '', {maxAge : 365 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.json({response:true});
    },
    post_my_profile: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function (doc) {return res.json({response:true, doc:doc});};
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                return s_cb(user);
            });
        }
    },
    post_pay_phone: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var f_cb1 = function () {return res.json({response:false, msg: "no_points"});};
        var s_cb = function (doc) {return res.json({response:true, doc:doc});};
        if (
            req.body.id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                user.points = user.points - 10;
                if (user.points < 0) {
                    return f_cb1();
                }
                md_methods.resume(connected_db, id, f_cb, function (doc) {
                    var is_paid = false;
                    for (var i = 0; i < doc.paid_users.length; i++) {
                        if (doc.paid_users[i] === user_id) {
                            is_paid = true;
                        }
                    }
                    if (is_paid === true){
                        return s_cb();
                    } else {
                        doc.paid_users.push(user_id);
                        md_methods.pay_phone(connected_db, id, doc.paid_users, f_cb, function () {
                            md_methods.set_points(connected_db, user_id, user.points, s_cb, s_cb);
                        });
                    }
                });
            });
        }
    },
    post_register: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "wrong_info"});};
        var f_cb1 = function () {return res.json({response:false, msg: "email_exists"});};
        var f_cb2 = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.member_type === undefined ||
            req.body.email === undefined ||
            req.body.password === undefined
        ) {
            return f_cb();
        }
        var is_user = decodeURIComponent(req.body.member_type) === "user";
        var email = decodeURIComponent(req.body.email);
        var password = decodeURIComponent(req.body.password);
        if (methods.is_email_valid(email) === false || methods.is_password_format_valid(password) !== true) {
            return f_cb();
        }
        var token = randomstring.generate() + randomstring.generate();
        var type = "register";

        md_methods.check_email(connected_db, type, is_user, email, f_cb2, f_cb1, function () {
            password = crypto.createHash('sha256').update(password).digest('base64');
            md_methods.register(connected_db, is_user, email, password, token, f_cb2, function () {
                methods.mail(type, email, token, f_cb2, s_cb);
            });
        });
    },
    post_register_notice: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "wrong_info"});};
        var f_cb1 = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function (path) {return res.json({response:true, path:path});};
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        }
        if (
            req.body.title === undefined ||
            req.body.company_name === undefined ||
            req.body.employment_type === undefined ||
            req.body.business_type_big === undefined ||
            req.body.business_type_small === undefined ||
            req.body.the_number_of_recruitment === undefined ||
            req.body.is_express === undefined ||
            req.body.work_period === undefined ||
            req.body.work_start_year === undefined ||
            req.body.work_start_month === undefined ||
            req.body.work_start_day === undefined ||
            req.body.work_end_year === undefined ||
            req.body.work_end_month === undefined ||
            req.body.work_end_day === undefined ||
            req.body.work_days === undefined ||
            req.body.work_start_time === undefined ||
            req.body.work_end_time === undefined ||
            req.body.salary_type === undefined ||
            req.body.salary === undefined ||
            req.body.sex === undefined ||
            req.body.age_start === undefined ||
            req.body.age_end === undefined ||
            req.body.university_student === undefined ||
            req.body.disabled_person === undefined ||
            req.body.foreigner === undefined ||
            req.body.educational_background === undefined ||
            req.body.finish_year === undefined ||
            req.body.finish_month === undefined ||
            req.body.finish_day === undefined ||
            req.body.receipt_methods === undefined ||
            req.body.homepage === undefined ||
            req.body.manager_name === undefined ||
            req.body.email === undefined ||
            req.body.phone === undefined ||
            req.body.fax === undefined ||
            req.body.address_si === undefined ||
            req.body.address_goo === undefined ||
            req.body.address_dong === undefined ||
            req.body.address_detail === undefined ||
            req.body.exposure_area_si === undefined ||
            req.body.exposure_area_goo === undefined ||
            req.body.exposure_area_dong === undefined ||
            req.body.near_subway === undefined ||
            req.body.near_university === undefined
        ) {
            return f_cb();
        }
        var notice = {};
        try {
            notice.title = decodeURIComponent(req.body.title);
            notice.company_name = decodeURIComponent(req.body.company_name);
            notice.employment_type = decodeURIComponent(req.body.employment_type);
            notice.business_type_big = decodeURIComponent(req.body.business_type_big);
            notice.business_type_small = decodeURIComponent(req.body.business_type_small);
            notice.the_number_of_recruitment = parseInt(decodeURIComponent(req.body.the_number_of_recruitment));
            notice.is_express = decodeURIComponent(req.body.is_express) === "true";
            notice.work_period = decodeURIComponent(req.body.work_period);
            notice.work_start_year = parseInt(decodeURIComponent(req.body.work_start_year));
            notice.work_start_month = parseInt(decodeURIComponent(req.body.work_start_month));
            notice.work_start_day = parseInt(decodeURIComponent(req.body.work_start_day));
            notice.work_end_year = parseInt(decodeURIComponent(req.body.work_end_year));
            notice.work_end_month = parseInt(decodeURIComponent(req.body.work_end_month));
            notice.work_end_day = parseInt(decodeURIComponent(req.body.work_end_day));
            notice.work_days = JSON.parse(decodeURIComponent(req.body.work_days));
            notice.work_start_time = decodeURIComponent(req.body.work_start_time);
            notice.work_end_time = decodeURIComponent(req.body.work_end_time);
            notice.salary_type = decodeURIComponent(req.body.salary_type);
            notice.salary = parseInt(decodeURIComponent(req.body.salary));
            notice.sex = decodeURIComponent(req.body.sex);
            notice.age_start = parseInt(decodeURIComponent(req.body.age_start));
            notice.age_end = parseInt(decodeURIComponent(req.body.age_end));
            notice.university_student = decodeURIComponent(req.body.university_student) === "true";
            notice.disabled_person = decodeURIComponent(req.body.disabled_person) === "true";
            notice.foreigner = decodeURIComponent(req.body.foreigner) === "true";
            notice.educational_background = decodeURIComponent(req.body.educational_background);
            notice.finish_year = parseInt(decodeURIComponent(req.body.finish_year));
            notice.finish_month = parseInt(decodeURIComponent(req.body.finish_month));
            notice.finish_day = parseInt(decodeURIComponent(req.body.finish_day));
            notice.receipt_methods = JSON.parse(decodeURIComponent(req.body.receipt_methods));
            notice.homepage = decodeURIComponent(req.body.homepage);
            notice.manager_name = decodeURIComponent(req.body.manager_name);
            notice.email = decodeURIComponent(req.body.email);
            notice.phone = decodeURIComponent(req.body.phone);
            notice.fax = decodeURIComponent(req.body.fax);
            notice.address_si = decodeURIComponent(req.body.address_si);
            notice.address_goo = decodeURIComponent(req.body.address_goo);
            notice.address_dong = decodeURIComponent(req.body.address_dong);
            notice.address_detail = decodeURIComponent(req.body.address_detail);
            notice.exposure_area_si = decodeURIComponent(req.body.exposure_area_si);
            notice.exposure_area_goo = decodeURIComponent(req.body.exposure_area_goo);
            notice.exposure_area_dong = decodeURIComponent(req.body.exposure_area_dong);
            notice.near_subway = decodeURIComponent(req.body.near_subway);
            notice.near_university = decodeURIComponent(req.body.near_university);
        } catch (e) {
            return f_cb();
        }

        var date = new Date().valueOf();
        notice.count_view = 0;
        notice.count_email = 0;
        notice.count_phone = 0;
        notice.applied_resumes = [];
        notice.opened_resumes = [];
        notice.scrapped_users = [];
        if (notice.finish_month < 10) {
            notice.finish_date = notice.finish_year + "/0" + notice.finish_month;
        } else {
            notice.finish_date = notice.finish_year + "/" + notice.finish_month;
        }
        if (notice.finish_day < 10) {
            notice.finish_date = notice.finish_date + "/0" + notice.finish_day;
        } else {
            notice.finish_date = notice.finish_date + "/" + notice.finish_day;
        }
        notice.is_judged = false;
        notice.created_at = date;
        notice.updated_at = date;

        md_methods.check_user_by_user_id(connected_db, user_id, function () {
            return f_cb();
        }, function (user) {
            notice.user_id = user._id.toString();
            md_methods.insert_company(connected_db, notice, f_cb1, function (id) {
                var path = "/company/" + id;
                notice._id = id;
                var body = methods.es_companies(notice);
                es_methods.index(es_client, "companies", body, function (res) {
                    return s_cb(path);
                });
            });
        });
    },
    post_remove_article: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                md_methods.remove_article(connected_db, id, user_id, f_cb, s_cb);
                es_methods.deleteByQuery(es_client, "albaboard", id, function () {
                    es_methods.deleteByQuery(es_client, "albareview", id, function () {});
                });
            });
        }
    },
    post_remove_comment: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.id === undefined ||
            req.body.comment_id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var comment_id = decodeURIComponent(req.body.comment_id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                md_methods.article(connected_db, id, f_cb, function (doc) {
                    for (var i = 0; i < doc.comments.length; i++) {
                        if (doc.comments[i].id === comment_id) {
                            if (doc.comments[i].user_id === user_id) {
                                doc.comments.splice(i, 1);
                            }
                        }
                    }
                    md_methods.update_comment(connected_db, id, doc.comments, f_cb, s_cb);
                });
            });
        }
    },
    post_remove_company: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                md_methods.remove_company(connected_db, id, user_id, f_cb, s_cb);
                es_methods.deleteByQuery(es_client, "companies", id, function () {});
            });
        }
    },
    post_remove_photo: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.photo === undefined
        ) {
            return f_cb();
        }
        var photo = decodeURIComponent(req.body.photo);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                if ( photo.includes(user_id) ) {
                    var key = photo.replace((config.aws_s3_url + "/"), "");
                    return methods.remove_photo(key, s_cb);
                } else {
                    return f_cb();
                }
            });
        }
    },
    post_reset_password: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "wrong_info"});};
        var f_cb1 = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.token === undefined ||
            req.body.password === undefined
        ) {
            return f_cb();
        }
        var token = decodeURIComponent(req.body.token);
        var password = decodeURIComponent(req.body.password);
        if (methods.is_password_format_valid(password) !== true) {
            return f_cb();
        }
        md_methods.check_token(connected_db, token, f_cb1, function () {
            md_methods.change_password(connected_db, password, token, f_cb1, s_cb);
        });
    },
    post_resume: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function (doc) {return res.json({response:true, doc:doc});};
        if (
            req.body.id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var company_id = decodeURIComponent(req.body.company_id);
        md_methods.company(connected_db, company_id, f_cb, function (doc) {
            for (var i = 0; i < doc.applied_resumes.length; i++) {
                if (doc.applied_resumes[i]._id === id) {
                    doc.applied_resumes[i].is_opened = true;
                }
            }
            var is_opened = false;
            for (var i = 0; i < doc.opened_resumes.length; i++) {
                if (doc.opened_resumes[i] === id) {
                    is_opened = true;
                }
            }
            if (is_opened === false) {
                doc.opened_resumes.push(id);
            }
            var set = { "$set": {} };
            set["$set"].applied_resumes = doc.applied_resumes;
            set["$set"].opened_resumes = doc.opened_resumes;
            md_methods.update_company(connected_db, company_id, doc.user_id, set, f_cb, function () {
                return md_methods.resume(connected_db, id, f_cb, s_cb);
            });
        });
    },
    post_scrap: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var f_cb1 = function () {return res.json({response:false, msg: "already_scrapped"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                md_methods.company(connected_db, id, f_cb, function (doc) {
                    for (var i = 0; i < doc.scrapped_users.length; i++) {
                        if (doc.scrapped_users[i] === user_id) {
                            return f_cb1();
                        }
                    }
                    doc.scrapped_users.push(user_id);
                    md_methods.scrap(connected_db, "companies", id, doc.scrapped_users, f_cb, s_cb);
                });
            });
        }
    },
    post_scrap_toggle_alba: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                md_methods.company(connected_db, id, f_cb, function (doc) {
                    var is_scrapped = false;
                    for (var i = 0; i < doc.scrapped_users.length; i++) {
                        if (doc.scrapped_users[i] === user_id) {
                            is_scrapped = true;
                            doc.scrapped_users.splice(i, 1);
                            break;
                        }
                    }
                    if (is_scrapped === false) {
                        doc.scrapped_users.push(user_id);
                    }
                    md_methods.scrap(connected_db, "companies", id, doc.scrapped_users, f_cb, s_cb);
                });
            });
        }
    },
    post_scrap_toggle_resume: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        if (
            req.body.id === undefined
        ) {
            return f_cb();
        }
        var id = decodeURIComponent(req.body.id);
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        } else {
            md_methods.check_user_by_user_id(connected_db, user_id, function () {
                return f_cb();
            }, function (user) {
                md_methods.resume(connected_db, id, f_cb, function (doc) {
                    var is_scrapped = false;
                    for (var i = 0; i < doc.scrapped_users.length; i++) {
                        if (doc.scrapped_users[i] === user_id) {
                            is_scrapped = true;
                            doc.scrapped_users.splice(i, 1);
                            break;
                        }
                    }
                    if (is_scrapped === false) {
                        doc.scrapped_users.push(user_id);
                    }
                    md_methods.scrap(connected_db, "resumes", id, doc.scrapped_users, f_cb, s_cb);
                });
            });
        }
    },
    post_set_my_resume: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "wrong_info"});};
        var f_cb1 = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function (path) {return res.json({response:true, path:path});};
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        }

        if (
            req.body.name === undefined ||
            req.body.photo === undefined ||
            req.body.sex === undefined ||
            req.body.phone === undefined ||
            req.body.email === undefined ||
            req.body.address_si === undefined ||
            req.body.address_goo === undefined ||
            req.body.address_dong === undefined ||
            req.body.title === undefined ||
            req.body.work_place_si === undefined ||
            req.body.work_place_goo === undefined ||
            req.body.work_place_dong === undefined ||
            req.body.work_types === undefined ||
            req.body.work_period === undefined ||
            req.body.work_days === undefined ||
            req.body.work_start_time === undefined ||
            req.body.work_end_time === undefined ||
            req.body.salary_type === undefined ||
            req.body.salary === undefined ||
            req.body.final_education === undefined ||
            req.body.self_introduction === undefined ||
            req.body.career_months === undefined ||
            req.body.careers === undefined ||
            req.body.language_skills === undefined ||
            req.body.certificates === undefined
        ) {
            return f_cb();
        }

        var set = {};
        set["$set"] = {};

        try {
            set["$set"].name = decodeURIComponent(req.body.name);
            set["$set"].photo = decodeURIComponent(req.body.photo);
            set["$set"].sex = decodeURIComponent(req.body.sex);
            set["$set"].phone = decodeURIComponent(req.body.phone);
            set["$set"].email = decodeURIComponent(req.body.email);
            set["$set"].address_si = decodeURIComponent(req.body.address_si);
            set["$set"].address_goo = decodeURIComponent(req.body.address_goo);
            set["$set"].address_dong = decodeURIComponent(req.body.address_dong);
            set["$set"].title = decodeURIComponent(req.body.title);
            set["$set"].work_place_si = decodeURIComponent(req.body.work_place_si);
            set["$set"].work_place_goo = decodeURIComponent(req.body.work_place_goo);
            set["$set"].work_place_dong = decodeURIComponent(req.body.work_place_dong);
            set["$set"].work_types = JSON.parse(decodeURIComponent(req.body.work_types));
            set["$set"].work_period = decodeURIComponent(req.body.work_period);
            set["$set"].work_days = JSON.parse(decodeURIComponent(req.body.work_days));
            set["$set"].work_start_time = decodeURIComponent(req.body.work_start_time);
            set["$set"].work_end_time = decodeURIComponent(req.body.work_end_time);
            set["$set"].salary_type = decodeURIComponent(req.body.salary_type);
            set["$set"].salary = parseInt(decodeURIComponent(req.body.salary));
            set["$set"].final_education = decodeURIComponent(req.body.final_education);
            set["$set"].self_introduction = decodeURIComponent(req.body.self_introduction);
            set["$set"].career_months = parseInt(decodeURIComponent(req.body.career_months));
            set["$set"].careers = JSON.parse(decodeURIComponent(req.body.careers));
            set["$set"].language_skills = JSON.parse(decodeURIComponent(req.body.language_skills));
            set["$set"].certificates = JSON.parse(decodeURIComponent(req.body.certificates));
        } catch (e) {
            return f_cb();
        }

        var date = new Date().valueOf();
        set["$set"].updated_at = date;

        md_methods.check_user_by_user_id(connected_db, user_id, function () {
            return f_cb();
        }, function (user) {
            md_methods.update_resume(connected_db, user_id, set, f_cb1, function () {
                var set2 = {};
                set2["$set"] = {};
                set2["$set"].user_name = set["$set"].name;
                set2["$set"].sex = set["$set"].sex;
                set2["$set"].phone = set["$set"].phone;
                set2["$set"].address_si = set["$set"].address_si;
                set2["$set"].address_goo = set["$set"].address_goo;
                set2["$set"].address_dong = set["$set"].address_dong;
                md_methods.update_profile(connected_db, user_id, set2, f_cb1, s_cb);
                md_methods.my_resume(connected_db, user_id, function () {}, function () {}, function (doc) {
                    es_methods.deleteByQuery(es_client, "resumes", doc._id.toString(), function () {
                        var body = methods.es_resumes(doc);
                        es_methods.index(es_client, "resumes", body, function (res) {});
                    });
                });
            });
        });
    },
    post_set_nick_name: function (req, res, connected_db, es_client) {
        var f_cb = function () {return res.json({response:false, msg: "wrong_info"});};
        var f_cb1 = function () {return res.json({response:false, msg: "nick_name_exists"});};
        var f_cb2 = function () {return res.json({response:false, msg: "server_error"});};
        var s_cb = function () {return res.json({response:true});};
        var cookies = req.headers.cookie;
        var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;
        if (user_id === null) {
            return f_cb();
        }
        if (
            req.body.is_user === undefined
        ) {
            return f_cb();
        }
        var is_user = decodeURIComponent(req.body.is_user) === "true";

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
            , birth_day
            , set = { "$set": {}};

        if (is_user === true) {
            if (
                req.body.user_name === undefined ||
                req.body.nick_name === undefined ||
                req.body.sex === undefined ||
                req.body.phone === undefined ||
                req.body.address_si === undefined ||
                req.body.address_goo === undefined ||
                req.body.address_dong === undefined ||
                req.body.birth_year === undefined ||
                req.body.birth_month === undefined ||
                req.body.birth_day === undefined
            ) {
                return f_cb();
            }
            user_name = decodeURIComponent(req.body.user_name);
            nick_name = decodeURIComponent(req.body.nick_name);
            sex = decodeURIComponent(req.body.sex);
            if (sex !== "male" && sex !== "female") {
                return f_cb();
            }
            phone = decodeURIComponent(req.body.phone);
            address_si = decodeURIComponent(req.body.address_si);
            address_goo = decodeURIComponent(req.body.address_goo);
            address_dong = decodeURIComponent(req.body.address_dong);
            birth_year = decodeURIComponent(req.body.birth_year);
            birth_month = decodeURIComponent(req.body.birth_month);
            birth_day = decodeURIComponent(req.body.birth_day);
            try {
                birth_year = parseInt(birth_year);
                birth_month = parseInt(birth_month);
                birth_day = parseInt(birth_day);
            } catch (e) {
                return f_cb();
            }
            set["$set"]["user_name"] = user_name;
            set["$set"]["nick_name"] = nick_name;
            set["$set"]["sex"] = sex;
            set["$set"]["phone"] = phone;
            set["$set"]["address_si"] = address_si;
            set["$set"]["address_goo"] = address_goo;
            set["$set"]["address_dong"] = address_dong;
            set["$set"]["birth_year"] = birth_year;
            set["$set"]["birth_month"] = birth_month;
            set["$set"]["birth_day"] = birth_day;

        } else {
            if (
                req.body.company_name === undefined ||
                req.body.nick_name === undefined ||
                req.body.phone === undefined ||
                req.body.business_number === undefined ||
                req.body.address_si === undefined ||
                req.body.address_goo === undefined ||
                req.body.address_dong === undefined ||
                req.body.address_detail === undefined
            ) {
                return f_cb();
            }
            company_name = decodeURIComponent(req.body.company_name);
            nick_name = decodeURIComponent(req.body.nick_name);
            phone = decodeURIComponent(req.body.phone);
            business_number = decodeURIComponent(req.body.business_number);
            address_si = decodeURIComponent(req.body.address_si);
            address_goo = decodeURIComponent(req.body.address_goo);
            address_dong = decodeURIComponent(req.body.address_dong);
            address_detail = decodeURIComponent(req.body.address_detail);

            set["$set"]["company_name"] = company_name;
            set["$set"]["nick_name"] = nick_name;
            set["$set"]["phone"] = phone;
            set["$set"]["business_number"] = business_number;
            set["$set"]["address_si"] = address_si;
            set["$set"]["address_goo"] = address_goo;
            set["$set"]["address_dong"] = address_dong;
            set["$set"]["address_detail"] = address_detail;
        }
        md_methods.check_user_by_user_id(connected_db, user_id, function () {
            return f_cb();
        }, function (user) {
            return md_methods.check_nick_name(connected_db, user_id, nick_name, f_cb2, f_cb1, function () {
                if (is_user === true) {
                    user.user_name = user_name;
                    user.birth_year = birth_year;
                    user.sex = sex;
                    user.phone = phone;
                    user.address_si = address_si;
                    user.address_goo = address_goo;
                    user.address_dong = address_dong;

                    return md_methods.my_resume(connected_db, user_id, f_cb2, function () {
                        return md_methods.insert_resume(connected_db, user, function() {
                            return md_methods.update_profile(connected_db, user_id, set, f_cb2, s_cb);
                        }, function (doc) {
                            md_methods.update_profile(connected_db, user_id, set, f_cb2, s_cb);
                            var body = methods.es_resumes(doc);
                            return es_methods.index(es_client, "resumes", body, function (res) {});
                        });
                    }, function (doc) {
                        var set2 = { "$set": {} };
                        set2["$set"].name = user.user_name;
                        set2["$set"].birth_year = user.birth_year;
                        set2["$set"].sex = user.sex;
                        set2["$set"].phone = user.phone;
                        set2["$set"].address_si = user.address_si;
                        set2["$set"].address_goo = user.address_goo;
                        set2["$set"].address_dong = user.address_dong;
                        return md_methods.update_resume(connected_db, user_id, set2, function () {
                            return md_methods.update_profile(connected_db, user_id, set, f_cb2, s_cb);
                        }, function () {
                            md_methods.update_profile(connected_db, user_id, set, f_cb2, s_cb);
                            md_methods.my_resume(connected_db, user_id, function () {}, function () {}, function (doc) {
                                es_methods.deleteByQuery(es_client, "resumes", doc._id.toString(), function () {
                                    var body = methods.es_resumes(doc);
                                    es_methods.index(es_client, "resumes", body, function (res) {});
                                });
                            });
                        });
                    });
                } else {
                    return md_methods.update_profile(connected_db, user_id, set, f_cb2, s_cb);
                }
            });
        });
    }
};