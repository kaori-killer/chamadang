import { Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "@/lib/tokens";

type Props = { onPress: () => void; disabled?: boolean; caption: string };

export function PlantFab({ onPress, disabled, caption }: Props) {
  return (
    <View className="items-center gap-3.5">
      <Pressable
        role="button"
        aria-label="자리 심기"
        aria-disabled={disabled ?? false}
        disabled={disabled}
        onPress={onPress}
        className={`h-[84px] w-[84px] items-center justify-center rounded-full border-4 border-bg ${disabled ? "bg-disabled" : "bg-khaki shadow-lg active:opacity-90"}`}
      >
        <Svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke={colors.bg} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M5 10 C 5 16, 8 19, 12 19 C 16 19, 19 16, 19 10 Z" />
          <Path d="M4 10 L 20 10" />
          <Path d="M12 3 V7 M10 5 H14" />
        </Svg>
      </Pressable>
      <Text className="font-title text-[16px] text-muted">{caption}</Text>
    </View>
  );
}
