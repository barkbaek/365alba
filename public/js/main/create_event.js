$(document).ready(function() {
    var options = "", html;
    var current_year = new Date().getFullYear();
    var ten_plus_year = current_year + 10;
    for (var i = current_year; i <= ten_plus_year; i++) {
        if (i === current_year) {
            options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
        } else {
            options = options + "<option value='" + i + "'>" + i + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#start-year").append(html);
    html = $.parseHTML(options);
    $("#end-year").append(html);

    options = "";
    for (var i = 1; i <= 12; i++) {
        if ( i === 1) {
            options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
        } else {
            options = options + "<option value='" + i + "'>" + i + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#start-month").append(html);
    html = $.parseHTML(options);
    $("#end-month").append(html);

    options = "";
    for (var i = 1; i <= 31; i++) {
        if ( i === 1) {
            options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
        } else {
            options = options + "<option value='" + i + "'>" + i + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#start-day").append(html);
    html = $.parseHTML(options);
    $("#end-day").append(html);

    var submit = function (e) {
        e.preventDefault();
        var data = {};
        var title = $("#title").val();
        var number = $("#number").val();
        var start_year = $("#start-year option:selected").text();
        var start_month = $("#start-month option:selected").text();
        var start_day = $("#start-day option:selected").text();
        var end_year = $("#end-year option:selected").text();
        var end_month = $("#end-month option:selected").text();
        var end_day = $("#end-day option:selected").text();
        var thumbnail_image = $("#thumbnail-image").val();
        var content_image = $("#content-image").val();

        data.title = title;
        data.number = number;
        data.start_year = start_year;
        data.start_month = start_month;
        data.start_day = start_day;
        data.end_year = end_year;
        data.end_month = end_month;
        data.end_day = end_day;
        data.thumbnail_image = thumbnail_image;
        data.content_image = content_image;

        console.log(
            "title: " + title +
            "\nstart_year: " + start_year +
            "\nstart_month: " + start_month +
            "\nstart_day: " + start_day +
            "\nend_year: " + end_year +
            "\nend_month: " + end_month +
            "\nend_day: " + end_day +
            "\nthumbnail_image: " + thumbnail_image +
            "\ncontent_image: " + content_image
        );

        var s_cb = function (result) {
            if ( result['response'] === true ) {
                window.location = "/events";
            } else {
                if (result.msg === "server_error") {
                    return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                } else {
                    return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                }
            }
        };
        var f_cb = function () {
            return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
        };
        methods["the_world"]["is_one"]({
            show_animation: true,
            data: data,
            pathname:"/create-event",
            s_cb:s_cb,
            f_cb:f_cb
        });
    };
    $(document).on("submit", "#create-event-form", function(e) {
        submit(e);
        return false;
    });
    $(document).on("click", "#create-event-submit", function(e) {
        submit(e);
        return false;
    });
});