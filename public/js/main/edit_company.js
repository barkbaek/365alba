$(document).ready(function() {
    var id = window.location.pathname.replace("/edit-company/", "");
    var s_cb = function (result) {
        if ( result['response'] === true ) {
            var doc = result['doc'];
            console.dir(doc);
            $("#title").val(doc.title);
            $("#company-name").val(doc.company_name);
            $("input:radio[name=employment-type]").filter("[value=" + doc.employment_type + "]").prop("checked", true);
            /* 업직종 추가 */
            var type = business_type.big();
            var options = "";
            for (var i = 0; i < type.length; i++) {
                if (type[i] === doc.business_type_big) {
                    options = options + "<option value='" + type[i] + "' selected='selected'>" + type[i] + "</option>";
                } else {
                    options = options + "<option value='" + type[i] + "'>" + type[i] + "</option>";
                }
            }
            var html = $.parseHTML(options);
            $("#business-type-big").append(html);

            type = business_type.small(doc.business_type_big);
            options = "";
            for (var i = 0; i < type.length; i++) {
                if (type[i] === doc.business_type_small) {
                    options = options + "<option value='" + type[i] + "' selected='selected'>" + type[i] + "</option>";
                } else {
                    options = options + "<option value='" + type[i] + "'>" + type[i] + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#business-type-small").append(html);

            $("#the-number-of-recruitment").val(doc.the_number_of_recruitment);
            if (doc.is_express) {
                $("#is_express").prop("checked", true);
            } else {
                $("#is_express").prop("checked", false);
            }
            $("input:radio[name=work-period]").filter("[value=" + doc.work_period + "]").prop("checked", true);
            /* 근무시작일 */
            options = "";
            var current_year = new Date().getFullYear();
            var over_year = new Date().getFullYear() + 5;
            for (var i = current_year; i <= over_year; i++) {
                if (i === doc.work_start_year) {
                    options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
                } else {
                    options = options + "<option value='" + i + "'>" + i + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#work-start-year").append(html);

            options = "";
            for (var i = 1; i <= 12; i++) {
                if ( i === doc.work_start_month) {
                    options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
                } else {
                    options = options + "<option value='" + i + "'>" + i + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#work-start-month").append(html);

            options = "";
            for (var i = 1; i <= 31; i++) {
                if ( i === doc.work_start_day) {
                    options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
                } else {
                    options = options + "<option value='" + i + "'>" + i + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#work-start-day").append(html);

            /* 근무마감일 */
            options = "";
            current_year = new Date().getFullYear();
            over_year = new Date().getFullYear() + 5;
            for (var i = current_year; i <= over_year; i++) {
                if (i === doc.work_end_year) {
                    options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
                } else {
                    options = options + "<option value='" + i + "'>" + i + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#work-end-year").append(html);

            options = "";
            for (var i = 1; i <= 12; i++) {
                if ( i === doc.work_end_month) {
                    options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
                } else {
                    options = options + "<option value='" + i + "'>" + i + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#work-end-month").append(html);

            options = "";
            for (var i = 1; i <= 31; i++) {
                if ( i === doc.work_end_day) {
                    options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
                } else {
                    options = options + "<option value='" + i + "'>" + i + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#work-end-day").append(html);

            for (var i = 0; i < doc.work_days.length; i++) {
                if (doc.work_days[i] === "일") {
                   $("#sun").prop("checked", true);
                } else if (doc.work_days[i] === "월") {
                    $("#mon").prop("checked", true);
                } else if (doc.work_days[i] === "화") {
                    $("#tue").prop("checked", true);
                } else if (doc.work_days[i] === "수") {
                    $("#wed").prop("checked", true);
                } else if (doc.work_days[i] === "목") {
                    $("#thu").prop("checked", true);
                } else if (doc.work_days[i] === "금") {
                    $("#fri").prop("checked", true);
                } else if (doc.work_days[i] === "토") {
                    $("#sat").prop("checked", true);
                }
            }

            /* 근무시작시간 */
            options = "";
            var value = "";
            for (var i = 0; i <= 24; i++) {
                if ( i === 0) {
                    value = "00:30";
                    if (value === doc.work_start_time) {
                        options = options + "<option value='" + value + "' selected='selected'>" + value + "</option>";
                    } else {
                        options = options + "<option value='" + value + "'>" + value + "</option>";
                    }
                } else if (i === 24) {
                    value = "24:00";
                    if (value === doc.work_start_time) {
                        options = options + "<option value='" + value + "' selected='selected'>" + value + "</option>";
                    } else {
                        options = options + "<option value='" + value + "'>" + value + "</option>";
                    }
                } else {
                    if ( i < 10) {
                        value = "0" + i + ":00";
                        if (value === doc.work_start_time) {
                            options = options + "<option value='" + value + "' selected='selected'>" + value + "</option>";
                        } else {
                            options = options + "<option value='" + value + "'>" + value + "</option>";
                        }
                        value = "0" + i + ":30";
                        if (value === doc.work_start_time) {
                            options = options + "<option value='" + value + "' selected='selected'>" + value + "</option>";
                        } else {
                            options = options + "<option value='" + value + "'>" + value + "</option>";
                        }
                    } else {
                        value = i + ":00";
                        if (value === doc.work_start_time) {
                            options = options + "<option value='" + value + "' selected='selected'>" + value + "</option>";
                        } else {
                            options = options + "<option value='" + value + "'>" + value + "</option>";
                        }
                        value = i + ":30";
                        if (value === doc.work_start_time) {
                            options = options + "<option value='" + value + "' selected='selected'>" + value + "</option>";
                        } else {
                            options = options + "<option value='" + value + "'>" + value + "</option>";
                        }
                    }
                }
            }
            html = $.parseHTML(options);
            $("#work-start-time").append(html);

            /* 근무마감시간 */
            options = "";
            value = "";
            for (var i = 0; i <= 24; i++) {
                if ( i === 0) {
                    value = "00:30";
                    if (value === doc.work_end_time) {
                        options = options + "<option value='" + value + "' selected='selected'>" + value + "</option>";
                    } else {
                        options = options + "<option value='" + value + "'>" + value + "</option>";
                    }
                } else if (i === 24) {
                    value = "24:00";
                    if (value === doc.work_end_time) {
                        options = options + "<option value='" + value + "' selected='selected'>" + value + "</option>";
                    } else {
                        options = options + "<option value='" + value + "'>" + value + "</option>";
                    }
                } else {
                    if ( i < 10) {
                        value = "0" + i + ":00";
                        if (value === doc.work_end_time) {
                            options = options + "<option value='" + value + "' selected='selected'>" + value + "</option>";
                        } else {
                            options = options + "<option value='" + value + "'>" + value + "</option>";
                        }
                        value = "0" + i + ":30";
                        if (value === doc.work_end_time) {
                            options = options + "<option value='" + value + "' selected='selected'>" + value + "</option>";
                        } else {
                            options = options + "<option value='" + value + "'>" + value + "</option>";
                        }
                    } else {
                        value = i + ":00";
                        if (value === doc.work_end_time) {
                            options = options + "<option value='" + value + "' selected='selected'>" + value + "</option>";
                        } else {
                            options = options + "<option value='" + value + "'>" + value + "</option>";
                        }
                        value = i + ":30";
                        if (value === doc.work_end_time) {
                            options = options + "<option value='" + value + "' selected='selected'>" + value + "</option>";
                        } else {
                            options = options + "<option value='" + value + "'>" + value + "</option>";
                        }
                    }
                }
            }
            html = $.parseHTML(options);
            $("#work-end-time").append(html);

            $("#salary-type option[value=" + doc.salary_type + "]").attr("selected", "selected");
            $("#salary").val(doc.salary);
            $("input:radio[name=sex]").filter("[value=" + doc.sex + "]").prop("checked", true);

            /* 연령시작 */
            options = "";
            for (var i = 1; i <= 130; i++) {
                if ( i === doc.age_start) {
                    options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
                } else {
                    options = options + "<option value='" + i + "'>" + i + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#age-start").append(html);

            /* 연령끝 */
            options = "";
            for (var i = 1; i <= 130; i++) {
                if ( i === doc.age_end) {
                    options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
                } else {
                    options = options + "<option value='" + i + "'>" + i + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#age-end").append(html);

            if (doc.university_student) {
                $("#university-student").prop("checked", true);
            } else {
                $("#university-student").prop("checked", false);
            }

            if (doc.disabled_person) {
                $("#disabled-person").prop("checked", true);
            } else {
                $("#disabled-person").prop("checked", false);
            }

            if (doc.foreigner) {
                $("#foreigner").prop("checked", true);
            } else {
                $("#foreigner").prop("checked", false);
            }

            $("#educational-background option[value=" + doc.educational_background + "]").attr("selected", "selected");

            /* 모집종료일 */
            options = "";
            current_year = new Date().getFullYear();
            over_year = new Date().getFullYear() + 5;
            for (var i = current_year; i <= over_year; i++) {
                if (i === doc.finish_year) {
                    options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
                } else {
                    options = options + "<option value='" + i + "'>" + i + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#finish-year").append(html);

            options = "";
            for (var i = 1; i <= 12; i++) {
                if ( i === doc.finish_month) {
                    options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
                } else {
                    options = options + "<option value='" + i + "'>" + i + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#finish-month").append(html);

            options = "";
            for (var i = 1; i <= 31; i++) {
                if ( i === doc.finish_day) {
                    options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
                } else {
                    options = options + "<option value='" + i + "'>" + i + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#finish-day").append(html);

            $("#online").prop("checked", false);
            $("#apply-email").prop("checked", false);
            $("#phone_message").prop("checked", false);
            $("#apply-homepage").prop("checked", false);
            $("#visit").prop("checked", false);
            for (var i = 0; i < doc.receipt_methods.length; i++) {
                if (doc.receipt_methods[i] === "online") {
                    $("#online").prop("checked", true);
                } else if (doc.receipt_methods[i] === "email") {
                    $("#apply-email").prop("checked", true);
                } else if (doc.receipt_methods[i] === "phone_message") {
                    $("#phone_message").prop("checked", true);
                } else if (doc.receipt_methods[i] === "homepage") {
                    $("#apply-homepage").prop("checked", true);
                } else if (doc.receipt_methods[i] === "visit") {
                    $("#visit").prop("checked", true);
                }
            }

            $("#homepage").val(doc.homepage);
            $("#manager-name").val(doc.manager_name);
            $("#email").val(doc.email);
            $("#phone").val(doc.phone);
            $("#fax").val(doc.fax);

            $("#address-detail").val(doc.address_detail);
            $("#near-subway").val(doc.near_subway);
            $("#near-university").val(doc.near_university);

            /* 근무지 초기화 */
            var si = area.si();
            options = "";
            for (var i = 0; i < si.length; i++) {
                if (si[i] === doc.address_si) {
                    options = options + "<option value='" + si[i] + "' selected='selected'>" + si[i] + "</option>";
                } else {
                    options = options + "<option value='" + si[i] + "'>" + si[i] + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#address-si").append(html);

            var goo = area.goo(doc.address_si);
            options = "";
            for (var i = 0; i < goo.length; i++) {
                if (goo[i] === doc.address_goo) {
                    options = options + "<option value='" + goo[i] + "' selected='selected'>" + goo[i] + "</option>";
                } else {
                    options = options + "<option value='" + goo[i] + "'>" + goo[i] + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#address-goo").append(html);

            var dong = area.dong(doc.address_si, doc.address_goo);
            options = "";
            for (var i = 0; i < dong.length; i++) {
                if (dong[i] === doc.address_dong) {
                    options = options + "<option value='" + dong[i] + "' selected='selected'>" + dong[i] + "</option>";
                } else {
                    options = options + "<option value='" + dong[i] + "'>" + dong[i] + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#address-dong").append(html);

            /* 공고노출지역 초기화 */
            si = area.si();
            si.unshift("전국");
            options = "";
            for (var i = 0; i < si.length; i++) {
                if (si[i] === doc.exposure_area_si) {
                    options = options + "<option value='" + si[i] + "' selected='selected'>" + si[i] + "</option>";
                } else {
                    options = options + "<option value='" + si[i] + "'>" + si[i] + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#exposure-area-si").append(html);

            goo = area.goo(doc.exposure_area_si);
            if (goo[0] !== "전체") {
                goo.unshift("전체");
            }
            options = "";
            for (var i = 0; i < goo.length; i++) {
                if (goo[i] === doc.exposure_area_goo) {
                    options = options + "<option value='" + goo[i] + "' selected='selected'>" + goo[i] + "</option>";
                } else {
                    options = options + "<option value='" + goo[i] + "'>" + goo[i] + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#exposure-area-goo").append(html);

            dong = area.dong(doc.exposure_area_si, doc.exposure_area_goo);
            if (dong[0] !== "전체") {
                dong.unshift("전체");
            }
            options = "";
            for (var i = 0; i < dong.length; i++) {
                if (dong[i] === doc.exposure_area_dong) {
                    options = options + "<option value='" + dong[i] + "' selected='selected'>" + dong[i] + "</option>";
                } else {
                    options = options + "<option value='" + dong[i] + "'>" + dong[i] + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#exposure-area-dong").append(html);

            var address = doc.address_si + " " + doc.address_goo + " " + doc.address_dong + " " + doc.address_detail;
            geocoder.addressSearch(address, function(result, status) {
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
        data:{
            id: encodeURIComponent(id)
        },
        pathname:"/get-company",
        s_cb:s_cb,
        f_cb:f_cb
    });

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
        var id = window.location.pathname.replace("/edit-company/", "");
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

        data.id = encodeURIComponent(id);
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
                window.location = "/company/" + id;
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
            pathname:"/edit-company",
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