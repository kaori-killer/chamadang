const expoConfig = require("eslint-config-expo/flat");

const nativeModules = ["expo-camera", "expo-location", "expo-haptics", "expo-video-thumbnails"];
const boundary = (patterns, message) => ({ group: patterns, message });

module.exports = [
  ...expoConfig,
  { ignores: ["dist/*", "ios/*", "android/*", ".expo/*"] },
  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "hooks/**/*.{ts,tsx}", "store/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            boundary(nativeModules, "네이티브 모듈은 lib/native 안에서만 import하세요."),
            boundary(["@mj-studio/react-native-naver-map"], "지도 라이브러리는 components/map 안에서만 import하세요."),
          ],
        },
      ],
    },
  },
  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            boundary(nativeModules, "네이티브 모듈은 lib/native 안에서만 import하세요."),
            boundary(["@mj-studio/react-native-naver-map"], "지도 라이브러리는 components/map 안에서만 import하세요."),
            boundary(["@/lib/supabase/*", "@supabase/supabase-js"], "Supabase는 hooks/ 또는 lib/ 안에서만 호출하세요."),
          ],
        },
      ],
    },
  },
  {
    files: ["components/map/**/*.{ts,tsx}", "components/camera/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": "off" },
  },
];
