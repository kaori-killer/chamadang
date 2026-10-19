const { colors, space, radius } = require("./lib/tokens");

module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: colors.bg,
        surface: colors.surface,
        ink: colors.ink,
        muted: colors.textMuted,
        divider: colors.divider,
        khaki: { DEFAULT: colors.khaki, soft: colors.khakiSoft, deep: colors.khakiDeep },
        brown: { DEFAULT: colors.brown, soft: colors.brownSoft, deep: colors.brownDeep },
        disabled: colors.disabled,
      },
      spacing: { page: `${space.page}px`, card: `${space.card}px`, edge: `${space.mapEdge}px` },
      borderRadius: { card: `${radius.card}px`, btn: `${radius.buttonPage}px`, "btn-card": `${radius.buttonCard}px`, input: `${radius.input}px` },
      fontFamily: { body: ["Pretendard"], title: ["Gaegu"] },
    },
  },
  plugins: [],
};
