import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Button } from "@/components/ui/Button";

type Props = {
  name: string | null;
  posterUrl: string | null;
  distanceLabel: string;
  onAttach: () => void;
  onNew: () => void;
};

export function NearbyPlaceCard({ name, posterUrl, distanceLabel, onAttach, onNew }: Props) {
  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-3 rounded-btn-card border border-[#D9C4AC] bg-brown-soft p-3">
        <View className="h-[72px] w-12 overflow-hidden rounded-input bg-khaki">
          {posterUrl ? <Image source={{ uri: posterUrl }} style={{ width: 48, height: 72 }} contentFit="cover" accessibilityLabel="지난번 자리 영상" /> : null}
        </View>
        <View className="flex-1 gap-0.5">
          <Text className="font-body text-[15px] font-bold text-ink">{name ?? "이름 없는 자리"}</Text>
          <Text className="font-body text-[12px] text-brown-deep">{distanceLabel} 떨어짐</Text>
        </View>
      </View>
      <Text className="mt-1 text-center font-body text-[13px] text-muted">더하면 이 자리의 영상이 계절별로 쌓여요</Text>
      <View className="gap-2">
        <Button label="같은 자리에 더하기" variant="danger" context="card" onPress={onAttach} />
        <Button label="새 자리로 심기" variant="secondary" context="card" onPress={onNew} />
      </View>
    </View>
  );
}
