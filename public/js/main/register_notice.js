$(document).ready(function() {
    /* 업직종 추가 */
    var type = business_type.big();
    var options = "";
    for (var i = 0; i < type.length; i++) {
        if (i === 0) {
            options = options + "<option value='" + type[i] + "' selected='selected'>" + type[i] + "</option>";
        } else {
            options = options + "<option value='" + type[i] + "'>" + type[i] + "</option>";
        }
    }
    var html = $.parseHTML(options);
    $("#business-type-big").append(html);

    type = business_type.small(type[0]);
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


    /* 근무시작일/근무마감일/모집종료일 */
    options = "";
    var current_year = new Date().getFullYear();
    var over_year = new Date().getFullYear() + 5;
    for (var i = current_year; i <= over_year; i++) {
        if (i === current_year) {
            options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
        } else {
            options = options + "<option value='" + i + "'>" + i + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#work-start-year").append(html);
    html = $.parseHTML(options);
    $("#work-end-year").append(html);
    html = $.parseHTML(options);
    $("#finish-year").append(html);

    options = "";
    for (var i = 1; i <= 12; i++) {
        if ( i === 12) {
            options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
        } else {
            options = options + "<option value='" + i + "'>" + i + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#work-start-month").append(html);
    html = $.parseHTML(options);
    $("#work-end-month").append(html);
    html = $.parseHTML(options);
    $("#finish-month").append(html);

    options = "";
    for (var i = 1; i <= 31; i++) {
        if ( i === 31) {
            options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
        } else {
            options = options + "<option value='" + i + "'>" + i + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#work-start-day").append(html);
    html = $.parseHTML(options);
    $("#work-end-day").append(html);
    html = $.parseHTML(options);
    $("#finish-day").append(html);

    /* 근무시간 */
    options = "";
    var value = "";
    for (var i = 0; i <= 24; i++) {
        if ( i === 0) {
            value = "00:30";
            options = options + "<option value='" + value + "' selected='selected'>" + value + "</option>";
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

    /* 연령 */
    options = "";
    for (var i = 1; i <= 130; i++) {
        if ( i === 20) {
            options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
        } else {
            options = options + "<option value='" + i + "'>" + i + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#age-start").append(html);
    html = $.parseHTML(options);
    $("#age-end").append(html);

    /* 근무지/공고노출지역 초기화 */
    var si = area.si();
    options = "";
    for (var i = 0; i < si.length; i++) {
        if (i === 0) {
            options = options + "<option value='" + si[i] + "' selected='selected'>" + si[i] + "</option>";
        } else {
            options = options + "<option value='" + si[i] + "'>" + si[i] + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#address-si").append(html);

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
    $("#address-goo").append(html);

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
    $("#address-dong").append(html);

    si = area.si();
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
    $("#exposure-area-si").append(html);

    goo = area.goo(si[0]);
    options = "";
    for (var i = 0; i < goo.length; i++) {
        if (i === 0) {
            options = options + "<option value='" + goo[i] + "' selected='selected'>" + goo[i] + "</option>";
        } else {
            options = options + "<option value='" + goo[i] + "'>" + goo[i] + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#exposure-area-goo").append(html);

    dong = area.dong(si[0], goo[0]);
    options = "";
    for (var i = 0; i < dong.length; i++) {
        if (i === 0) {
            options = options + "<option value='" + dong[i] + "' selected='selected'>" + dong[i] + "</option>";
        } else {
            options = options + "<option value='" + dong[i] + "'>" + dong[i] + "</option>";
        }
    }
    html = $.parseHTML(options);
    $("#exposure-area-dong").append(html);

    /* 근무지 시 변경 시, 구와 동 첫번째 선택 */
    $(document).on("change", "#address-si", function (e) {
        e.preventDefault();
        var si = $("#address-si option:selected").text();
        var goo = area.goo(si);

        options = "";
        for (var i = 0; i < goo.length; i++) {
            if (i === 0) {
                options = options + "<option value='" + goo[i] + "' selected='selected'>" + goo[i] + "</option>";
            } else {
                options = options + "<option value='" + goo[i] + "'>" + goo[i] + "</option>";
            }
        }
        html = $.parseHTML(options);
        $("#address-goo").empty();
        $("#address-goo").append(html);

        var dong = area.dong(si, goo[0]);

        options = "";
        for (var i = 0; i < dong.length; i++) {
            if (i === 0) {
                options = options + "<option value='" + dong[i] + "' selected='selected'>" + dong[i] + "</option>";
            } else {
                options = options + "<option value='" + dong[i] + "'>" + dong[i] + "</option>";
            }
        }
        html = $.parseHTML(options);
        $("#address-dong").empty();
        $("#address-dong").append(html);
        return false;
    });
    /* 근무지 구 변경 시, 동 첫번째 선택 */
    $(document).on("change", "#address-goo", function (e) {
        e.preventDefault();
        var si = $("#address-si option:selected").text();
        var goo = $("#address-goo option:selected").text();
        var dong = area.dong(si, goo);

        options = "";
        for (var i = 0; i < dong.length; i++) {
            if (i === 0) {
                options = options + "<option value='" + dong[i] + "' selected='selected'>" + dong[i] + "</option>";
            } else {
                options = options + "<option value='" + dong[i] + "'>" + dong[i] + "</option>";
            }
        }
        html = $.parseHTML(options);
        $("#address-dong").empty();
        $("#address-dong").append(html);
        return false;
    });

    /* 공고노출지역 시 변경 시, 구와 동 첫번째 선택 */
    $(document).on("change", "#exposure-area-si", function (e) {
        e.preventDefault();
        var si = $("#exposure-area-si option:selected").text();
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
        $("#exposure-area-goo").empty();
        $("#exposure-area-goo").append(html);

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
        $("#exposure-area-dong").empty();
        $("#exposure-area-dong").append(html);
        return false;
    });
    /* 공고노출지역 구 변경 시, 동 첫번째 선택 */
    $(document).on("change", "#exposure-area-goo", function (e) {
        e.preventDefault();
        var si = $("#exposure-area-si option:selected").text();
        var goo = $("#exposure-area-goo option:selected").text();
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
        $("#exposure-area-dong").empty();
        $("#exposure-area-dong").append(html);
        return false;
    });
    /* 업직종 변경시 */
    $(document).on("change", "#business-type-big", function (e) {
        e.preventDefault();
        var type = $("#business-type-big option:selected").text();
        type = business_type.small(type);

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
    /* 지도업데이트 클릭 시 */
    $(document).on("click", "#update-map", function (e) {
        e.preventDefault();
        var si = $("#address-si option:selected").text();
        var goo = $("#address-goo option:selected").text();
        var dong = $("#address-dong option:selected").text();
        var detail = $("#address-detail").val();
        var text = si + " " + goo + " " + dong + " " + detail;
        geocoder.addressSearch(text, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                var infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">근무지</div>'
                });
                infowindow.open(map, marker);
                map.setCenter(coords);
            }
        });
        return false;
    });

    var submit = function (e) {
        e.preventDefault();
        var data = {};
        var title = $("#title").val();
        var company_name = $("#company-name").val();
        var employment_type = $("input[name='employment-type']:checked").val();
        var business_type_big = $("#business-type-big option:selected").text();
        var business_type_small = $("#business-type-small option:selected").text();
        var the_number_of_recruitment = $("#the-number-of-recruitment").val();
        var is_express = true;
        $("input:checkbox[name='is_express']").each(function () {
            is_express = this.checked;
        });

        var work_period = $("input[name='work-period']:checked").val();
        var work_start_year = $("#work-start-year option:selected").text();
        var work_start_month = $("#work-start-month option:selected").text();
        var work_start_day = $("#work-start-day option:selected").text();
        var work_end_year = $("#work-end-year option:selected").text();
        var work_end_month = $("#work-end-month option:selected").text();
        var work_end_day = $("#work-end-day option:selected").text();

        var work_days = [];
        $("input:checkbox[name='work-days']").each(function () {
            if (this.checked) {
                work_days.push(this.value);
            }
        });

        var work_start_time = $("#work-start-time option:selected").text();
        var work_end_time = $("#work-end-time option:selected").text();
        var salary_type = $("#salary-type option:selected").val();
        var salary = $("#salary").val();

        var sex = $("input[name='sex']:checked").val();
        var age_start = $("#age-start option:selected").text();
        var age_end = $("#age-end option:selected").text();
        var university_student = true;
        $("input:checkbox[name='university-student']").each(function () {
            university_student = this.checked;
        });
        var disabled_person = true;
        $("input:checkbox[name='disabled-person']").each(function () {
            disabled_person = this.checked;
        });
        var foreigner = true;
        $("input:checkbox[name='foreigner']").each(function () {
            foreigner = this.checked;
        });
        var educational_background = $("#educational-background option:selected").val();

        data.title = encodeURIComponent(title);
        data.company_name = encodeURIComponent(company_name);
        data.employment_type = encodeURIComponent(employment_type);
        data.business_type_big = encodeURIComponent(business_type_big);
        data.business_type_small = encodeURIComponent(business_type_small);
        data.the_number_of_recruitment = encodeURIComponent(the_number_of_recruitment);
        data.is_express = encodeURIComponent(is_express);
        data.work_period = encodeURIComponent(work_period);
        data.work_start_year = encodeURIComponent(work_start_year);
        data.work_start_month = encodeURIComponent(work_start_month);
        data.work_start_day = encodeURIComponent(work_start_day);
        data.work_end_year = encodeURIComponent(work_end_year);
        data.work_end_month = encodeURIComponent(work_end_month);
        data.work_end_day = encodeURIComponent(work_end_day);
        data.work_days = encodeURIComponent(JSON.stringify(work_days));
        data.work_start_time = encodeURIComponent(work_start_time);
        data.work_end_time = encodeURIComponent(work_end_time);
        data.salary_type = encodeURIComponent(salary_type);
        data.salary = encodeURIComponent(salary);
        data.sex = encodeURIComponent(sex);
        data.age_start = encodeURIComponent(age_start);
        data.age_end = encodeURIComponent(age_end);
        data.university_student = encodeURIComponent(university_student);
        data.disabled_person = encodeURIComponent(disabled_person);
        data.foreigner = encodeURIComponent(foreigner);
        data.educational_background = encodeURIComponent(educational_background);

        console.log(
            "title: " + title +
            "\ncompany_name: " + company_name +
            "\nemployment_type: " + employment_type +
            "\nbusiness_type_big: " + business_type_big +
            "\nbusiness_type_small: " + business_type_small +
            "\nthe_number_of_recruitment: " + the_number_of_recruitment +
            "\nis_express: " + is_express +
            "\nwork_period: " + work_period +
            "\nwork_start_year: " + work_start_year +
            "\nwork_start_month: " + work_start_month +
            "\nwork_start_day: " + work_start_day +
            "\nwork_end_year: " + work_end_year +
            "\nwork_end_month: " + work_end_month +
            "\nwork_end_day: " + work_end_day +
            "\nwork_start_time: " + work_start_time +
            "\nwork_end_time: " + work_end_time +
            "\nsalary_type: " + salary_type +
            "\nsalary: " + salary +
            "\nsex: " + sex +
            "\nage_start: " + age_start +
            "\nage_end: " + age_end +
            "\nuniversity_student: " + university_student +
            "\ndisabled_person: " + disabled_person +
            "\nforeigner: " + foreigner +
            "\neducational_background: " + educational_background
        );

        var finish_year = $("#finish-year option:selected").text();
        var finish_month = $("#finish-month option:selected").text();
        var finish_day = $("#finish-day option:selected").text();
        var receipt_methods = [];
        $("input:checkbox[name='receipt-methods']").each(function () {
            if (this.checked) {
                receipt_methods.push(this.value);
            }
        });
        var homepage = $("#homepage").val();
        data.finish_year = encodeURIComponent(finish_year);
        data.finish_month = encodeURIComponent(finish_month);
        data.finish_day = encodeURIComponent(finish_day);
        data.receipt_methods = encodeURIComponent(JSON.stringify(receipt_methods));
        data.homepage = encodeURIComponent(homepage);

        console.log(
            "finish_year: " + finish_year +
            "\nfinish_month: " + finish_month +
            "\nfinish_day: " + finish_day +
            "\nreceipt_methods:"
        );
        console.dir(receipt_methods);

        var manager_name = $("#manager-name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var fax = $("#fax").val();
        data.manager_name = encodeURIComponent(manager_name);
        data.email = encodeURIComponent(email);
        data.phone = encodeURIComponent(phone);
        data.fax = encodeURIComponent(fax);

        console.log(
            "manager_name: " + manager_name +
            "\nemail: " + email +
            "\nphone: " + phone +
            "\nfax: " + fax
        );

        var address_si = $("#address-si option:selected").text();
        var address_goo = $("#address-goo option:selected").text();
        var address_dong = $("#address-dong option:selected").text();
        var address_detail = $("#address-detail").val();
        var exposure_area_si = $("#exposure-area-si option:selected").text();
        var exposure_area_goo = $("#exposure-area-goo option:selected").text();
        var exposure_area_dong = $("#exposure-area-dong option:selected").text();
        var near_subway = $("#near-subway").val();
        var near_university = $("#near-university").val();
        data.address_si = encodeURIComponent(address_si);
        data.address_goo = encodeURIComponent(address_goo);
        data.address_dong = encodeURIComponent(address_dong);
        data.address_detail = encodeURIComponent(address_detail);
        data.exposure_area_si = encodeURIComponent(exposure_area_si);
        data.exposure_area_goo = encodeURIComponent(exposure_area_goo);
        data.exposure_area_dong = encodeURIComponent(exposure_area_dong);
        data.near_subway = encodeURIComponent(near_subway);
        data.near_university = encodeURIComponent(near_university);

        console.log(
            "address_si: " + address_si +
            "\naddress_goo: " + address_goo +
            "\naddress_dong: " + address_dong +
            "\naddress_detail: " + address_detail +
            "\nexposure_area_si: " + exposure_area_si +
            "\nexposure_area_goo: " + exposure_area_goo +
            "\nexposure_area_dong: " + exposure_area_dong +
            "\nnear_subway: " + near_subway +
            "\nnear_university: " + near_university
        );

        var s_cb = function (result) {
            if ( result['response'] === true ) {
                window.location = result.path;
            } else {
                if (result.msg === "server_error") {
                    return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                } else if (result.msg === "wrong_info") {
                    return show_bert("danger", 2000, "잘못된 정보가 등록되었습니다. 잠시 후 다시 시도해주세요.");
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
            pathname:"/register-notice",
            s_cb:s_cb,
            f_cb:f_cb
        });
    };
    $(document).on("submit", "#register-notice-form", function(e) {
        submit(e);
        return false;
    });
    $(document).on("click", "#register-notice-submit", function(e) {
        submit(e);
        return false;
    });
});