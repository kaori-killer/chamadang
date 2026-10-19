import { forwardRef, useImperativeHandle, useRef } from "react";
import { NaverMapView, NaverMapMarkerOverlay, type NaverMapViewRef } from "@mj-studio/react-native-naver-map";
import { colors } from "@/lib/tokens";
import type { MapHandle, MapViewProps } from "./types";
import { PlaceMarker } from "./PlaceMarker";

export const MapView = forwardRef<MapHandle, MapViewProps>(function MapView(
  { initialRegion, markers, onMarkerPress, onMapPress, onRegionChangeIdle, showsUserLocation = true, bottomInset = 0 },
  ref,
) {
  const mapRef = useRef<NaverMapViewRef>(null);
  const center = useRef(initialRegion.center);

  useImperativeHandle(ref, () => ({
    animateTo: (c, zoom) => mapRef.current?.animateCameraTo({ latitude: c.lat, longitude: c.lng, zoom: zoom ?? initialRegion.zoom }),
    getCenter: () => center.current,
  }));

  return (
    <NaverMapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialCamera={{ latitude: initialRegion.center.lat, longitude: initialRegion.center.lng, zoom: initialRegion.zoom }}
      isShowLocationButton={false}
      isShowZoomControls={false}
      isShowScaleBar={false}
      logoAlign="BottomLeft"
      logoMargin={{ bottom: bottomInset + 8, left: 16 }}
      mapPadding={{ bottom: bottomInset }}
      locale="ko"
      isNightModeEnabled={false}
      onTapMap={onMapPress}
      onCameraIdle={(e) => {
        center.current = { lat: e.latitude, lng: e.longitude };
        onRegionChangeIdle?.(
          { center: center.current, zoom: e.zoom ?? initialRegion.zoom },
          { sw: { lat: e.region.latitude, lng: e.region.longitude }, ne: { lat: e.region.latitude + e.region.latitudeDelta, lng: e.region.longitude + e.region.longitudeDelta } },
        );
      }}
    >
      {markers.map((m) => (
        <NaverMapMarkerOverlay
          key={m.id}
          latitude={m.position.lat}
          longitude={m.position.lng}
          anchor={{ x: 0.5, y: 0.5 }}
          width={m.selected ? 48 : m.kind === "mine" ? 40 : 36}
          height={m.selected ? 48 : m.kind === "mine" ? 40 : 36}
          onTap={() => onMarkerPress?.(m.id)}
        >
          <PlaceMarker kind={m.kind} count={m.count} selected={m.selected} />
        </NaverMapMarkerOverlay>
      ))}
    </NaverMapView>
  );
});

export const mapColors = { mine: colors.brown, others: colors.khaki };
