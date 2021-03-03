$(document).ready(function() {
    $(document).on('click', '.change-logo', function (e) {
        e.preventDefault();
        $('#upload-logo').val("");
        document.getElementById('upload-logo').click();
        return false;
    });
    $("#upload-logo").change(function (e) {
        var file = $('input[type=file]#upload-logo')[0].files[0];
        if (!$('#upload-logo').val().match(/.(jpg|jpeg|png|gif)$/i)) {
            console.log("jpg/jpeg, png, gif만 업로드할 수 있습니다.");
            return false;
        }
        if (file["size"] > 5242880) {
            console.log("이미지는 5MB 이하만 업로드하세요.");
            return false;
        }
        $("#upload-logo-form").trigger("submit");
    });
    $('iframe#upload-logo-iframe').load(function() {
        var iframe = document.getElementById("upload-logo-iframe");
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        var target, result;
        target = doc.getElementById("result-inserting-logo");
        if (target) {
            result = target.innerHTML;
            result = JSON.parse(result);
            if (result['result'] === false) {
                if (result['reason'] === 'server_error') {
                    console.log("서버 에러가 발생하였습니다. 다시 시도해주세요.");
                } else {
                    console.log("이미지는 5MB 이하만 업로드하세요.");
                }
                return false;
            } else {
                // $("#profile-img").attr("src", result.img);
                console.log("이미지가 성공적으로 업로드 되었습니다.");
                console.log(result.path);
            }
        } else {
            console.log("이미지는 5MB 이하만 업로드하세요.");
            return false;
        }
    });
});