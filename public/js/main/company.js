$(document).ready(function() {
    var created_at = $("body").attr("created-at");
    var date = new Date(parseInt(created_at));
    $("#created-at").html("등록일 " + get_date(date));
    var address = $("#address").text();
    geocoder.addressSearch(address, function(result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {

            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">근무지</div>'
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        }
    });
    /* 온라인지원 클릭 이벤트 */
    $(document).on('click', '#apply-online', function (e) {
        e.preventDefault();
        var is_loggedin = $("body").attr("is-loggedin") === "true";
        if (is_loggedin === false) {
            modal("#request-login-prompt", "open");
        } else {
            /* 서버로 접근하여 온라인 지원하기 */
            var id = window.location.pathname.replace("/company/", "");
            var s_cb = function (result) {
                if ( result['response'] === true ) {
                    return show_bert("success", 2000, "성공적으로 온라인 지원하였습니다.");
                } else {
                    if (result.msg === "server_error") {
                        return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                    } else if (result.msg === "not_user") {
                        return show_bert("danger", 2000, "개인서비스 로그인 후 다시 시도해주세요.");
                    } else if (result.msg === "already_applied") {
                        return show_bert("danger", 2000, "이미 지원하였습니다.");
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
                data: {id: encodeURIComponent(id)},
                pathname:"/apply-online",
                s_cb:s_cb,
                f_cb:f_cb
            });
        }
        return false;
    });
    /* 이메일지원 클릭 이벤트 */
    $(document).on('click', '#apply-email', function (e) {
        e.preventDefault();
        var is_loggedin = $("body").attr("is-loggedin") === "true";
        if (is_loggedin === false) {
            modal("#request-login-prompt", "open");
        } else {
            /* 서버로 접근하여 온라인 지원하기 */
            var id = window.location.pathname.replace("/company/", "");
            var s_cb = function (result) {
                modal("#apply-email-prompt", "open");
                if ( result['response'] === true ) {
                    var id = window.location.pathname.replace("/company/", "");
                    var s_cb = function (result) {
                    };
                    var f_cb = function () {
                    };
                    methods["the_world"]["is_one"]({
                        show_animation: true,
                        data: {id: encodeURIComponent(id)},
                        pathname:"/apply-email",
                        s_cb:s_cb,
                        f_cb:f_cb
                    });
                } else {
                    if (result.msg === "server_error") {
                        return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                    } else if (result.msg === "not_user") {
                        return show_bert("danger", 2000, "개인서비스 로그인 후 다시 시도해주세요.");
                    } else if (result.msg === "already_applied") {
                        return show_bert("danger", 2000, "이미 지원하였습니다.");
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
                data: {id: encodeURIComponent(id)},
                pathname:"/apply-online",
                s_cb:s_cb,
                f_cb:f_cb
            });
        }
        return false;
    });
    /* 전화문자지원 클릭 이벤트 */
    $(document).on('click', '#apply-phone-message', function (e) {
        e.preventDefault();
        var is_loggedin = $("body").attr("is-loggedin") === "true";
        if (is_loggedin === false) {
            modal("#request-login-prompt", "open");
        } else {
            /* 서버로 접근하여 온라인 지원하기 */
            var id = window.location.pathname.replace("/company/", "");
            var s_cb = function (result) {
                modal("#apply-phone-message-prompt", "open");
                if ( result['response'] === true ) {
                    var id = window.location.pathname.replace("/company/", "");
                    var s_cb = function (result) {
                    };
                    var f_cb = function () {
                    };
                    methods["the_world"]["is_one"]({
                        show_animation: true,
                        data: {id: encodeURIComponent(id)},
                        pathname:"/apply-phone",
                        s_cb:s_cb,
                        f_cb:f_cb
                    });
                } else {
                    if (result.msg === "server_error") {
                        return show_bert("danger", 2000, "서버 내부 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                    } else if (result.msg === "not_user") {
                        return show_bert("danger", 2000, "개인서비스 로그인 후 다시 시도해주세요.");
                    } else if (result.msg === "already_applied") {
                        return show_bert("danger", 2000, "이미 지원하였습니다.");
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
                data: {id: encodeURIComponent(id)},
                pathname:"/apply-online",
                s_cb:s_cb,
                f_cb:f_cb
            });
        }
        return false;
    });
    /* 스크랩 버튼 클릭 이벤트 */
    $(document).on("click", ".alba-scrap", function (e) {
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
            pathname:"/scrap-toggle-alba",
            s_cb:s_cb,
            f_cb:f_cb
        });
        return false;
    });
    /* 수정 버튼 이벤트 */
    $(document).on("click", "#edit", function (e) {
        e.preventDefault();
        var id = window.location.pathname.replace("/company/", "");
        window.location = "/edit-company/" + id;
        return false;
    });
    /* 마감 버튼 이벤트 */
    $(document).on("click", "#deadline", function (e) {
        e.preventDefault();
        modal("#deadline-prompt", "open");
        return false;
    });
    $(document).on("click", "#btn-deadline", function (e) {
        e.preventDefault();
        // 서버에서 마감시키기
        var id = window.location.pathname.replace("/company/", "");
        var s_cb = function (result) {
            if ( result['response'] === true ) {
                window.location.reload();
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
            pathname:"/deadline-company",
            s_cb:s_cb,
            f_cb:f_cb
        });
        return false;
    });
    /* 삭제 버튼 이벤트 */
    $(document).on("click", "#remove", function (e) {
        e.preventDefault();
        modal("#remove-prompt", "open");
        return false;
    });
    $(document).on("click", "#btn-remove", function (e) {
        e.preventDefault();
        // 서버에서 삭제시키기
        var id = window.location.pathname.replace("/company/", "");
        var s_cb = function (result) {
            if ( result['response'] === true ) {
                window.location = "/";
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
            pathname:"/remove-company",
            s_cb:s_cb,
            f_cb:f_cb
        });
        return false;
    });
    /* 프롬프트 취소 버튼 클릭 이벤트 */
    $(document).on("click", ".btn-cancel", function (e) {
        e.preventDefault();
        modal(".prompt", "close");
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
});