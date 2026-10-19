import { forwardRef, useImperativeHandle } from "react";
import { Text, View } from "react-native";
import type { MapHandle, MapViewProps } from "./types";

export const MapView = forwardRef<MapHandle, MapViewProps>(function MapView({ initialRegion }, ref) {
  useImperativeHandle(ref, () => ({ animateTo: () => {}, getCenter: () => initialRegion.center }));
  return (
    <View role="img" aria-label="지도" className="flex-1 items-center justify-center bg-[#EFE9DA]">
      <Text className="font-body text-muted">웹 지도는 2차에서 붙여요</Text>
    </View>
  );
});
