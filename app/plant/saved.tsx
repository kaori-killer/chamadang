import { Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Gaiwan } from "@/components/character/Gaiwan";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { usePlantFlow } from "@/hooks/usePlantFlow";
import { useUi } from "@/store/ui";

export default function PlantSaved() {
  const router = useRouter();
  const { placeId } = useLocalSearchParams<{ placeId: string }>();
  const name = usePlantFlow((s) => s.placeName);
  const address = usePlantFlow((s) => s.address);
  const openCard = useUi((s) => s.openCard);

  const finish = (open: boolean) => {
    usePlantFlow.getState().reset();
    if (open && placeId) openCard(placeId);
    router.dismissAll();
  };

  return (
    <View className="flex-1 items-center justify-center bg-ink/35 px-8">
      <View role="dialog" aria-label="저장 완료" className="w-full items-center gap-4 rounded-card bg-surface px-6 pb-6 pt-7 shadow-xl">
        <View className="h-[140px] w-[140px] items-center justify-center"><Gaiwan size={140} /></View>
        <Heading className="text-center text-[32px]">마당에 심었어요</Heading>
        <Text className="text-center font-body text-[14px] leading-6 text-muted">{name || "이름 없는 자리"}{"\n"}{address?.short ?? ""}</Text>
        <Button label="자리 보기" context="card" className="mt-1 w-full" onPress={() => finish(true)} />
        <Button label="지도로" variant="tertiary" className="border-0 bg-transparent" onPress={() => finish(false)} />
      </View>
    </View>
  );
}
