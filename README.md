# 차마당

차 한 잔 들고 나가서 마시기 좋았던 자리를 1.5초 영상으로 남기는 지도.

## 시작

```sh
cp .env.example .env
npm run setup
```

처음 한 번은 `npm run setup`으로 설치와 iOS 빌드를 함께 해요. 그다음부터는 `npm start`로 개발 서버만 켜면 시뮬레이터의 차마당 앱이 붙어요.

Expo Go는 쓸 수 없어요(네이버맵과 카메라 네이티브 모듈). Expo Go가 SDK를 올리라고 해도 따르지 마세요.

## 폰트

`assets/fonts/`에 Pretendard(OFL)와 Gaegu(OFL)가 들어 있어요.

## Supabase

1. SQL Editor에서 `supabase/migrations/` 파일을 번호 순서대로 실행
2. Authentication > Sign In / Providers > Anonymous Sign-Ins 켜기
3. 계정 연결을 쓰려면 같은 화면에서 Kakao, Apple 제공자 설정
   - Kakao: developers.kakao.com에서 앱 생성 후 REST API 키와 Client Secret을 Supabase에 입력, 카카오 콘솔의 Redirect URI에 Supabase가 보여주는 Callback URL 등록
   - Apple: developer.apple.com에서 Services ID를 만들고 Supabase에 입력
4. Authentication > URL Configuration > Redirect URLs에 `chamadang://auth/callback` 추가

## 네이버 클라우드

Maps에서 Mobile Dynamic Map과 Reverse Geocoding을 켜고, 앱 Bundle ID와 패키지명에 `com.sojeong.chamadang`을 등록해요. Client ID는 `.env`와 `app.json`의 `client_id` 두 곳에 넣어요.

## 구조

```
app/            화면(라우트)만. 상태 로직 없음
components/     props로만 동작. Supabase와 expo 모듈 import 금지
hooks/          lib를 호출해 데이터와 행동을 넘김
lib/native      expo-* 모듈은 여기서만
lib/geo         주소 API는 여기서만
components/map  지도 라이브러리는 여기서만
```
