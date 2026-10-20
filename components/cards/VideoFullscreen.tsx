import { Modal, Pressable, View } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton } from "@/components/ui/IconButton";
import { colors } from "@/lib/tokens";

type Props = { videoUrl: string | null; onClose: () => void };

export function VideoFullscreen({ videoUrl, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const player = useVideoPlayer(videoUrl, (p) => { p.loop = true; p.muted = false; p.play(); });
  return (
    <Modal visible={!!videoUrl} animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View className="flex-1 bg-ink">
        <Pressable aria-label="소리 켜고 끄기" onPress={() => { player.muted = !player.muted; }} className="flex-1">
          <VideoView player={player} style={{ flex: 1 }} contentFit="cover" nativeControls={false} />
        </Pressable>
        <View className="absolute left-edge" style={{ top: insets.top + 8 }}>
          <IconButton ariaLabel="닫기" tone="dark" onPress={onClose}><X size={20} color={colors.bg} /></IconButton>
        </View>
      </View>
    </Modal>
  );
}
