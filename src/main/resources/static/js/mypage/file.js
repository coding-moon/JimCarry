/* ===================================================================================== */
/* ===================================================================================== */

globalThis.uuids;
FileList.prototype.forEach = Array.prototype.forEach;
let prevFileList;

/* 저장할 파일들의 Array */


const $photoPicker = $("#photo-picker");
const uploadAjaxConfig = (data) => {
    return {
        url: "/users/mypage/files/upload",
        method: "POST",
        data: data,
        contentType: false,
        processData: false
    }
}

$photoPicker.on("change", function () {
    let $files = $(this)[0].files;
    let formData = new FormData();

    if($files.length > 8){
        alert("등록할 수 있는 파일의 최대 갯수는 8개 입니다.");
        /* 파일 input 초기화 */
        $photoPicker[0].files = prevFileList;
        console.log($photoPicker[0].files);
        return;
    }

    prevFileList = $files;
    $files.forEach(file => formData.append("file", file));

    doAjax(uploadAjaxConfig(formData), (result) => {
        console.log(result)
        globalThis.uuids = result.uuids;
        $thumbnailWrap.empty();
        result.paths.forEach((path, i) => {
            if ($files[i].type.startsWith("image")) {
                $thumbnailWrap.append(`<!--<a href="/files/download">--><img class="imageThumbnail" src="/users/mypage/files/display?fileName=${result.paths[i]}"><!--</a>-->`);
            } else $thumbnailWrap.append(`<!--<a>--><img style="width: 100px"/><!--</a>-->`);
        });
    });
});

let $fileAjax = () => {
    const $files = $photoPicker[0].files;

    if($files.length === 0){
        return;
    }

    fileVOs = new Array();

    $files.forEach((file, i) => {
        let fileVO = new Object();
        fileVO.fileOrgName = file.name;
        fileVO.fileUuid = globalThis.uuids[i];
        fileVO.inquiryId = inquiries[inquiryIndex].inquiryId
        fileVOs.push(fileVO);
    });

    let config = {
        url: `/users/mypage/files/save`,
        method: "POST",
        data: JSON.stringify(fileVOs),
        contentType: "application/json; charset=utf-8",
    }

    doAjax(config, (result) => {});
}

$(".change-modal-ok-btn").on("click", function () {
    $fileAjax();

    console.log($textarea.eq(inquiryIndex).val());

    $("input[name='inquiryTitle']").val($textareaTitle.val());
    $("input[name='inquiryContent']").val($textarea.val());
    $("input[name='inquiryId']").val(inquiries[inquiryIndex].inquiryId);
    $("input[name='inquiryAnswer']").val(inquiries[inquiryIndex].inquiryAnswer);
    $("input[name='page']").val($page);

    $(".change-modal-form-wrapper").submit();
});