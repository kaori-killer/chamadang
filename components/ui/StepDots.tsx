import { View } from "react-native";

type Props = { total: number; current: number; tone?: "light" | "dark" };

export function StepDots({ total, current, tone = "light" }: Props) {
  const on = tone === "light" ? "bg-khaki" : "bg-bg";
  const off = tone === "light" ? "bg-divider" : "bg-bg/40";
  return (
    <View
      role="progressbar"
      aria-label={`${total}단계 중 ${current + 1}단계`}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      className={`min-h-[32px] flex-row items-center gap-1.5 rounded-full px-3 ${tone === "light" ? "bg-bg" : "bg-ink/40"}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <View key={i} className={`h-2 w-2 rounded-full ${i === current ? on : off}`} />
      ))}
    </View>
  );
}
