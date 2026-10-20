import { Text, View } from "react-native";
import { Chip } from "@/components/ui/Chip";

export const PLACE_TAGS = ["앉을 자리", "그늘", "바람 막힘", "뷰", "화장실 가까움"] as const;
export const TIME_TAGS = ["아침", "낮", "해질녘", "밤"] as const;

type Props = { selected: string[]; max: number; onChange: (next: string[]) => void };

export function TagPicker({ selected, max, onChange }: Props) {
  const toggle = (tag: string) => {
    if (selected.includes(tag)) return onChange(selected.filter((t) => t !== tag));
    if (selected.length >= max) return;
    onChange([...selected, tag]);
  };
  const full = selected.length >= max;
  return (
    <View role="group" aria-label="이 자리의 특징" className="gap-2">
      <View className="flex-row justify-between">
        <Text className="font-body text-[13px] font-bold text-muted">이 자리는</Text>
        <Text className="font-body text-[12px] text-[#9A9382]">{selected.length}/{max}</Text>
      </View>
      <View className="flex-row flex-wrap gap-2">
        {PLACE_TAGS.map((t) => <Chip key={t} label={t} selected={selected.includes(t)} onPress={full && !selected.includes(t) ? undefined : () => toggle(t)} />)}
        {TIME_TAGS.map((t) => <Chip key={t} label={t} tone="brown" selected={selected.includes(t)} onPress={full && !selected.includes(t) ? undefined : () => toggle(t)} />)}
      </View>
    </View>
  );
}
