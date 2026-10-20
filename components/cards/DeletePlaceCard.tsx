import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { SheetCard } from "./SheetCard";
import type { PlaceRow } from "@/lib/types";

type Props = { place: PlaceRow | null; posterUrl: string | null; busy: boolean; onConfirm: () => void; onCancel: () => void };

export function DeletePlaceCard({ place, posterUrl, busy, onConfirm, onCancel }: Props) {
  return (
    <SheetCard visible={!!place} ariaLabel="자리 삭제 확인" onDismiss={onCancel}>
      <View className="gap-3">
        <Heading level="card">이 자리를 지울까요?</Heading>
        <View className="flex-row items-center gap-3 rounded-btn-card border border-divider bg-bg p-3">
          <View className="h-[72px] w-12 overflow-hidden rounded-input bg-khaki">
            {posterUrl ? <Image source={{ uri: posterUrl }} style={{ width: 48, height: 72 }} contentFit="cover" /> : null}
          </View>
          <View className="flex-1 gap-0.5">
            <Text className="font-body text-[15px] font-bold text-ink" numberOfLines={1}>{place?.name ?? "이름 없는 자리"}</Text>
            <Text className="font-body text-[12px] text-muted">영상 {place?.clip_count ?? 0}개, 함께 지워져요</Text>
          </View>
        </View>
        <View className="flex-row gap-2.5">
          <Button label="남겨둘게요" variant="secondary" context="card" className="flex-1" onPress={onCancel} disabled={busy} />
          <Button label="지우기" variant="danger" context="card" className="flex-1" onPress={onConfirm} disabled={busy} />
        </View>
      </View>
    </SheetCard>
  );
}
