const express = require("express");
const app     = express();
const server = require('http').createServer(app);

const url = require('url');
const port = 3000;

const config = require('./env.json')[process.env.NODE_ENV || 'development'];
const favicon = require('serve-favicon');
const body_parser= require('body-parser');
const cookie_parser = require('cookie-parser');
const exphbs  = require('express-handlebars');
const path    = require("path");
const randomstring = require('randomstring');
const crypto = require('crypto');
const clc = require('cli-color');
const es_methods = require('./es_methods');
const methods = require('./methods');
const rendering = require('./rendering');

const busboy = require('connect-busboy');
const mongodb = require('mongodb').MongoClient;
const mongo_uri = config["mongo_uri"];
const mongo_options = config["mongo_options"];
const striptags = require('striptags');
const html_encode = require('htmlencode').htmlEncode;
const _ = require('underscore');
const cheerio = require('cheerio');
const sanitize_html = require('sanitize-html');
const limit = require('./limit').get_all();
const cookie_names = require('./cookie_names').get_all();

// MongoDB 시작
var connected_db;
mongodb.connect(mongo_uri, mongo_options, function (err, client) {
    if (err) {
        console.log("\nMongoDB connection failed. error - ");
        console.dir(err);
        return false;
    }
    var db = client.db("365alba");
    connected_db = db;
    setTimeout(function () {
        console.log("Mongodb started.");
    }, 1000);
});

// ElasticSearch 시작
const elasticsearch = require('elasticsearch');
const es_client = new elasticsearch.Client({
    hosts: config.es_hosts
});
es_client.ping({
    requestTimeout: Infinity
}, function (error) {
    if (error) {
        console.error('ElasticSearch cluster is down!');
    } else {
        console.log('ElasticSearch cluster is connected well.');
    }
});

// controllers 설정
const test = require('./controllers/test');

// favicon.ico 설정
app.use(favicon(__dirname + '/public/favicon.ico'));

// handlebars 설정
const hbs = exphbs.create({helpers: {}});
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// image, js, css, ckeditor, fonts 설정
app.use('/images',express.static(path.join(__dirname, 'public/images'), {maxage: '31536000000'}));
app.use('/js',express.static(path.join(__dirname, 'public/js'), {maxage: '31536000000'}));
app.use('/css',express.static(path.join(__dirname, 'public/css'), {maxage: '31536000000'}));
app.use('/ckeditor',express.static(path.join(__dirname, 'public/ckeditor'), {maxage: '31536000000'}));
app.use('/fonts',express.static(path.join(__dirname, 'public/fonts'), {maxage: '31536000000'}));
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    // session_options.secure = true; // serve secure cookies
}

// cookie 설정
app.use(cookie_parser());

// URL 초기 진입시
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (/^\/css\/.+/.test(req.url) === false &&
        /^\/js\/.+/.test(req.url) === false &&
        /^\/images\/.+/.test(req.url) === false
    ) {
        res.setHeader('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
    }
    var cookies = req.headers.cookie;
    var user_id = methods.get_cookie(cookies, cookie_names["user_id"]) || null;

    if (!user_id) {
        res.cookie(cookie_names["user_id"], '', {maxAge : 365 * 24 * 60 * 60 * 1000, httpOnly: true});
    }
    next();
});

// home
app.get("/", function (req,res) {
    return rendering.get_home(req, res, connected_db, es_client);
});

// register
app.get("/register", function (req, res) {
    return rendering.get_register(req, res, connected_db, es_client);
});
app.post("/register", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_register(req, res, connected_db, es_client);
});
app.get("/success/sent-register", function (req, res) {
    return rendering.get_success_sent_register(req, res, connected_db, es_client);
});
app.get("/verify/:token", function (req, res) {
    return rendering.get_verify_token(req, res, connected_db, es_client);
});
app.get("/success/register", function (req, res) {
    return rendering.get_success_register(req, res, connected_db, es_client);
});

