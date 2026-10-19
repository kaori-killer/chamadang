import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { CameraView } from "expo-camera";
import { recordClip, stopRecording, type RecordedClip } from "@/lib/native/camera";
import { tap, warning } from "@/lib/native/haptics";
import { RecordButton } from "./RecordButton";

type Props = { onRecorded: (clip: RecordedClip) => void };

export function Recorder({ onRecorded }: Props) {
  const camera = useRef<CameraView>(null);
  const [recording, setRecording] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const releasedEarly = useRef(false);

  const start = async () => {
    if (!camera.current || recording) return;
    releasedEarly.current = false;
    setCancelled(false);
    setRecording(true);
    tap();
    try {
      const clip = await recordClip(camera.current);
      if (!releasedEarly.current) onRecorded(clip);
    } catch {
      setCancelled(true);
    } finally {
      setRecording(false);
    }
  };

  const cancel = () => {
    if (!recording || !camera.current) return;
    releasedEarly.current = true;
    stopRecording(camera.current);
    setCancelled(true);
    warning();
  };

  return (
    <View className="flex-1">
      <CameraView ref={camera} style={{ flex: 1 }} facing="back" mode="video" videoQuality="720p" mute={false} />
      <View className="absolute inset-x-0 bottom-0 items-center gap-4 pb-12">
        <Text role="status" aria-live="polite" className="font-title text-[26px] text-bg">
          {recording ? "담는 중…" : cancelled ? "손을 떼면 다시 찍어요" : "꾹 누르면 1.5초 담겨요"}
        </Text>
        <RecordButton recording={recording} onStart={start} onCancel={cancel} />
        <Text className="font-body text-[13px] text-bg/80">소리도 같이 담겨요</Text>
      </View>
    </View>
  );
}
