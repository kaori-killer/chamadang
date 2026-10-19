import { Pressable, Text } from "react-native";

type Tone = "khaki" | "brown";

type Props = {
  label: string;
  selected?: boolean;
  tone?: Tone;
  onPress?: () => void;
};

export function Chip({ label, selected = false, tone = "khaki", onPress }: Props) {
  const selectedBg = tone === "khaki" ? "bg-khaki" : "bg-brown";
  const staticBg = tone === "khaki" ? "bg-khaki-soft" : "bg-brown-soft";
  const staticFg = tone === "khaki" ? "text-khaki-deep" : "text-brown-deep";
  if (!onPress) {
    return (
      <Text className={`${staticBg} ${staticFg} rounded-full px-3 py-2 font-body text-[13px] font-medium`}>{label}</Text>
    );
  }
  return (
    <Pressable
      role="checkbox"
      aria-checked={selected}
      aria-label={label}
      onPress={onPress}
      className={`min-h-[40px] justify-center rounded-full px-3 ${selected ? selectedBg : "bg-bg border border-divider"}`}
    >
      <Text className={`font-body text-[13px] font-medium ${selected ? "text-bg" : "text-ink"}`}>{label}</Text>
    </Pressable>
  );
}
