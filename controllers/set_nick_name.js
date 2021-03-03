const methods = require("../methods");
const config = require('../env.json')[process.env.NODE_ENV || 'development'];
module.exports = function (user, template) {
    template.render('set_nick_name', {
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
            return "회원정보 변경";
        },
        twitter_site: function () {
            return config["twitter_site"];
        },
        url: function () {
            return config["url"];
        },
        is_user: function () {
            return user.is_user;
        },
        points: function () {
            return user === null ? 0 : user.points;
        }
    });
};