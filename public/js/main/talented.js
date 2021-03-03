$(document).ready(function() {
    $(".resume-updated-at").each(function (i) {
        var updated_at = $(this).attr("data-updated-at");
        var date = new Date(parseInt(updated_at));
        $(this).html(get_date(date));
    });
    var si = area.si();
    si.unshift("전국");
    options = "";
    for (var i = 0; i < si.length; i++) {
        if (i === 0) {
            options = options + "<option value='" + si[i] + "' selected='selected'>" + si[i] + "</option>";
        } else {
            options = options + "<option value='" + si[i] + "'>" + si[i] + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#si").append(html);

    var goo = area.goo(si[0]);
    options = "";
    for (var i = 0; i < goo.length; i++) {
        if (i === 0) {
            options = options + "<option value='" + goo[i] + "' selected='selected'>" + goo[i] + "</option>";
        } else {
            options = options + "<option value='" + goo[i] + "'>" + goo[i] + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#goo").append(html);

    var dong = area.dong(si[0], goo[0]);
    options = "";
    for (var i = 0; i < dong.length; i++) {
        if (i === 0) {
            options = options + "<option value='" + dong[i] + "' selected='selected'>" + dong[i] + "</option>";
        } else {
            options = options + "<option value='" + dong[i] + "'>" + dong[i] + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#dong").append(html);

    options = "<option value='전체' selected='selected'>전체</option>";
    for (var i = 1; i < 100; i++) {
        options = options + "<option value='" + i + "'>" + i + "</option>";
    }
    html = $.parseHTML(options);
    $("#age-start").append(html);
    html = $.parseHTML(options);
    $("#age-end").append(html);

    var url = window.location.href;
    url = new URL(url);
    var si = url.searchParams.get("si");
    var goo = url.searchParams.get("goo");
    var dong = url.searchParams.get("dong");
    var sex = url.searchParams.get("sex");
    var age_start = url.searchParams.get("age_start");
    var age_end = url.searchParams.get("age_end");

    if (si !== null) {
        $("#si option[value=" + si + "]").attr("selected", "selected");

        var goo_array = area.goo(si);
        if (goo_array[0] !== "전체") {
            goo_array.unshift("전체");
        }
        options = "";
        for (var i = 0; i < goo_array.length; i++) {
            if (goo_array[i] === goo) {
                options = options + "<option value='" + goo_array[i] + "' selected='selected'>" + goo_array[i] + "</option>";
            } else {
                options = options + "<option value='" + goo_array[i] + "'>" + goo_array[i] + "</option>";
            }
        }
        html = $.parseHTML(options);
        $("#goo").empty();
        $("#goo").append(html);

        if (goo !== null) {
            var dong_array = area.dong(si, goo);
            if (dong_array[0] !== "전체") {
                dong_array.unshift("전체");
            }
            options = "";
            for (var i = 0; i < dong_array.length; i++) {
                if (dong_array[i] === dong) {
                    options = options + "<option value='" + dong_array[i] + "' selected='selected'>" + dong_array[i] + "</option>";
                } else {
                    options = options + "<option value='" + dong_array[i] + "'>" + dong_array[i] + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#dong").empty();
            $("#dong").append(html);
        }
    }

    if (sex !== null) {
        $("input:radio[name=sex]").filter("[value=" + sex + "]").prop("checked", true);
    }

    if (age_start !== null) {
        $("#age-start option[value='" + age_start + "']").attr("selected", "selected");
    }
    if (age_end !== null) {
        $("#age-end option[value='" + age_end + "']").attr("selected", "selected");
    }
    /* 지역 시 변경 시, 구와 동 첫번째 선택 */
    $(document).on("change", "#si", function (e) {
        e.preventDefault();
        var si = $("#si option:selected").text();
        var goo = area.goo(si);
        if (goo[0] !== "전체") {
            goo.unshift("전체");
        }
        options = "";
        for (var i = 0; i < goo.length; i++) {
            if (i === 0) {
                options = options + "<option value='" + goo[i] + "' selected='selected'>" + goo[i] + "</option>";
            } else {
                options = options + "<option value='" + goo[i] + "'>" + goo[i] + "</option>";
            }
        }
        html = $.parseHTML(options);
        $("#goo").empty();
        $("#goo").append(html);

        var dong = area.dong(si, goo[0]);
        if (dong[0] !== "전체") {
            dong.unshift("전체");
        }

        options = "";
        for (var i = 0; i < dong.length; i++) {
            if (i === 0) {
                options = options + "<option value='" + dong[i] + "' selected='selected'>" + dong[i] + "</option>";
            } else {
                options = options + "<option value='" + dong[i] + "'>" + dong[i] + "</option>";
            }
        }
        html = $.parseHTML(options);
        $("#dong").empty();
        $("#dong").append(html);
        return false;
    });
    /* 지역 구 변경 시, 동 첫번째 선택 */
    $(document).on("change", "#goo", function (e) {
        e.preventDefault();
        var si = $("#si option:selected").text();
        var goo = $("#goo option:selected").text();
        var dong = area.dong(si, goo);
        if (dong[0] !== "전체") {
            dong.unshift("전체");
        }

        options = "";
        for (var i = 0; i < dong.length; i++) {
            if (i === 0) {
                options = options + "<option value='" + dong[i] + "' selected='selected'>" + dong[i] + "</option>";
            } else {
                options = options + "<option value='" + dong[i] + "'>" + dong[i] + "</option>";
            }
        }
        html = $.parseHTML(options);
        $("#dong").empty();
        $("#dong").append(html);
        return false;
    });
    /* 스크랩 버튼 클릭 이벤트 */
    $(document).on("click", ".resume-scrap", function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("data-id");
        var src = $(e.currentTarget).find("img").attr("src");
        var s_cb = function (result) {
            if ( result['response'] === true ) {
                if (src.includes("/icons/star_empty.png")) {
                    $(e.currentTarget).find("img").attr("src", "https://s3.ap-northeast-2.amazonaws.com/images.365alba.com/icons/star.png");
                } else {
                    $(e.currentTarget).find("img").attr("src", "https://s3.ap-northeast-2.amazonaws.com/images.365alba.com/icons/star_empty.png");
                }
            } else {
                if (result.msg === "server_error") {
                } else {
                }
            }
        };
        var f_cb = function () {
        };
        methods["the_world"]["is_one"]({
            show_animation: true,
            data: {id: encodeURIComponent(id)},
            pathname:"/scrap-toggle-resume",
            s_cb:s_cb,
            f_cb:f_cb
        });
        return false;
    });

    $(document).on('submit', 'form#search', function (e) {
        e.preventDefault();
        var text = $('#search-input').val()
            , pathname;
        pathname = '/search?type=total&query=' + encode_for_url(text);
        window.location = pathname;
        return false;
    });
    $(document).on('click', '#search-submit', function (e) {
        e.preventDefault();
        var text = $('#search-input').val()
            , pathname;
        pathname = '/search?type=total&query=' + encode_for_url(text);
        window.location = pathname;
        return false;
    });

    var submit = function (e) {
        e.preventDefault();
        var si = $("#si option:selected").text();
        var goo = $("#goo option:selected").text();
        var dong = $("#dong option:selected").text();
        var sex = $("input[name='sex']:checked").val();
        var age_start = $("#age-start option:selected").text();
        var age_end = $("#age-end option:selected").text();

        console.log(
            "\nsi: " + si +
            "\ngoo: " + goo +
            "\ndong: " + dong +
            "\nsex: " + sex +
            "\nage_start: " + age_start +
            "\nage_end: " + age_end
        );

        var url = window.location.pathname + "?page=1";
        if (si !== "전국") {
            url = url + "&si=" + si;
            if (goo !== "전체") {
                url = url + "&goo=" + goo;
                if (dong !== "전체") {
                    url = url + "&dong=" + dong;
                }
            }
        }
        if (sex !== "none") {
            url = url + "&sex=" + sex;
        }
        if (age_start !== "전체" && age_end !== "전체") {
            url = url + "&age_start=" + age_start;
            url = url + "&age_end=" + age_end;
        }
        window.location = url;
    };

    $(document).on("submit", "#detail-search-form", function(e) {
        submit(e);
        return false;
    });
    $(document).on("click", "#detail-search-submit", function(e) {
        submit(e);
        return false;
    });
});