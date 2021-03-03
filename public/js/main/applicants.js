$(document).ready(function() {
    $(document).on('click', '.resume', function (e) {
        e.preventDefault();
        var company_id = window.location.pathname.replace("/applicants/", "");
        var id = $(e.currentTarget).attr("data-id");
        var created_at = $(e.currentTarget).attr("data-created-at");
        var s_cb = function (result) {
            if ( result['response'] === true ) {
                $("#applicant-prompt .prompt-main").empty();
                var doc = result["doc"];

                var date = new Date(parseInt(created_at));
                var applicant_created_at = '<div class="applicant-created-at">' + get_date(date) + '</div>';
                var applicant_title = '<div class="applicant-title">' + doc.title + '</div>';
                var photo = '<img class="photo" src="' + doc.photo + '">';
                var applicant_left = '<div class="applicant-left">' + photo + '</div>';
                if (doc.sex === "female") {
                    doc.sex = "여자";
                } else {
                    doc.sex = "남자";
                }
                doc.age = new Date().getFullYear() - doc.birth_year + 1;
                var applicant_right_box =  '<div class="applicant-right-box"><span class="applicant-name">' + doc.name + '</span><span class="applicant-age">' + doc.sex + '&nbsp;' + doc.age + '세&nbsp;/&nbsp;' + doc.birth_year + '년생</span></div>';
                applicant_right_box = applicant_right_box + '<div class="applicant-right-box"><span class="applicant-label">전화번호</span><span class="applicant-content">' + doc.phone + '</span></div>';
                applicant_right_box = applicant_right_box + '<div class="applicant-right-box"><span class="applicant-label">이메일</span><span class="applicant-content">' + doc.email + '</span></div>';
                applicant_right_box = applicant_right_box + '<div class="applicant-right-box"><span class="applicant-label">주소</span><span class="applicant-content">' + doc.address_si + '&nbsp;' + doc.address_goo + '&nbsp;' + doc.address_dong + '</span></div>';
                var applicant_right = '<div class="applicant-right">' + applicant_right_box + '</div>';
                var applicant_middle = '<div class="applicant-middle">' + applicant_left + applicant_right +  '</div>';

                var applicant_big_label = '<div class="applicant-big-label">희망근무지</div>';
                var applicant_content = '<div class="applicant-content">' + doc.work_place_si + '&nbsp;' + doc.work_place_goo + '&nbsp;' + doc.work_place_dong + '</div>';
                var applicant_bottom_box = '<div class="applicant-bottom-box">' + applicant_big_label + applicant_content +  '</div>';
                var applicant_content_box;
                var text;

                if (doc.final_education !== "") {
                    if (doc.final_education === "primary") {
                        doc.final_education = "초등학교졸업";
                    } else if (doc.final_education === "middle") {
                        doc.final_education = "중학교졸업";
                    } else if (doc.final_education === "high-in") {
                        doc.final_education = "고등학교재학";
                    } else if (doc.final_education === "high") {
                        doc.final_education = "고등학교졸업";
                    } else if (doc.final_education === "university2-in") {
                        doc.final_education = "대학교2,3년제재학";
                    } else if (doc.final_education === "university2") {
                        doc.final_education = "대학교2,3년제졸업";
                    } else if (doc.final_education === "university4-in") {
                        doc.final_education = "대학교4년제재학";
                    } else if (doc.final_education === "university4") {
                        doc.final_education = "대학교4년제졸업";
                    } else if (doc.final_education === "graduate") {
                        doc.final_education = "대학원졸업";
                    }
                    applicant_big_label = '<div class="applicant-big-label">최종학력</div>';
                    applicant_content = '<div class="applicant-content">' + doc.final_education + '</div>';
                    applicant_bottom_box = applicant_bottom_box + '<div class="applicant-bottom-box">' + applicant_big_label + applicant_content +  '</div>';
                }

                if (doc.work_types.length > 0) {
                    text = "";
                    for (var i = 0; i < doc.work_types.length; i++) {
                        if (doc.work_types[i] === "alba") {
                            text = text + "알바&nbsp;";
                        } else if (doc.work_types[i] === "permanent") {
                            text = text + "정규직&nbsp;";
                        } else if (doc.work_types[i] === "contract") {
                            text = text + "계약직&nbsp;";
                        } else if (doc.work_types[i] === "intern") {
                            text = text + "인턴&nbsp;";
                        }
                    }
                    applicant_big_label = '<div class="applicant-big-label">희망근무형태</div>';
                    applicant_content = '<div class="applicant-content">' + text + '</div>';
                    applicant_bottom_box = applicant_bottom_box + '<div class="applicant-bottom-box">' + applicant_big_label + applicant_content +  '</div>';
                }

                if (doc.work_period !== "") {
                    if (doc.work_period === "1day") {
                        doc.work_period = "하루";
                    } else if (doc.work_period === "1week") {
                        doc.work_period = "일주일이하";
                    } else if (doc.work_period === "1month") {
                        doc.work_period = "1주일~1개월";
                    } else if (doc.work_period === "3months") {
                        doc.work_period = "1개월~3개월";
                    } else if (doc.work_period === "6months") {
                        doc.work_period = "3개월~6개월";
                    } else if (doc.work_period === "1year") {
                        doc.work_period = "6개월~1년";
                    } else if (doc.work_period === "over_1year") {
                        doc.work_period = "1년이상";
                    }
                    applicant_big_label = '<div class="applicant-big-label">희망근무기간</div>';
                    applicant_content = '<div class="applicant-content">' + doc.work_period + '</div>';
                    applicant_bottom_box = applicant_bottom_box + '<div class="applicant-bottom-box">' + applicant_big_label + applicant_content +  '</div>';
                }

                if (doc.work_days.length > 0) {
                    text = "";
                    for (var i = 0; i < doc.work_days.length; i++) {
                        text = text + doc.work_days[i] + '&nbsp;';
                    }
                    applicant_big_label = '<div class="applicant-big-label">희망근무요일</div>';
                    applicant_content = '<div class="applicant-content">' + text + '</div>';
                    applicant_bottom_box = applicant_bottom_box + '<div class="applicant-bottom-box">' + applicant_big_label + applicant_content +  '</div>';
                }

                if (doc.work_start_time !== "" && doc.work_end_time !== "") {
                    applicant_big_label = '<div class="applicant-big-label">희망근무시간</div>';
                    applicant_content = '<div class="applicant-content">' + doc.work_start_time + '&nbsp;~&nbsp;' + doc.work_end_time + '</div>';
                    applicant_bottom_box = applicant_bottom_box + '<div class="applicant-bottom-box">' + applicant_big_label + applicant_content +  '</div>';
                }

                if (doc.salary_type !== "") {
                    if (doc.salary_type === "hour") {
                        doc.salary_type = "시급";
                    } else if (doc.salary_type === "day") {
                        doc.salary_type = "일급";
                    } else if (doc.salary_type === "week") {
                        doc.salary_type = "주급";
                    } else if (doc.salary_type === "month") {
                        doc.salary_type = "월급";
                    } else if (doc.salary_type === "year") {
                        doc.salary_type = "연봉";
                    } else if (doc.salary_type === "per") {
                        doc.salary_type = "건별";
                    }
                    doc.salary = put_comma_between_three_digits(doc.salary);
                    applicant_big_label = '<div class="applicant-big-label">희망급여</div>';
                    applicant_content = '<div class="applicant-content">' + doc.salary_type + '&nbsp;' + doc.salary + '원</div>';
                    applicant_bottom_box = applicant_bottom_box + '<div class="applicant-bottom-box">' + applicant_big_label + applicant_content +  '</div>';
                }

                if (doc.self_introduction !== "") {
                    applicant_big_label = '<div class="applicant-big-label">자기소개</div>';
                    applicant_content = '<div class="applicant-content" style="white-space:pre;">' + doc.self_introduction + '</div>';
                    applicant_bottom_box = applicant_bottom_box + '<div class="applicant-bottom-box">' + applicant_big_label + applicant_content +  '</div>';
                }

                var div1, div2;
                if (doc.careers.length > 0) {
                    applicant_content_box = "";
                    for (var i = 0; i < doc.careers.length; i++) {
                        div1 = '<div>' + doc.careers[i].start_year + '년&nbsp;' + doc.careers[i].start_month + '월&nbsp;~&nbsp;' + doc.careers[i].end_year + '년&nbsp;' + doc.careers[i].end_month + '월</div>';
                        div2 = '<div>' + doc.careers[i].company_name + '&nbsp;-&nbsp;' + doc.careers[i].task + '</div>';
                        applicant_content_box = applicant_content_box + '<div class="applicant-content-box">' + div1 + div2 + '</div>';
                    }
                    applicant_big_label = '<div class="applicant-big-label">경력사항&nbsp;' + doc.career_months + '개월</div>';
                    applicant_content = '<div class="applicant-content">' + applicant_content_box + '</div>';
                    applicant_bottom_box = applicant_bottom_box + '<div class="applicant-bottom-box">' + applicant_big_label + applicant_content +  '</div>';
                }

                if (doc.language_skills.length > 0) {
                    applicant_content_box = "";
                    for (var i = 0; i < doc.language_skills.length; i++) {
                        if (doc.language_skills[i].skill === "high") {
                            doc.language_skills[i].skill = "상";
                        } else if (doc.language_skills[i].skill === "middle") {
                            doc.language_skills[i].skill = "중";
                        } else if (doc.language_skills[i].skill === "low") {
                            doc.language_skills[i].skill = "하";
                        }
                        div1 = '<div>' + doc.language_skills[i].language + '&nbsp;-&nbsp;' + doc.language_skills[i].skill + '</div>';
                        applicant_content_box = applicant_content_box + '<div class="applicant-content-box">' + div1 + '</div>';
                    }
                    applicant_big_label = '<div class="applicant-big-label">외국어능력</div>';
                    applicant_content = '<div class="applicant-content">' + applicant_content_box + '</div>';
                    applicant_bottom_box = applicant_bottom_box + '<div class="applicant-bottom-box">' + applicant_big_label + applicant_content +  '</div>';
                }

                if (doc.certificates.length > 0) {
                    applicant_content_box = "";
                    for (var i = 0; i < doc.certificates.length; i++) {
                        div1 = '<div>' + doc.certificates[i].year + '년&nbsp;' + doc.certificates[i].month + '월</div>';
                        div2 = '<div>' + doc.certificates[i].name + '&nbsp;-&nbsp;' + doc.certificates[i].place_of_issue + '</div>';
                        applicant_content_box = applicant_content_box + '<div class="applicant-content-box">' + div1 + div2 + '</div>';
                    }
                    applicant_big_label = '<div class="applicant-big-label">자격증</div>';
                    applicant_content = '<div class="applicant-content">' + applicant_content_box + '</div>';
                    applicant_bottom_box = applicant_bottom_box + '<div class="applicant-bottom-box">' + applicant_big_label + applicant_content +  '</div>';
                }

                var applicant_bottom = '<div class="applicant-bottom">' + applicant_bottom_box + '</div>';

                var applicant = '<div class="applicant">' + applicant_created_at + applicant_title + applicant_middle + applicant_bottom + '</div>';
                var html = $.parseHTML(applicant);
                $("#applicant-prompt .prompt-main").append(html);
                modal("#applicant-prompt", "open");
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
            data: {
                company_id:encodeURIComponent(company_id),
                id:encodeURIComponent(id)
            },
            pathname:"/resume",
            s_cb:s_cb,
            f_cb:f_cb
        });
        return false;
    });
});