// forgot-password
app.get("/forgot-password", function (req, res) {
    return rendering.get_forgot_password(req, res, connected_db, es_client);
});
app.post("/forgot-password", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_forgot_password(req, res, connected_db, es_client);
});
app.get("/success/sent-reset-password", function (req, res) {
    return rendering.get_success_sent_reset_password(req, res, connected_db, es_client);
});
app.get("/reset-password/:token", function (req, res) {
    return rendering.get_reset_password(req, res, connected_db, es_client);
});
app.post("/reset-password", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_reset_password(req, res, connected_db, es_client);
});
app.get("/success/reset-password", function (req, res) {
    return rendering.get_success_reset_password(req, res, connected_db, es_client);
});

// login
app.get("/login", function (req, res) {
    return rendering.get_login(req, res, connected_db, es_client);
});
app.post("/login", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_login(req, res, connected_db, es_client);
});

// logout
app.get("/logout", body_parser.urlencoded({ extended: true }), body_parser.json(), function(req, res){
    return rendering.get_logout(req, res, connected_db, es_client);
});
app.post("/logout", body_parser.urlencoded({ extended: true }), body_parser.json(), function(req, res){
    return rendering.post_logout(req, res, connected_db, es_client);
});

// set nick-name
app.get("/set/nick-name", function (req, res) {
    return rendering.get_set_nick_name(req, res, connected_db, es_client);
});
app.post("/set/nick-name", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_set_nick_name(req, res, connected_db, es_client);
});

// private service
// 내이력서
app.get("/my-resume", function (req, res) {
    return rendering.get_my_resume(req, res, connected_db, es_client);
});
app.post("/get-my-resume", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_get_my_resume(req, res, connected_db, es_client);
});
app.post("/insert/photo", busboy({limit: {fileSize:1024 * 1024 * 5}}), function (req,res,next) {
    return rendering.post_insert_photo(req, res, next, connected_db, es_client);
});
app.post("/remove/photo", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_remove_photo(req, res, connected_db, es_client);
});
app.post("/set-my-resume", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_set_my_resume(req, res, connected_db, es_client);
});
// 지원현황
app.get("/application-status", function (req, res) {
    return rendering.get_application_status(req, res, connected_db, es_client);
});
// 이력서열람기업
app.get("/resume-reading-companies", function (req, res) {
    return rendering.get_resume_reading_companies(req, res, connected_db, es_client);
});
// 스크랩알바
app.get("/scrap-alba", function (req, res) {
    return rendering.get_scrap_alba(req, res, connected_db, es_client);
});
// 내가쓴글관리
app.get("/manage-my-articles", function (req, res) {
    return rendering.get_manage_my_articles(req, res, connected_db, es_client);
});
// 유료이용내역
app.get("/charge-use-details", function (req, res) {
    return rendering.get_charge_use_details(req, res, connected_db, es_client);
});
// 회원정보
app.get("/member-information", function (req, res) {
    return rendering.get_member_information(req, res, connected_db, es_client);
});
app.post("/my-profile", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_my_profile(req, res, connected_db, es_client);
});

// company service
// 공고등록
app.get("/register-notice", function (req, res) {
    return rendering.get_register_notice(req, res, connected_db, es_client);
});
app.post("/register-notice", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_register_notice(req, res, connected_db, es_client);
});
// 공고·지원자관리
app.get("/manage-notices", function (req, res) {
    return rendering.get_manage_notices(req, res, connected_db, es_client);
});
// 지원자관리
app.get("/applicants/:id", function (req, res) {
    return rendering.get_applicants(req, res, connected_db, es_client);
});
app.post("/resume", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_resume(req, res, connected_db, es_client);
});
// 유료상품
app.get("/charged-products", function (req, res) {
    return rendering.get_charged_products(req, res, connected_db, es_client);
});

