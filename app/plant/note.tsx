import { ScrollView, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { PlantSummary } from "@/components/plant/PlantSummary";
import { SaveFailed } from "@/components/plant/SaveFailed";
import { SaveProgress } from "@/components/plant/SaveProgress";
import { TagPicker } from "@/components/plant/TagPicker";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import { StepDots } from "@/components/ui/StepDots";
import { TextField } from "@/components/ui/TextField";
import { usePlantFlow } from "@/hooks/usePlantFlow";
import { useSavePlant } from "@/hooks/useSavePlant";
import { useSession } from "@/hooks/useSession";
import { CupIcon } from "@/components/character/CupIcon";
import { colors, limits } from "@/lib/tokens";

export default function PlantNote() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const session = useSession();
  const flow = usePlantFlow();
  const save = useSavePlant();

  if (!flow.clip || !flow.position) { router.replace("/plant/record"); return null; }

  const busy = save.isPending;
  const submit = () => {
    if (!session.data || !flow.clip || !flow.position) return;
    save.mutate(
      {
        userId: session.data.user.id,
        clip: flow.clip,
        attachTo: flow.attachTo,
        tea: flow.note.tea || null,
        note: flow.note.note || null,
        place: {
          lat: flow.position.lat, lng: flow.position.lng,
          name: flow.placeName || null, tags: flow.note.tags, visibility: flow.note.visibility,
          addressShort: flow.address?.short ?? null, addressFull: flow.address?.full ?? null,
        },
      },
      { onSuccess: (placeId) => router.replace({ pathname: "/plant/saved", params: { placeId } }) },
    );
  };

  return (
    <View className="flex-1 bg-surface">
      <View className="flex-row items-center justify-between px-page" style={{ paddingTop: insets.top + 8 }}>
        <IconButton ariaLabel="뒤로" disabled={busy} onPress={() => router.back()} className={busy ? "opacity-40" : ""}>
          <ChevronLeft size={22} color={colors.ink} />
        </IconButton>
        <StepDots total={3} current={2} />
      </View>

      <ScrollView contentContainerClassName="gap-5 px-page pb-6 pt-5" keyboardShouldPersistTaps="handled">
        <View className={busy ? "opacity-50" : ""} pointerEvents={busy ? "none" : "auto"}>
          <View className="gap-5">
            <Heading>이 자리, 어땠어요?</Heading>
            <PlantSummary videoUri={flow.clip.uri} name={flow.placeName || "이름 없는 자리"} address={flow.address?.short ?? "주소 없음"} />
            <TagPicker selected={flow.note.tags} max={limits.tags} onChange={(tags) => flow.setNote({ tags })} />
            <TextField label="마신 차" ariaLabel="마신 차" optional maxLength={limits.tea} value={flow.note.tea} onChangeText={(tea) => flow.setNote({ tea })} placeholder="보이차" />
            <TextField label="한 줄 메모" ariaLabel="한 줄 메모" optional maxLength={limits.note} value={flow.note.note} onChangeText={(note) => flow.setNote({ note })} placeholder="물소리 들으면서 마시기 좋아요" />
            <View className="flex-row items-center justify-between py-1">
              <Text nativeID="private-label" className="font-body text-[14px] text-ink">내 마당에만 두기</Text>
              <Switch
                aria-labelledby="private-label"
                value={flow.note.visibility === "private"}
                onValueChange={(v) => flow.setNote({ visibility: v ? "private" : "public" })}
                trackColor={{ true: colors.brown, false: colors.divider }}
                thumbColor={colors.bg}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-page" style={{ paddingBottom: insets.bottom + 16 }}>
        {busy ? <SaveProgress percent={save.percent} /> : save.isError ? (
          <SaveFailed onRetry={submit} onLater={() => { flow.reset(); router.dismissAll(); }} />
        ) : (
          <Button label="마당에 심기" icon={<CupIcon size={20} />} onPress={submit} disabled={!session.data} />
        )}
      </View>
    </View>
  );
}
