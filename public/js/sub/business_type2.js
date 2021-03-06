var business_type = function () {
    var array = [
        "편의점",
        "백화점",
        "아웃렛",
        "유통점·마트",
        "휴대폰·가전",
        "의류·잡화",
        "뷰티·헬스",
        "서점·팬시",
        "가구·침구",
        "약국",
        "면세점",
        "생활용품",
        "일반음식점",
        "레스토랑",
        "호프·주점",
        "카페·디저트",
        "찜질방·스파",
        "베이커리",
        "노래방",
        "PC방·멀티방",
        "숙박·호텔",
        "문화·여가",
        "오락실",
        "만화방",
        "당구·스포츠",
        "스크린골프",
        "키즈카페",
        "테마카페",
        "스터디룸",
        "독서실",
        "고시원",
        "공연",
        "극장·전시",
        "화훼·꽃집",
        "전시·컨벤션",
        "세미나",
        "농축수산",
        "바",
        "자동차용품",
        "주얼리·악세사리",
        "카운터·캐셔",
        "피트니스",

        "한식",
        "중식",
        "이탈리안",
        "패스트푸드점",
        "치킨·피자",
        "분식",
        "일식",
        "디저트",
        "커피",
        "베이커리",
        "아이스크림",
        "도넛·떡",
        "횟집",
        "아시안",
        "도시락·반찬",

        "주방찬모",
        "주방보조",
        "설거지",
        "조리사",
        "호텔·리조트",

        "택배·퀵",
        "운송·이사",
        "화물·중장비",
        "주차관리",
        "수행기사",
        "대리운전",
        "운전",
        "택시운전",
        "버스운전",
        "배달대행",
        "음식배달",

        "바이럴마케팅",
        "SNS마케팅",
        "마케팅·홍보",
        "인바운딩",
        "텔레마케터",
        "고객상담",
        "편집·교정",
        "번역·통역",
        "비서",
        "인사·총무",
        "경리·회계",
        "교육·강사",
        "보조교사",
        "방문·학습지",
        "영업·세일즈",
        "영업지원",
        "리서치",
        "설문조사",
        "자료조사",
        "문서작성",
        "복사·출력",
        "IT·컴퓨터",
        "디자인",
        "MD",
        "QA테스터",
        "부동산",
        "신문·출판",

        "포장·조립",
        "생산·제조",
        "전단지",
        "공사·건설",
        "주유·세차",
        "정비·설치",
        "PVC",
        "창고관리",
        "입출고관리",
        "보안·경비",
        "이벤트·행사",
        "모델",
        "촬영·편집",
        "방송스텝",
        "방청",
        "보조출연",
        "조명·음향",
        "청소·미화",
        "헤어·미용",
        "품질검사",
        "도우미",
        "상하차",
        "소화물분류",
        "골프캐디",
        "공인중개",
        "간호조무사",
        "간호사",
        "요양보호사",
        "원무",
        "코디네이터",
        "연구보조",
        "실험보조",
        "임상시험",
        "안내데스크",
        "반려동물케어",
        "렌탈·A/S",
        "트레이너",
        "관리사",
        "판촉도우미",
        "체육관사범",
        "목수",
        "헤어디자이너",
        "인테리어"
    ];
    array.sort();
    array.unshift("기타");

    return array;
};