// 공고
app.get("/company/:id", function (req, res) {
    return rendering.get_company(req, res, connected_db, es_client);
});
// 온라인지원
app.post("/apply-online", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_apply_online(req, res, connected_db, es_client);
});
// 이메일지원
app.post("/apply-email", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_apply_email(req, res, connected_db, es_client);
});
// 전화문지지원
app.post("/apply-phone", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_apply_phone(req, res, connected_db, es_client);
});
// 스크랩
app.post("/scrap", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_scrap(req, res, connected_db, es_client);
});
// 알바 스크랩 토글
app.post("/scrap-toggle-alba", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_scrap_toggle_alba(req, res, connected_db, es_client);
});
// 인재 스크랩 토글
app.post("/scrap-toggle-resume", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_scrap_toggle_resume(req, res, connected_db, es_client);
});
// 공고 수정
app.get("/edit-company/:id", function (req, res) {
    return rendering.get_edit_company(req, res, connected_db, es_client);
});
app.post("/get-company", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_get_company(req, res, connected_db, es_client);
});
app.post("/edit-company", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_edit_company(req, res, connected_db, es_client);
});
// 마감하기
app.post("/deadline-company", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_deadline_company(req, res, connected_db, es_client);
});
// 공고 삭제
app.post("/remove-company", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_remove_company(req, res, connected_db, es_client);
});

// 오늘의알바
app.get("/alba/today", function (req, res) {
    return rendering.get_alba_today(req, res, connected_db, es_client);
});
// 급구알바
app.get("/alba/express", function (req, res) {
    return rendering.get_alba_express(req, res, connected_db, es_client);
});
// 지역별알바
app.get("/alba/area", function (req, res) {
    return rendering.get_alba_area(req, res, connected_db, es_client);
});
// 업직종알바
app.get("/alba/business-type", function (req, res) {
    return rendering.get_alba_business_type(req, res, connected_db, es_client);
});
// 일용직알바
app.get("/alba/day", function (req, res) {
    return rendering.get_alba_day(req, res, connected_db, es_client);
});
// 청소년알바
app.get("/alba/teenagers", function (req, res) {
    return rendering.get_alba_teenagers(req, res, connected_db, es_client);
});
// 대학생알바
app.get("/alba/university-students", function (req, res) {
    return rendering.get_alba_university_students(req, res, connected_db, es_client);
});
// 중장년알바
app.get("/alba/middle-aged-men", function (req, res) {
    return rendering.get_alba_middle_aged_men(req, res, connected_db, es_client);
});
// 외국인알바
app.get("/alba/foreigners", function (req, res) {
    return rendering.get_alba_foreigners(req, res, connected_db, es_client);
});

// 지역별인재
app.get("/talented/area", function (req, res) {
    return rendering.get_talented_area(req, res, connected_db, es_client);
});
// 인재정보
app.get("/resume/:id", function (req, res) {
    return rendering.get_resume(req, res, connected_db, es_client);
});
// 핸드폰 확인하기
app.post("/pay-phone", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_pay_phone(req, res, connected_db, es_client);
});

// 최저임금
app.get("/minimum-wages", function (req, res) {
    return rendering.get_minimum_wages(req, res, connected_db, es_client);
});
// 4대사회보험
app.get("/four-major-social-insurance", function (req, res) {
    return rendering.get_four_major_social_insurance(req, res, connected_db, es_client);
});
// 청소년근로권익센터
app.get("/youth-labor-rights-center", function (req, res) {
    return rendering.get_youth_labor_rights_center(req, res, connected_db, es_client);
});
// 취업사기예방
app.get("/prevent-employment-fraud", function (req, res) {
    return rendering.get_prevent_employment_fraud(req, res, connected_db, es_client);
});
// 임금체불사업주
app.get("/wage-deferred-business-owners", function (req, res) {
    return rendering.get_wage_deferred_business_owners(req, res, connected_db, es_client);
});

