import { forwardRef } from "react";
import { CameraView } from "expo-camera";

export type CameraHandle = CameraView;

export const CameraPreview = forwardRef<CameraView>(function CameraPreview(_, ref) {
  return <CameraView ref={ref} style={{ flex: 1 }} facing="back" mode="video" videoQuality="720p" mute={false} />;
});
