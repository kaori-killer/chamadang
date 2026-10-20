import { Pressable, Text, View } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { Maximize2 } from "lucide-react-native";
import { colors } from "@/lib/tokens";

type Props = { videoUrl: string; label: string; width: number; height: number; onExpand?: () => void; autoplay?: boolean };

export function ClipThumb({ videoUrl, label, width, height, onExpand, autoplay = true }: Props) {
  const player = useVideoPlayer(videoUrl, (p) => { p.loop = true; p.muted = true; if (autoplay) p.play(); });
  return (
    <View style={{ width, height }} className="overflow-hidden rounded-btn-card bg-khaki">
      <VideoView player={player} style={{ width, height }} contentFit="cover" nativeControls={false} />
      <Text className="absolute bottom-2 left-2 rounded-full bg-ink/45 px-2 py-1 font-body text-[11px] font-bold text-bg">{label}</Text>
      {onExpand ? (
        <Pressable role="button" aria-label="영상 전체 화면" onPress={onExpand} hitSlop={8} className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-ink/30">
          <Maximize2 size={16} color={colors.bg} />
        </Pressable>
      ) : null}
    </View>
  );
}