// 알바톡톡 등록
app.get("/create-albaboard", function (req, res) {
    return rendering.get_create_albaboard(req, res, connected_db, es_client);
});
app.post("/create-albaboard", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_create_albaboard(req, res, connected_db, es_client);
});
// 알바톡톡
app.get("/albaboard", function (req, res) {
    return rendering.get_albaboard(req, res, connected_db, es_client);
});
app.get("/albaboard/:id", function (req, res) {
    return rendering.get_single_albaboard(req, res, connected_db, es_client);
});
// 알바톡톡 수정
app.get("/edit-albaboard/:id", function (req, res) {
    return rendering.get_edit_albaboard(req, res, connected_db, es_client);
});
app.post("/edit-albaboard", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_edit_albaboard(req, res, connected_db, es_client);
});
app.post("/get-article", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_get_article(req, res, connected_db, es_client);
});
// 사장님게시판 등록
app.get("/create-ceoboard", function (req, res) {
    return rendering.get_create_ceoboard(req, res, connected_db, es_client);
});
app.post("/create-ceoboard", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_create_ceoboard(req, res, connected_db, es_client);
});
// 사장님게시판
app.get("/ceoboard", function (req, res) {
    return rendering.get_ceoboard(req, res, connected_db, es_client);
});
app.get("/ceoboard/:id", function (req, res) {
    return rendering.get_single_ceoboard(req, res, connected_db, es_client);
});
// 사장님게시판 수정
app.get("/edit-ceoboard/:id", function (req, res) {
    return rendering.get_edit_ceoboard(req, res, connected_db, es_client);
});
app.post("/edit-ceoboard", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_edit_ceoboard(req, res, connected_db, es_client);
});
// 알바후기 등록
app.get("/create-albareview", function (req, res) {
    return rendering.get_create_albareview(req, res, connected_db, es_client);
});
app.post("/create-albareview", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_create_albareview(req, res, connected_db, es_client);
});
// 알바후기
app.get("/albareview", function (req, res) {
    return rendering.get_albareview(req, res, connected_db, es_client);
});
app.get("/albareview/:id", function (req, res) {
    return rendering.get_single_albareview(req, res, connected_db, es_client);
});
// 알바후기 수정
app.get("/edit-albareview/:id", function (req, res) {
    return rendering.get_edit_albareview(req, res, connected_db, es_client);
});
app.post("/edit-albareview", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_edit_albareview(req, res, connected_db, es_client);
});
// 댓글등록
app.post("/create-comment", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_create_comment(req, res, connected_db, es_client);
});
// 댓글삭제
app.post("/remove-comment", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_remove_comment(req, res, connected_db, es_client);
});
// 게시물 삭제
app.post("/remove-article", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_remove_article(req, res, connected_db, es_client);
});
// 이벤트 생성
app.get("/create-event", function (req, res) {
    return rendering.get_create_event(req, res, connected_db, es_client);
});
app.post("/create-event", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_create_event(req, res, connected_db, es_client);
});
// 이벤트 목록
app.get("/events", function (req, res) {
    return rendering.get_events(req, res, connected_db, es_client);
});
// 이벤트
app.get("/event/:number", function (req, res) {
    return rendering.get_event(req, res, connected_db, es_client);
});
// 당첨자발표 생성
app.get("/create-event-winners", function (req, res) {
    return rendering.get_create_event_winners(req, res, connected_db, es_client);
});
app.post("/create-event-winners", body_parser.urlencoded({ extended: true }), body_parser.json(), function (req, res) {
    return rendering.post_create_event_winners(req, res, connected_db, es_client);
});
// 당첨자발표 목록
app.get("/event-winners", function (req, res) {
    return rendering.get_event_winners(req, res, connected_db, es_client);
});
// 당첨자발표
app.get("/event-winner/:id", function (req, res) {
    return rendering.get_event_winner(req, res, connected_db, es_client);
});
// 검색
app.get("/search", function (req, res) {
    return rendering.get_search(req, res, connected_db, es_client);
});
// error
app.get("/error/404", function (req, res) {
    return rendering.get_error_404(req, res, connected_db, es_client);
});

// test
app.get("/test", function (req,res) {
    var is_mobile = false;
    if (app.get['env'] === 'production') {
        if (req && req.headers && req.headers['cloudfront-is-mobile-viewer'] === 'true') {
            is_mobile = true;
        }
    } else {
        if (req && req.headers && req.headers['user-agent']) {
            is_mobile = methods.is_mobile(req.headers['user-agent']);
        }
    }
    return test(is_mobile, res);
});

// test elasticsearch
// /es_index?index=companies&title=설빙
// http://localhost:3000/es_index?index=companies&title=%EC%84%A4%EB%B9%99%20%EC%95%84%EB%A5%B4%EB%B0%94%EC%9D%B4%ED%8A%B8%20%ED%8F%89%EC%9D%BC%20%EA%B8%89%EA%B5%AC
app.get("/es_index", function (req,res) {
    var index = req.query.index;
    var title =  req.query.title;
    var article_id = new Date().getTime();
    var body = {
        article_id : article_id,
        title : title,
        company_name : "설빙 노원점",
        employment_type : "alba",
        salary : 10000,
        salary_type : "hour",
        finish_date : "2020/02/10",
        address : "서울특별시 노원구 월계동 강남아파트 105동 501호",
        near_subway : "노원역",
        near_university : "광운대학교",
        logo : "http://logo.com/3",
        created_at : 1581400293446,
        updated_at : 1581400293446
    };
    es_methods.index(es_client, index, body, function (res) {console.dir(res);});
});

