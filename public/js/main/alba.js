$(document).ready(function() {
    /* 근무지/공고노출지역 초기화 */
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

    /* 업직종 추가 */
    var type = business_type.big();
    type.unshift("전체");
    options = "";
    for (var i = 0; i < type.length; i++) {
        if (i === 0) {
            options = options + "<option value='" + type[i] + "' selected='selected'>" + type[i] + "</option>";
        } else {
            options = options + "<option value='" + type[i] + "'>" + type[i] + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#business-type-big").append(html);

    type = business_type.small(type[0]);
    type.unshift("전체");
    options = "";
    for (var i = 0; i < type.length; i++) {
        if (i === 0) {
            options = options + "<option value='" + type[i] + "' selected='selected'>" + type[i] + "</option>";
        } else {
            options = options + "<option value='" + type[i] + "'>" + type[i] + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#business-type-small").append(html);

    /* 근무시간 */
    options = "<option value='전체' selected='selected'>전체</option>";
    var value = "";

    for (var i = 0; i <= 24; i++) {
        if ( i === 0) {
            value = "00:30";
            options = options + "<option value='" + value + "'>" + value + "</option>";
        } else if (i === 24) {
            value = "24:00";
            options = options + "<option value='" + value + "'>" + value + "</option>";
        } else {
            if ( i < 10) {
                value = "0" + i + ":00";
                options = options + "<option value='" + value + "'>" + value + "</option>";
                value = "0" + i + ":30";
                options = options + "<option value='" + value + "'>" + value + "</option>";
            } else {
                value = i + ":00";
                options = options + "<option value='" + value + "'>" + value + "</option>";
                value = i + ":30";
                options = options + "<option value='" + value + "'>" + value + "</option>";
            }
        }
    }
    html = $.parseHTML(options);
    $("#work-start-time").append(html);
    html = $.parseHTML(options);
    $("#work-end-time").append(html);

    $(".alba-created-at").each(function (i) {
       var created_at = $(this).attr("created-at");
       var date = new Date(parseInt(created_at));
       $(this).html(get_date(date));
    });

    var url = window.location.href;
    url = new URL(url);
    var si = url.searchParams.get("si");
    var goo = url.searchParams.get("goo");
    var dong = url.searchParams.get("dong");
    var business_type_big = url.searchParams.get("business_type_big");
    var business_type_small = url.searchParams.get("business_type_small");
    var work_period = url.searchParams.get("work_period");
    var work_days = url.searchParams.get("work_days");
    if (work_days !== null) {
        work_days = work_days.split(",");
    }
    var work_start_time = url.searchParams.get("work_start_time");
    var work_end_time = url.searchParams.get("work_end_time");
    var sex = url.searchParams.get("sex");
    var age = url.searchParams.get("age");
    var salary_type = url.searchParams.get("salary_type");
    var salary = url.searchParams.get("salary");
    var employment_type = url.searchParams.get("employment_type");
    var educational_background = url.searchParams.get("educational_background");
    var near_subway = url.searchParams.get("near_subway");
    var near_university = url.searchParams.get("near_university");

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

    if (business_type_big !== null) {
        $("#business-type-big option[value=" + business_type_big + "]").attr("selected", "selected");

        type = business_type.small(business_type_big);
        type.unshift("전체");
        options = "";
        for (var i = 0; i < type.length; i++) {
            if (type[i] === business_type_small) {
                options = options + "<option value='" + type[i] + "' selected='selected'>" + type[i] + "</option>";
            } else {
                options = options + "<option value='" + type[i] + "'>" + type[i] + "</option>";
            }
        }
        html = $.parseHTML(options);
        $("#business-type-small").empty();
        $("#business-type-small").append(html);
    }

    if (work_period !== null) {
        $("input:radio[name=work-period]").filter("[value=" + work_period + "]").prop("checked", true);
    }

    if (work_days !== null) {
        for (var i = 0; i < work_days.length; i++) {
            if (work_days[i] === "일") {
                $("#sun").prop("checked", true);
            } else if (work_days[i] === "월") {
                $("#mon").prop("checked", true);
            } else if (work_days[i] === "화") {
                $("#tue").prop("checked", true);
            } else if (work_days[i] === "수") {
                $("#wed").prop("checked", true);
            } else if (work_days[i] === "목") {
                $("#thu").prop("checked", true);
            } else if (work_days[i] === "금") {
                $("#fri").prop("checked", true);
            } else if (work_days[i] === "토") {
                $("#sat").prop("checked", true);
            }
        }
    }

    if (work_start_time !== null) {
        $("#work-start-time option[value='" + work_start_time + "']").attr("selected", "selected");
    }

    if (work_end_time !== null) {
        $("#work-end-time option[value='" + work_end_time + "']").attr("selected", "selected");
    }

    if (sex !== null) {
        $("input:radio[name=sex]").filter("[value=" + sex + "]").prop("checked", true);
    }

    if (age !== null) {
        $("#age").val(age);
    }

    if (salary_type !== null) {
        $("#salary-type option[value='" + salary_type + "']").attr("selected", "selected");
    }

    if (salary !== null) {
        $("#salary").val(salary);
    }

    if (employment_type !== null) {
        $("input:radio[name=employment-type]").filter("[value=" + employment_type + "]").prop("checked", true);
    }

    if (educational_background !== null) {
        $("#educational-background option[value='" + educational_background + "']").attr("selected", "selected");
    }

    if (near_subway !== null) {
        $("#near-subway").val(near_subway);
    }

    if (near_university !== null) {
        $("#near-university").val(near_university);
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
    /* 업직종 변경시 */
    $(document).on("change", "#business-type-big", function (e) {
        e.preventDefault();
        var type = $("#business-type-big option:selected").text();
        if (type === "기타") {
            type = business_type.small(type);
        } else {
            type = business_type.small(type);
            type.unshift("전체");
        }
        options = "";
        for (var i = 0; i < type.length; i++) {
            if (i === 0) {
                options = options + "<option value='" + type[i] + "' selected='selected'>" + type[i] + "</option>";
            } else {
                options = options + "<option value='" + type[i] + "'>" + type[i] + "</option>";
            }
        }
        html = $.parseHTML(options);
        $("#business-type-small").empty();
        $("#business-type-small").append(html);
        return false;
    });
    /* 스크랩 버튼 클릭 이벤트 */
    $(document).on("click", ".alba-scrap", function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).parent().parent().attr("href").replace("/company/", "");
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
            pathname:"/scrap-toggle-alba",
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
        var business_type_big = $("#business-type-big option:selected").text();
        var business_type_small = $("#business-type-small option:selected").text();
        var work_period = $("input[name='work-period']:checked").val();
        var work_days = [];
        $("input:checkbox[name='work-days']").each(function () {
            if (this.checked) {
                work_days.push(this.value);
            }
        });
        var work_start_time = $("#work-start-time option:selected").text();
        var work_end_time = $("#work-end-time option:selected").text();
        var sex = $("input[name='sex']:checked").val();
        var age = $("#age").val();
        var salary_type = $("#salary-type option:selected").val();
        var salary = $("#salary").val();
        var employment_type = $("input[name='employment-type']:checked").val();
        var educational_background = $("#educational-background option:selected").val();
        var near_subway = $("#near-subway").val();
        var near_university = $("#near-university").val();

        console.log(
            "\nsi: " + si +
            "\ngoo: " + goo +
            "\ndong: " + dong +
            "\nbusiness_type_big: " + business_type_big +
            "\nbusiness_type_small: " + business_type_small +
            "\nwork_period: " + work_period +
            "\nwork_days: "
        );
        console.dir(work_days);
        console.log(
            "\nwork_start_time: " + work_start_time +
            "\nwork_end_time: "  + work_end_time +
            "\nsex: " + sex +
            "\nage: " + age +
            "\nsalary_type: " + salary_type +
            "\nsalary: " + salary +
            "\nemployment_type: " + employment_type +
            "\neducational_background: " + educational_background +
            "\nnear_subway: " + near_subway +
            "\nnear_university: " + near_university
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
        if (business_type_big !== "전체") {
            url = url + "&business_type_big=" + business_type_big;
            if (business_type_small !== "전체") {
                url = url + "&business_type_small=" + business_type_small;
            }
        }
        if (work_period !== "total") {
            url = url + "&work_period=" + work_period;
        }
        if (work_days.length > 0) {
            var text = "";
            for (var i = 0; i < work_days.length; i++) {
                if (i === (work_days.length - 1)) {
                    text = text + work_days[i];
                } else {
                    text = text + work_days[i] + ",";
                }
            }
            url = url + "&work_days=" + text;
        }
        if (
            work_start_time !== "전체" &&
            work_end_time !== "전체"
        ) {
            url = url + "&work_start_time=" + work_start_time;
            url = url + "&work_end_time=" + work_end_time;
        }
        if (sex !== "none") {
            url = url + "&sex=" + sex;
        }
        if (age !== "") {
            url = url + "&age=" + age;
        }
        if (salary !== "") {
            url = url + "&salary_type=" + salary_type;
            url = url + "&salary=" + salary;
        }
        if (employment_type !== "total") {
            url = url + "&employment_type=" + employment_type;
        }
        if (educational_background !== "total") {
            url = url + "&educational_background=" + educational_background;
        }
        if (near_subway !== "") {
            url = url + "&near_subway=" + near_subway;
        }
        if (near_university !== "") {
            url = url + "&near_university=" + near_university;
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