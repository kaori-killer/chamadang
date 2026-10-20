import { Text, View } from "react-native";

type Props = { percent: number };

export function SaveProgress({ percent }: Props) {
  return (
    <View className="gap-2.5">
      <View
        role="progressbar"
        aria-label="심는 중"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="relative min-h-[54px] items-center justify-center overflow-hidden rounded-btn bg-khaki-soft"
      >
        <View className="absolute bottom-0 left-0 top-0 bg-khaki" style={{ width: `${percent}%` }} />
        <Text className="font-title text-[20px] text-ink">심는 중… {percent}%</Text>
      </View>
      <Text className="text-center font-body text-[12px] text-muted">잠깐이면 돼요</Text>
    </View>
  );
}
