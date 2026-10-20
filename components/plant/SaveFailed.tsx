import { Text, View } from "react-native";
import { CircleAlert } from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/tokens";

type Props = { onRetry: () => void; onLater: () => void };

export function SaveFailed({ onRetry, onLater }: Props) {
  return (
    <View className="gap-3">
      <View role="alert" className="flex-row items-center gap-3 rounded-btn-card border border-[#D9C4AC] bg-brown-soft p-3.5">
        <CircleAlert size={22} color={colors.brownDeep} />
        <View className="flex-1 gap-0.5">
          <Text className="font-body text-[14px] font-bold text-ink">아직 못 심었어요</Text>
          <Text className="font-body text-[12px] text-brown-deep">영상은 폰에 안전하게 있어요</Text>
        </View>
      </View>
      <View className="flex-row gap-2.5">
        <Button label="나중에 올리기" variant="secondary" context="card" className="flex-1" onPress={onLater} />
        <Button label="다시 시도" context="card" className="flex-1" onPress={onRetry} />
      </View>
      <Text className="text-center font-body text-[12px] text-muted">연결되면 자동으로 심어요</Text>
    </View>
  );
}
