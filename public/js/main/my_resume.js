var my_resume = {};
my_resume.update_career_months = function () {
    var career_months = 0;
    $(".career").each(function (i) {
        var start_year = $(this).find(".start-year option:selected").text();
        var start_month = $(this).find(".start-month option:selected").text();
        var end_year = $(this).find(".end-year option:selected").text();
        var end_month = $(this).find(".end-month option:selected").text();
        start_year = parseInt(start_year);
        start_month = parseInt(start_month);
        end_year = parseInt(end_year);
        end_month = parseInt(end_month);
        var months = ((end_year - start_year) * 12) - start_month + end_month;
        if (months === 0) {
            months = 1;
        }
        if (months < 0) {
            months = 0;
        }
        career_months = career_months + months;
    });
    $("#career-months").text(career_months);
};
my_resume.add_career = function () {
    var div1 = '<div class="label">회사명</div>';
    var input1 = '<input class="company-name" type="text" placeholder="365알바">';
    var div2 = '<div class="label">근무기간</div>';
    var options = "";
    var current_year = new Date().getFullYear();
    var under_year = new Date().getFullYear() - 100;
    for (var i = current_year; i >= under_year; i--) {
        if (i === current_year) {
            options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
        } else {
            options = options + "<option value='" + i + "'>" + i + "</option>";
        }
    }
    var select1 = '<select class="start-year">' + options + '</select>년&nbsp;';
    var select3 = '<select class="end-year">' + options + '</select>년&nbsp;';

    options = "";
    for (var i = 1; i <= 12; i++) {
        if ( i === 1) {
            options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
        } else {
            options = options + "<option value='" + i + "'>" + i + "</option>";
        }
    }
    var select2 = '<select class="start-month">' + options + '</select>월&nbsp;~&nbsp;';
    var select4 = '<select class="end-month">' + options + '</select>월';

    var div3 = '<div class="label">담당업무</div>';
    var textarea1 = '<textarea class="task"></textarea>';
    var input2 = '<input class="remove-career" type="button" value="삭제">';
    var div4 = '<div class="remove-career-wrapper">' + input2 + '</div>';
    var career = '<div class="career">' + div1 + input1 + div2 + select1 + select2 + select3 + select4 + div3 + textarea1 + div4 + '</div>';
    var html = $.parseHTML(career);
    $("#career-wrapper").append(html);
};
my_resume.add_language_skill = function () {
    var count = $(".language-skill").length + 1;
    var div1 = '<div class="label">외국어</div>';
    var input1 = '<input class="language" type="text" placeholder="영어">';
    var div2 = '<div class="label">구사능력</div>';
    var input2 = '<input class="language-input-high" type="radio" id="high' + count + '" name="language-skill-' + count + '" value="high">';
    var label1 = '<label class="language-label-high" for="high' + count + '">상</label>';
    var input3 = '<input class="language-input-middle" type="radio" id="middle' + count + '" name="language-skill-' + count + '" value="middle" checked>';
    var label2 = '<label class="language-label-middle" for="middle' + count + '">중</label>';
    var input4 = '<input class="language-input-low" type="radio" id="low' + count + '" name="language-skill-' + count + '" value="low">';
    var label3 = '<label class="language-label-low" for="low' + count + '">하</label>';
    var div3 = '<div class="radio-toolbar">' + div2 + input2 + label1 + input3 + label2 + input4 + label3 + '</div>';
    var input5 = '<input class="remove-language-skill" type="button" value="삭제">';
    var div4 = '<div class="remove-language-skill-wrapper">' + input5 + '</div>';
    var language_skill = '<div class="language-skill">' + div1 + input1 + div3 + div4 + '</div>';

    var html = $.parseHTML(language_skill);
    $("#language-skill-wrapper").append(html);
};
my_resume.add_certificate = function () {
    var div1 = '<div class="label">자격증</div>';
    var input1 = '<input class="name" type="text" placeholder="">';
    var div2 = '<div class="label">발행처</div>';
    var input2 = '<input class="place-of-issue" type="text" placeholder="">';
    var div3 = '<div class="label">취득일</div>';

    var options = "";
    var current_year = new Date().getFullYear();
    var under_year = new Date().getFullYear() - 100;
    for (var i = current_year; i >= under_year; i--) {
        if (i === current_year) {
            options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
        } else {
            options = options + "<option value='" + i + "'>" + i + "</option>";
        }
    }
    var select1  = '<select class="year">' + options + '</select>년&nbsp;';

    options = "";
    for (var i = 1; i <= 12; i++) {
        if ( i === 1) {
            options = options + "<option value='" + i + "' selected='selected'>" + i + "</option>";
        } else {
            options = options + "<option value='" + i + "'>" + i + "</option>";
        }
    }
    var select2 = '<select class="month">' + options + '</select>';

    var input3 = '<input class="remove-certificate" type="button" value="삭제">';
    var div4 = '<div class="remove-certificate-wrapper">' + input3 + '</div>';
    var certificate = '<div class="certificate">' + div1 + input1 + div2 + input2 + div3 + select1 + select2 + div4 + '</div>';

    var html = $.parseHTML(certificate);
    $("#certificate-wrapper").append(html);
};
$(document).ready(function() {
    var s_cb = function (result) {
        if ( result['response'] === true ) {
            console.dir(result["doc"]);
            var doc = result["doc"];
            $("#name").val(doc.name);
            $("#photo").attr("src", doc.photo);
            $("input:radio[name=sex]").filter("[value=" + doc.sex + "]").prop("checked", true);
            $("#phone").val(doc.phone);
            $("#email").val(doc.email);

            /* 주소 초기화 */
            var si = area.si();
            var options = "";
            for (var i = 0; i < si.length; i++) {
                if (si[i] === doc.address_si) {
                    options = options + "<option value='" + si[i] + "' selected='selected'>" + si[i] + "</option>";
                } else {
                    options = options + "<option value='" + si[i] + "'>" + si[i] + "</option>";
                }
            }
            var html = $.parseHTML(options);
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

            $("#title").val(doc.title);

            /* 희망 근무지 주소 초기화 */
            si = area.si();
            options = "";
            for (var i = 0; i < si.length; i++) {
                if (si[i] === doc.work_place_si) {
                    options = options + "<option value='" + si[i] + "' selected='selected'>" + si[i] + "</option>";
                } else {
                    options = options + "<option value='" + si[i] + "'>" + si[i] + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#work-place-si").append(html);

            goo = area.goo(doc.work_place_si);
            options = "";
            for (var i = 0; i < goo.length; i++) {
                if (goo[i] === doc.work_place_goo) {
                    options = options + "<option value='" + goo[i] + "' selected='selected'>" + goo[i] + "</option>";
                } else {
                    options = options + "<option value='" + goo[i] + "'>" + goo[i] + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#work-place-goo").append(html);

            dong = area.dong(doc.work_place_si, doc.work_place_goo);
            options = "";
            for (var i = 0; i < dong.length; i++) {
                if (dong[i] === doc.work_place_dong) {
                    options = options + "<option value='" + dong[i] + "' selected='selected'>" + dong[i] + "</option>";
                } else {
                    options = options + "<option value='" + dong[i] + "'>" + dong[i] + "</option>";
                }
            }
            html = $.parseHTML(options);
            $("#work-place-dong").append(html);

            $("#alba").prop("checked", false);
            $("#permanent").prop("checked", false);
            $("#contract").prop("checked", false);
            $("#intern").prop("checked", false);
            for (var i = 0; i < doc.work_types.length; i++) {
                if (doc.work_types[i] === "alba") {
                    $("#alba").prop("checked", true);
                } else if (doc.work_types[i] === "permanent") {
                    $("#permanent").prop("checked", true);
                } else if (doc.work_types[i] === "contract") {
                    $("#contract").prop("checked", true);
                } else if (doc.work_types[i] === "intern") {
                    $("#intern").prop("checked", true);
                }
            }
            if (doc.work_period !== "") {
                $("input:radio[name=work-period]").filter("[value=" + doc.work_period + "]").prop("checked", true);
            }

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

            if (doc.salary_type !== "") {
                $("#salary-type option[value=" + doc.salary_type + "]").attr("selected", "selected");
            }
            $("#salary").val(doc.salary);

            if (doc.final_education !== "") {
                $("#final-education option[value=" + doc.final_education + "]").attr("selected", "selected");
            }

            $("#self-introduction").val(doc.self_introduction);

            $("#career-months").text(doc.career_months);

            for (var i = 0; i < doc.careers.length; i++) {
                my_resume.add_career();
            }
            $(".career").each(function (i) {
                $(this).find(".company-name").val(doc.careers[i].company_name);
                $(this).find(".task").val(doc.careers[i].task);
                $(this).find(".start-year option[value=" + doc.careers[i].start_year + "]").attr("selected", "selected");
                $(this).find(".start-month option[value=" + doc.careers[i].start_month + "]").attr("selected", "selected");
                $(this).find(".end-year option[value=" + doc.careers[i].end_year + "]").attr("selected", "selected");
                $(this).find(".end-month option[value=" + doc.careers[i].end_month + "]").attr("selected", "selected");
            });
            for (var i = 0; i < doc.language_skills.length; i++) {
                my_resume.add_language_skill();
            }
            $(".language-skill").each(function (i) {
                $(this).find(".language").val(doc.language_skills[i].language);
                var count = i + 1;
                $("input:radio[name=language-skill-" + count + "]").filter("[value=" + doc.language_skills[i].skill + "]").prop("checked", true);
            });
            /* language-skill count 제대로 들어갔는지 확인하기 */
            for (var i = 0; i < doc.certificates.length; i++) {
                my_resume.add_certificate();
            }
            $(".certificate").each(function (i) {
                $(this).find(".name").val(doc.certificates[i].name);
                $(this).find(".place-of-issue").val(doc.certificates[i].place_of_issue);
                $(this).find(".year option[value=" + doc.certificates[i].year + "]").attr("selected", "selected");
                $(this).find(".month option[value=" + doc.certificates[i].month + "]").attr("selected", "selected");
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
        data: {},
        pathname:"/get-my-resume",
        s_cb:s_cb,
        f_cb:f_cb
    });

    /* 경력사항추가 버튼 클릭 이벤트 */
    $(document).on("click", "#add-career", function (e) {
        e.preventDefault();
        my_resume.add_career();
        my_resume.update_career_months();
        return false;
    });

    /* 외국어능력추가 버튼 클릭 이벤트 */
    $(document).on("click", "#add-language-skill", function (e) {
        e.preventDefault();
        my_resume.add_language_skill();
        return false;
    });

    /* 자격증추가 버튼 클릭 이벤트 */
    $(document).on("click", "#add-certificate", function (e) {
        e.preventDefault();
        my_resume.add_certificate();
        return false;
    });

    /* 경력사항 - 삭제 버튼 클릭 이벤트 */
    $(document).on("click", ".remove-career", function (e) {
        e.preventDefault();
        $(e.currentTarget).parent().parent().remove();
        my_resume.update_career_months();
        return false;
    });

    /* 외국어능력 - 삭제 버튼 클릭 이벤트 */
    $(document).on("click", ".remove-language-skill", function (e) {
        e.preventDefault();
        $(e.currentTarget).parent().parent().remove();
        $(".language-skill").each(function (i) {
            var count = i + 1;
            $(this).find(".language-input-high").attr("id", "high" + count);
            $(this).find(".language-input-high").attr("name", "language-skill-" + count);
            $(this).find(".language-label-high").attr("for", "high" + count);

            $(this).find(".language-input-middle").attr("id", "middle" + count);
            $(this).find(".language-input-middle").attr("name", "language-skill-" + count);
            $(this).find(".language-label-middle").attr("for", "middle" + count);

            $(this).find(".language-input-low").attr("id", "low" + count);
            $(this).find(".language-input-low").attr("name", "language-skill-" + count);
            $(this).find(".language-label-low").attr("for", "low" + count);
        });
        return false;
    });

    /* 자격증 - 삭제 버튼 클릭 이벤트 */
    $(document).on("click", ".remove-certificate", function (e) {
        e.preventDefault();
        $(e.currentTarget).parent().parent().remove();
        return false;
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

    /* 근무지 시 변경 시, 구와 동 첫번째 선택 */
    $(document).on("change", "#work-place-si", function (e) {
        e.preventDefault();
        var si = $("#work-place-si option:selected").text();
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
        $("#work-place-goo").empty();
        $("#work-place-goo").append(html);

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
        $("#work-place-dong").empty();
        $("#work-place-dong").append(html);
        return false;
    });
    /* 근무지 구 변경 시, 동 첫번째 선택 */
    $(document).on("change", "#work-place-goo", function (e) {
        e.preventDefault();
        var si = $("#work-place-si option:selected").text();
        var goo = $("#work-place-goo option:selected").text();
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
        $("#work-place-dong").empty();
        $("#work-place-dong").append(html);
        return false;
    });

    $(document).on("change", ".career .start-year, .career .start-month, .career .end-year, .career .end-month", function (e) {
        e.preventDefault();
        my_resume.update_career_months();
        return false;
    });

    $(document).on('click', '#change-photo', function (e) {
        e.preventDefault();
        $('#upload-photo').val("");
        document.getElementById('upload-photo').click();
        return false;
    });
    $("#upload-photo").change(function (e) {
        var file = $('input[type=file]#upload-photo')[0].files[0];
        if (!$('#upload-photo').val().match(/.(jpg|jpeg|png|gif)$/i)) {
            console.log("jpg/jpeg, png, gif만 업로드할 수 있습니다.");
            return false;
        }
        if (file["size"] > 5242880) {
            console.log("이미지는 5MB 이하만 업로드하세요.");
            return false;
        }
        $("#upload-photo-form").trigger("submit");
    });
    $('iframe#upload-photo-iframe').load(function() {
        var iframe = document.getElementById("upload-photo-iframe");
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        var target, result;
        target = doc.getElementById("result-inserting-photo");
        if (target) {
            result = target.innerHTML;
            result = JSON.parse(result);
            if (result['result'] === false) {
                if (result['reason'] === 'server_error') {
                    show_bert("danger", 2000, "서버 에러가 발생하였습니다. 다시 시도해주세요.");
                } else {
                    show_bert("danger", 2000, "이미지는 5MB 이하만 업로드하세요.");
                }
                return false;
            } else {
                var photo = $("#photo").attr("src");
                $("#photo").attr("src", result.path);
                var s_cb = function (result) {
                    if ( result['response'] === true ) {
                        console.log("성공적으로 이전 이미지를 삭제하였습니다.");
                    } else {
                    }
                };
                var f_cb = function () {
                };
                methods["the_world"]["is_one"]({
                    show_animation: true,
                    data: { photo: encodeURIComponent(photo) },
                    pathname:"/remove/photo",
                    s_cb:s_cb,
                    f_cb:f_cb
                });
                return false;
            }
        } else {
            console.log("이미지는 5MB 이하만 업로드하세요.");
            return false;
        }
    });

    var submit = function (e) {
        e.preventDefault();
        var data = {};
        var name = $("#name").val();
        var photo = $("#photo").attr("src");
        var sex = $("input[name='sex']:checked").val();
        var phone = $("#phone").val();
        var email = $("#email").val();
        var address_si = $("#address-si option:selected").text();
        var address_goo = $("#address-goo option:selected").text();
        var address_dong = $("#address-dong option:selected").text();
        var title = $("#title").val();
        var work_place_si = $("#work-place-si option:selected").text();
        var work_place_goo = $("#work-place-goo option:selected").text();
        var work_place_dong = $("#work-place-dong option:selected").text();
        var work_types = [];
        $("input:checkbox[name='work-types']").each(function () {
            if (this.checked) {
                work_types.push(this.value);
            }
        });
        var work_period = $("input[name='work-period']:checked").val();
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
        var final_education = $("#final-education option:selected").val();
        var self_introduction = $("#self-introduction").val();
        var career_months = $("#career-months").text();

        data.name = encodeURIComponent(name);
        data.photo = encodeURIComponent(photo);
        data.sex = encodeURIComponent(sex);
        data.phone = encodeURIComponent(phone);
        data.email = encodeURIComponent(email);
        data.address_si = encodeURIComponent(address_si);
        data.address_goo = encodeURIComponent(address_goo);
        data.address_dong = encodeURIComponent(address_dong);
        data.title = encodeURIComponent(title);
        data.work_place_si = encodeURIComponent(work_place_si);
        data.work_place_goo = encodeURIComponent(work_place_goo);
        data.work_place_dong = encodeURIComponent(work_place_dong);
        data.work_types = encodeURIComponent(JSON.stringify(work_types));
        data.work_period = encodeURIComponent(work_period);
        data.work_days = encodeURIComponent(JSON.stringify(work_days));
        data.work_start_time = encodeURIComponent(work_start_time);
        data.work_end_time = encodeURIComponent(work_end_time);
        data.salary_type = encodeURIComponent(salary_type);
        data.salary = encodeURIComponent(salary);
        data.final_education = encodeURIComponent(final_education);
        data.self_introduction = encodeURIComponent(self_introduction);
        data.career_months = encodeURIComponent(career_months);

        var careers = [];
        $(".career").each(function (i) {
            var company_name = $(this).find(".company-name").val();
            var task = $(this).find(".task").val();
            var start_year = $(this).find(".start-year option:selected").text();
            var start_month = $(this).find(".start-month option:selected").text();
            var end_year = $(this).find(".end-year option:selected").text();
            var end_month = $(this).find(".end-month option:selected").text();
            careers.push({
                company_name: company_name,
                task: task,
                start_year: start_year,
                start_month: start_month,
                end_year: end_year,
                end_month: end_month
            });
        });
        data.careers = encodeURIComponent(JSON.stringify(careers));

        var language_skills = [];
        $(".language-skill").each(function (i) {
            var language = $(this).find(".language").val();
            var count = i + 1;
            var skill = $(this).find("input[name='language-skill-" + count + "']:checked").val();
            language_skills.push({language:language, skill: skill});
        });
        data.language_skills = encodeURIComponent(JSON.stringify(language_skills));

        var certificates = [];
        $(".certificate").each(function (i) {
            var name = $(this).find(".name").val();
            var place_of_issue = $(this).find(".place-of-issue").val();
            var year = $(this).find(".year option:selected").text();
            var month = $(this).find(".month option:selected").text();
            certificates.push({
                name: name,
                place_of_issue: place_of_issue,
                year: year,
                month: month
            });
        });
        data.certificates = encodeURIComponent(JSON.stringify(certificates));

        console.log(
            "name: " + name +
            "\nphoto: " + photo +
            "\nsex: " + sex +
            "\nphone: " + phone +
            "\nemail: " + email +
            "\naddress_si: " + address_si +
            "\naddress_goo: " + address_goo +
            "\naddress_dong: " + address_dong +
            "\ntitle: " + title +
            "\nwork_place_si: " + work_place_si +
            "\nwork_place_goo: " + work_place_goo +
            "\nwork_place_dong: " + work_place_dong +
            "\nwork_types: "
        );
        console.dir(work_types);
        console.log(
            "work_period:" + work_period +
            "\nwork_days:"
        );
        console.dir(work_days);
        console.log(
            "work_start_time: " + work_start_time +
            "\nwork_end_time: " + work_end_time +
            "\nsalary_type: " + salary_type +
            "\nsalary: " + salary +
            "\nfinal_education: " + final_education +
            "\nself_introduction: " + self_introduction +
            "\ncareer_months: " + career_months
        );
        console.log("careers: ");
        console.dir(careers);
        console.log("language_skills: ");
        console.dir(language_skills);
        console.log("certificates: ");
        console.dir(certificates);

        var s_cb = function (result) {
            if ( result['response'] === true ) {
                return show_bert("success", 2000, "성공적으로 이력서를 업로드하였습니다.");
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
            pathname:"/set-my-resume",
            s_cb:s_cb,
            f_cb:f_cb
        });
    };

    $(document).on("submit", "#my-resume-form", function(e) {
        submit(e);
        return false;
    });
    $(document).on("click", "#my-resume-submit", function(e) {
        submit(e);
        return false;
    });
});