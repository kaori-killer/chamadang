export type LegalDoc = { title: string; effective: string; sections: { heading: string; body: string }[] };

export const terms: LegalDoc = {
  title: "이용약관",
  effective: "시행일 미정",
  sections: [
    { heading: "1. 차마당은 이런 서비스예요", body: "차 한 잔 들고 나가서 마시기 좋았던 자리를 1.5초 영상으로 남기고, 다른 사람의 자리를 둘러보는 지도예요." },
    { heading: "2. 올린 영상과 자리는", body: "올린 사람에게 권리가 있어요. 차마당은 지도에 보여주기 위해서만 저장하고 전송해요. 공개로 심은 자리는 모두에게 보여요." },
    { heading: "3. 이런 건 올리면 안 돼요", body: "다른 사람의 얼굴이나 집이 알아볼 수 있게 찍힌 영상, 불쾌하거나 위험한 내용. 신고가 들어오면 확인 후 내릴 수 있어요." },
    { heading: "4. 계정과 삭제", body: "처음엔 익명 계정으로 시작해요. 계정을 연결하면 다른 폰에서도 이어져요. 계정을 지우면 자리와 영상이 모두 사라지고 되돌릴 수 없어요." },
  ],
};

export const privacy: LegalDoc = {
  title: "개인정보처리방침",
  effective: "시행일 미정",
  sections: [
    { heading: "1. 모으는 것", body: "자리를 심을 때의 위치, 1.5초 영상과 소리, 자리 이름과 메모. 계정을 연결하면 카카오 또는 Apple이 주는 계정 식별자." },
    { heading: "2. 쓰는 곳", body: "지도에 자리를 보여주고, 내 마당을 다른 폰에서 이어 보여주는 데만 써요. 광고나 다른 목적에는 쓰지 않아요." },
    { heading: "3. 보관과 삭제", body: "자리를 지우면 영상도 함께 지워져요. 계정을 지우면 모든 데이터가 즉시 삭제돼요." },
    { heading: "4. 위탁", body: "데이터는 Supabase(서울 리전)에 저장돼요. 지도와 주소는 네이버 클라우드 플랫폼을 통해 표시해요." },
  ],
};
