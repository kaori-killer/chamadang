import { Pressable, Text, View } from "react-native";
import type { MapMode } from "@/store/ui";

type Props = { mode: MapMode; onChange: (m: MapMode) => void };

const items: { key: MapMode; label: string }[] = [
  { key: "all", label: "모두의 마당" },
  { key: "mine", label: "내 마당" },
];

export function ModeToggle({ mode, onChange }: Props) {
  return (
    <View role="radiogroup" aria-label="마당 보기 범위" className="flex-row rounded-full bg-bg p-1 shadow-sm">
      {items.map((it) => {
        const on = it.key === mode;
        const onBg = it.key === "mine" ? "bg-brown" : "bg-khaki";
        return (
          <Pressable
            key={it.key}
            role="radio"
            aria-checked={on}
            aria-label={it.label}
            onPress={() => onChange(it.key)}
            className={`min-h-[36px] justify-center rounded-full px-2.5 ${on ? onBg : ""}`}
          >
            <Text className={`font-body text-[12px] ${on ? "font-bold text-bg" : "font-medium text-muted"}`}>{it.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
