/* 정규식 */
const specialCharacterRegex = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim;
const nameRegex = /^[가-힣|a-z|A-Z|]+$/;
const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
const idRegex = /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){4,}$/;
const passwordNumberRegex = /[0-9]/g;
const passwordEnglishRegex = /[a-z]/ig;
const passwordSpecialCharacterRegex = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi;
const emailRegex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
let blurMessages = ["현재 아이디를 입력해주세요.","현재 비밀번호를 입력하세요.", "10자 이상 입력", "동일한 비밀번호를 입력해주세요.", "이름을 입력하세요.", "이메일을 입력하세요.", "휴대폰 번호를 입력하세요."];
let regexMessages = ["현재 아이디를 입력해주세요.", "현재 비밀번호를 입력하세요.", "영문 혹은 영문과 숫자를 조합하여 4자~20자로 입력해주세요.", "동일한 비밀번호를 입력해주세요", "영문 혹은 한글로 2자~20자로 입력해주세요.", "이메일 주소를 확인해주세요.", "휴대폰 번호를 확인하세요."];
//아이디, 비밀번호, 새비밀번호, 비밀번호 확인, 이름, 이메일, 휴대폰

const $wrapperInputs = $('input[type=text], input[type=password]');
console.log($wrapperInputs);
const $errorMessage = $('div.errorDiv p.errorMessage');
let errorCheck;
let errorCheckAll = [false, false, false, false, false, false];
const $errorDiv = $('div.errorDiv');
$wrapperInputs.on("blur", function () {
    let i = $wrapperInputs.index($(this));
    let value = $(this).val();

    if (!value) {
        $errorDiv.eq(i).css("display", "block");
        $errorMessage.eq(i).text(blurMessages[i]);
        errorCheck = false;
        errorCheckAll[i] = errorCheck;
        return;
    }else{
        $errorDiv.eq(i).css("display", "none");
    }
    switch (i) {
        case 0: // 아이디
            errorCheck = value.length > 3 && value.length < 21 && idRegex.test(value) && !specialCharacterRegex.test(value);
            break;
        case 1: // 현재 비밀번호

            // 로그인상태로 수정하는것이기 때문에 DB의 비밀번호랑 비교 해야 될것 같음
            let numberCheck = value.search(passwordNumberRegex);
            let englishCheck = value.search(passwordEnglishRegex);
            let specialCharacterCheck = value.search(passwordSpecialCharacterRegex);

            var condition1 = (numberCheck >= 0 && englishCheck >= 0) && (englishCheck >= 0 && specialCharacterCheck >= 0) && (specialCharacterCheck >= 0 && numberCheck >= 0)
            var condition2 = value.length > 9 && value.length < 21;
            var condition3 = value.search(/\s/) < 0;

            errorCheck = condition1 && condition2 && condition3;
            break;
        case 2: //새 비밀번호
            let numbercheck = value.search(passwordNumberRegex);
            let englishcheck = value.search(passwordEnglishRegex);
            let specialcharacterCheck = value.search(passwordSpecialCharacterRegex);

            var condition4 = (numbercheck >= 0 && englishcheck >= 0) && (englishcheck >= 0 && specialcharacterCheck >= 0) && (specialcharacterCheck >= 0 && numbercheck >= 0)
            var condition5 = value.length > 9 && value.length < 21;
            var condition6 = value.search(/\s/) < 0;

            errorCheck = condition4 && condition5 && condition6;
            break;
        case 3: // 새 비밀번호 확인
            errorCheck = $wrapperInputs.eq(i - 1).val() == value;
            break;
        case 4: // 이름
            errorCheck = value.length > 1 && value.length < 21 && nameRegex.test(value) && !specialCharacterRegex.test(value);
            break;
        case 5: // 이메일
            errorCheck = emailRegex.test(value);
            break;
        case 6: // 휴대폰
            errorCheck = phoneRegex.test(value);
            if (errorCheck) {
                $(this).val(value.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`));
            }
            break;
    }
    errorCheckAll[i] = errorCheck;

    if (!errorCheck) {
        $errorDiv.eq(i).css("display", "block");
        $errorMessage.eq(i).text(regexMessages[i]);
        return;
    }else{
        $errorDiv.eq(i).css("display", "none");
    }
    $errorMessage.eq(i).text("");
    
});

/* 이메일 중복확인 모달--------------------- */
const emailbtn = document.querySelector(".amend-inputBox-right-btn");
const emailcontainer = document.querySelector(".emailmodal");
const emailclose = document.querySelector(".emailclose");

//모달창 열기
emailbtn.addEventListener("click", function(){
    emailcontainer.style.display="block";
});

//모달창 닫기
emailclose.addEventListener("click", function(){
    emailcontainer.style.display="none";
});

/* 휴대폰 다른번호 인증 모달---------------- */
const phonebtn = document.querySelector(".phoneBtn");
const phonecontainer = document.querySelector(".phonemodal");
const phoneclose = document.querySelector(".phoneclose");

//모달창 열기
phonebtn.addEventListener("click", function(){
    phonecontainer.style.display="block";
});

//모달창 닫기
phoneclose.addEventListener("click", function(){
    phonecontainer.style.display="none";
});


/* 회원정보 수정 모달----------------------- */
const infobtn = document.querySelector(".amend-btn");
const infocontainer = document.querySelector(".infomodal");
const infoclose = document.querySelector(".infocheck");

//모달창 열기
infobtn.addEventListener("click", function(){
    infocontainer.style.display="block";
});

//모달창 닫기
infoclose.addEventListener("click", function(){
    infocontainer.style.display="none";
});


// 동의 버튼 효과
const $checkboxes = $('.termCheckBox');
const $path = $('.path1');
const $all = $('.allCheck');
const $checks = $('.checked');
$checkboxes.each((i,e)=>{
    $(e).parent().on('click', function(){
        var $ischecked = $(e).is(':checked');
        if($ischecked){
            // $path.eq(i).attr('fill', '#5f0080');
            $path.eq(i).attr('fill', '#fff');
            $(e).prop('checked', false);
        }else{
            // $path.eq(i).attr('fill', '#fff');
            $path.eq(i).attr('fill', '#5f0080');
            $(e).prop('checked', true);
            
        }
    });
});
// 전체동의 버튼 효과
$all.on("click", function(){
    var $checked = $('#RequiredTermCondition').prop("checked");
    console.log($checked);
    if($checked) {
        $path.attr('fill', '#fff');
        $('#TermsAgreeAll').prop('checked', false);
        $checks.children().prop('checked', false);
    } else {
        $path.attr('fill', '#5f0080');
        $('#TermsAgreeAll').prop('checked', true);
        $checks.children().prop('checked', true);
  
    }
});
// 동의 버튼 전체 확인 시 전체동의도 확인 효과, 필수사항 동의 시 submit 버튼 활성화
$checks.on('click', function(){
    var agreeCheck = [false, false];

    if($checks.children().filter(":checked").length == 2) {
        
        $('.allPath').attr('fill', '#5f0080');
        $('#TermsAgreeAll').prop('checked', false);
    } else {
        
        $('.allPath').attr('fill', '#fff');
        $('#TermsAgreeAll').prop('checked', true);
    }
});



/* 성별 버튼 */
function clickRadio() {
    const $sizes = $('input[name=size]');

    const $count = $sizes.length;

    const $checkboxes = $('span.checkBox');
    const $checkboxes2 = $('div.checkBox2');

    for (let i = 0; i < $count; i++) {
        if ($sizes[i].checked) {
            console.log('들어옴');
            console.log($sizes[i]);
            $checkboxes[i].classList.add('radioSpanClick');
            $checkboxes2[i].classList.add('radioBoxDivClick');
        } else {
            $checkboxes[i].classList.remove('radioSpanClick');
            $checkboxes2[i].classList.remove('radioBoxDivClick');
        }
    }
}