// http://localhost:3000/es_search?index=companies&from=0&size=3&query=%EC%83%81%EA%B0%88%EC%97%AD
app.get("/es_search", function (req,res) {
    var index = req.query.index;
    var obj = {};
    obj.from = req.query.from;
    obj.size = req.query.size;
    obj.query = req.query.query;
    es_methods.search(es_client, index, obj, function (final) {
        console.log("final: ");
        console.dir(final);
    });
});

// http://localhost:3000/es_search_all?from=0&size=3&query=%EC%84%A4%EB%B9%99
app.get("/es_search_all", function (req,res) {
    var obj = {};
    obj.from = req.query.from;
    obj.size = req.query.size;
    obj.query = req.query.query;
    es_methods.search_all(es_client, obj, function (final) {
        console.log("final:");
        console.dir(final);
    });
});

app.get("/es_delete_by_query", function (req,res) {
    // http://localhost:3000/es_delete_by_query?index=companies&article_id=1
    var index = req.query.index;
    var article_id = req.query.article_id;
    es_methods.deleteByQuery(es_client, index, article_id, function () {});
});

// test mongodb
app.get("/m_insert", function (req,res) {
    connected_db.collection('test').insertOne({name: 1}, function (err, res) {
        if (err === null) {
            console.log("/m_insert success");
            connected_db.collection('test').insertOne({name: 1}, function (err, res) {
                if (err === null) {
                    console.log("/m_insert success");
                    connected_db.collection('test').insertOne({name: 2}, function (err, res) {
                        if (err === null) {
                            console.log("/m_insert success");
                        } else {
                            console.log("/m_insert fail");
                        }
                    });
                } else {
                    console.log("/m_insert fail");
                }
            });
        } else {
            console.log("/m_insert fail");
        }
    });
});

app.get("/m_search", function (req,res) {
    connected_db.collection("test").findOne({name:2}, function (err, doc) {
        if (err) {
            console.log("/m_search fail");
        } else {
            if (doc === null) {
                console.log("/m_search document emtpy");
            } else {
                console.log("/m_search success");
                console.dir(doc);
                console.log(doc._id.toString());
            }
        }
    });
});

app.get("/m_remove", function (req,res) {
    connected_db.collection("test").remove({ name: 1 }, function(err, res) {
        if (err === null) {
            console.log("/m_remove success");
        } else {
            console.log("/m_remove fail");
        }
    });
});

app.get("/mail", function (req,res) {
    methods.mail("register", "barkbaek@daum.net", "", function () {}, function () {});
});

app.post("/insert/logo", busboy({limit: {fileSize:1024 * 1024 * 5}}), function (req,res,next) {
    var cb = function (path) {
        var result = {
            result:true,
            path: path
        };
        return res.send("<div id='result-inserting-logo'>" + JSON.stringify(result) + "</div>");
    };
    res.setHeader('content-type', 'text/html');
    methods.upload_logo(req, res, next, cb);
});

app.get("/remove/logo", function (req, res) {
    methods.remove_photo("upload/images/20200215/1/square/1581745498290-Hw1GIVbBQFYPxQDBpk7QaVF0YrMrwuqT-640-640.jpeg", function () {
        return res.send("completed");
    });
});



app.get('*', function(req, res){
    return res.redirect(301, '/error/404');
});

server.listen(port, function () {console.log('Listening on ' + server.address().port);});
console.log(clc.green.bold("\n\n\n****************************************************************************************"));
console.log(clc.green.bold("**************** [Gleant] Work Work Work! [" + methods.to_i18n_utc_fixed_datetime({lang: "ko", datetime: new Date()}) + "] ****************"));
console.log(clc.green.bold("****************************************************************************************"));