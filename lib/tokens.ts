export const colors = {
  bg: "#F4EFE4",
  surface: "#FBF8F1",
  ink: "#1F1D1A",
  textMuted: "#6B5B4A",
  divider: "#DED5C4",
  khaki: "#7A8450",
  khakiSoft: "#DCE6D0",
  khakiDeep: "#2A4A27",
  brown: "#8C5E3C",
  brownSoft: "#EAD9C7",
  brownDeep: "#6E4A2E",
  disabled: "#B9BFA3",
} as const;

export const space = {
  page: 24,
  card: 20,
  mapEdge: 16,
  gapPage: 20,
  gapCard: 12,
  bottomSafe: 50,
} as const;

export const radius = {
  card: 24,
  buttonPage: 16,
  buttonCard: 14,
  input: 12,
  pill: 999,
} as const;

export const size = {
  buttonPage: 54,
  buttonCard: 50,
  buttonTertiary: 44,
  input: 44,
  chip: 40,
  iconButton: 44,
  fab: 84,
  marker: 36,
  markerMine: 40,
  markerSelected: 48,
  thumbCard: { w: 110, h: 165 },
  thumbList: { w: 48, h: 72 },
  thumbSummary: { w: 56, h: 84 },
} as const;

export const text = {
  hero: 40,
  titlePage: 30,
  titleCard: 28,
  body: 15,
  bodySmall: 14,
  chip: 13,
  caption: 12,
} as const;

export const limits = {
  placeName: 16,
  note: 100,
  tea: 10,
  tags: 5,
  clipMs: 1500,
  nearbyMeters: 20,
} as const;

export const fonts = {
  body: "Pretendard",
  title: "Gaegu",
} as const;
