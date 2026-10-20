import { Text, View } from "react-native";
import { CupIcon } from "@/components/character/CupIcon";

type Props = { label: string; loading?: boolean };

export function CenterPin({ label, loading }: Props) {
  return (
    <View pointerEvents="none" className="absolute inset-0 items-center justify-center">
      <View className="-mt-16 items-center gap-2.5">
        <View className="relative max-w-[260px] rounded-input bg-ink px-3.5 py-2.5">
          <Text role="status" aria-live="polite" className="text-center font-body text-[13px] font-bold leading-5 text-bg">
            {loading ? "주소 찾는 중…" : label}
          </Text>
          <View className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1.5 rotate-45 bg-ink" />
        </View>
        <View className="h-12 w-12 items-center justify-center rounded-full border-[3px] border-bg bg-brown shadow-md">
          <CupIcon size={24} />
        </View>
        <View className="-mt-2 h-2.5 w-2.5 rounded-full bg-ink/25" />
      </View>
    </View>
  );
}
