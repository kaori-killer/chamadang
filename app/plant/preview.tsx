import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useVideoPlayer, VideoView } from "expo-video";
import { RotateCcw, X } from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { usePlantFlow } from "@/hooks/usePlantFlow";
import { colors } from "@/lib/tokens";

export default function PlantPreview() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const clip = usePlantFlow((s) => s.clip);
  const player = useVideoPlayer(clip?.uri ?? null, (p) => { p.loop = true; p.muted = true; p.play(); });

  if (!clip) { router.replace("/plant/record"); return null; }

  return (
    <View className="flex-1 bg-[#2F3720]">
      <VideoView player={player} style={{ flex: 1 }} contentFit="cover" nativeControls={false} />
      <View className="absolute inset-x-0 flex-row items-center justify-between px-edge" style={{ top: insets.top + 8 }}>
        <IconButton ariaLabel="닫기" tone="dark" onPress={() => { usePlantFlow.getState().reset(); router.dismissAll(); }}><X size={20} color={colors.bg} /></IconButton>
        <View className="rounded-full bg-ink/40 px-3 py-2"><Text className="font-body text-[13px] font-bold text-bg">1.5초 · 반복 재생</Text></View>
      </View>
      <View className="absolute inset-x-0 items-center gap-4 px-page" style={{ bottom: insets.bottom + 50 }}>
        <Text className="font-title text-[26px] text-bg">이 순간, 괜찮아요?</Text>
        <View className="w-full flex-row gap-2.5">
          <Button label="다시 찍기" variant="secondary" className="flex-1 bg-bg/15 border-bg/60" labelClassName="text-bg" icon={<RotateCcw size={18} color={colors.bg} />} onPress={() => router.back()} />
          <Button label="이걸로 할게요" variant="secondary" className="flex-1" onPress={() => router.push("/plant/locate")} />
        </View>
        <Text className="font-body text-[13px] text-bg/75">탭하면 소리가 나요</Text>
      </View>
    </View>
  );
}
