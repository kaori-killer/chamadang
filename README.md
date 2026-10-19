# 차마당

차 한 잔 들고 나가서 마시기 좋았던 자리를 1.5초 영상으로 남기는 지도.

## 시작

```sh
npm install
cp .env.example .env
npx expo prebuild
npx expo run:ios
```

Expo Go는 쓸 수 없어요(네이버맵과 카메라 네이티브 모듈). development build로만 돌아가요.

## 폰트

`assets/fonts/`에 두 파일을 넣어주세요.
- `PretendardVariable.ttf` — https://github.com/orioncactus/pretendard
- `Gaegu-Bold.ttf` — https://fonts.google.com/specimen/Gaegu

## Supabase

`supabase/migrations/0001_init.sql`을 SQL Editor에서 실행하고, Authentication에서 Anonymous sign-ins를 켜주세요.

## 구조

```
app/            화면(라우트)만. 상태 로직 없음
components/     props로만 동작. Supabase와 expo 모듈 import 금지
hooks/          lib를 호출해 데이터와 행동을 넘김
lib/native      expo-* 모듈은 여기서만
lib/geo         주소 API는 여기서만
components/map  지도 라이브러리는 여기서만
```
