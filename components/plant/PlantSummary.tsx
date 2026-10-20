import { Text, View } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

type Props = { videoUri: string; name: string; address: string };

export function PlantSummary({ videoUri, name, address }: Props) {
  const player = useVideoPlayer(videoUri, (p) => { p.loop = true; p.muted = true; p.play(); });
  return (
    <View className="flex-row items-center gap-3.5 rounded-btn border border-divider bg-bg p-3">
      <View className="h-[84px] w-14 overflow-hidden rounded-input bg-khaki">
        <VideoView player={player} style={{ width: 56, height: 84 }} contentFit="cover" nativeControls={false} />
      </View>
      <View className="flex-1 gap-1">
        <Text className="font-body text-[15px] font-bold text-ink">{name}</Text>
        <Text className="font-body text-[12px] text-muted">{address}</Text>
      </View>
    </View>
  );
}
