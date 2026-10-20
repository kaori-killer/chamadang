import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, LocateFixed } from "lucide-react-native";
import { MapView } from "@/components/map/MapView";
import { CenterPin } from "@/components/map/CenterPin";
import type { MapHandle, Region } from "@/components/map/types";
import { AddressCard } from "@/components/plant/AddressCard";
import { NearbyPlaceCard } from "@/components/plant/NearbyPlaceCard";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import { StepDots } from "@/components/ui/StepDots";
import { TextField } from "@/components/ui/TextField";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useNearbyOwnPlace } from "@/hooks/useNearbyOwnPlace";
import { usePlantFlow } from "@/hooks/usePlantFlow";
import { useReverseGeocode } from "@/hooks/useReverseGeocode";
import { distanceMeters, formatDistance } from "@/lib/geo/distance";
import type { LatLng } from "@/lib/native/location";
import { colors, limits, space } from "@/lib/tokens";

const FALLBACK: LatLng = { lat: 37.6027, lng: 126.9291 };

export default function PlantLocate() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapHandle>(null);
  const current = useCurrentLocation();
  const [center, setCenter] = useState<LatLng | null>(null);
  const geocode = useReverseGeocode(center);
  const nearby = useNearbyOwnPlace(center);
  const { placeName, setPlaceName, setLocation, setAttachTo } = usePlantFlow();

  const initial: Region = { center: current.data ?? FALLBACK, zoom: 17 };
  const nearbyPlace = nearby.data;
  const failed = geocode.status === "failed";

  const proceed = (attachTo: string | null) => {
    if (!center) return;
    setLocation(center, geocode.address);
    setAttachTo(attachTo);
    router.push("/plant/note");
  };

  if (current.isPending) return <View className="flex-1 bg-bg" />;

  return (
    <View className="flex-1 bg-bg">
      <MapView
        ref={mapRef}
        initialRegion={initial}
        markers={[]}
        showsUserLocation
        bottomInset={insets.bottom + space.bottomSafe + 340}
        onRegionChangeIdle={(r) => setCenter(r.center)}
      />
      <CenterPin label={geocode.address?.short ?? (failed ? "주소 없음" : "")} loading={geocode.status === "loading"} />

      <View className="absolute inset-x-0 flex-row items-center justify-between px-edge" style={{ top: insets.top + 8 }}>
        <IconButton ariaLabel="뒤로" onPress={() => router.back()}><ChevronLeft size={22} color={colors.ink} /></IconButton>
        <StepDots total={3} current={1} />
      </View>

      <View className="absolute right-edge" style={{ bottom: insets.bottom + space.bottomSafe + 356 }}>
        <IconButton ariaLabel="현재 위치로" size={48} onPress={() => current.data && mapRef.current?.animateTo(current.data, 17)}>
          <LocateFixed size={22} color={colors.ink} />
        </IconButton>
      </View>

      <View className="absolute left-edge right-edge rounded-card bg-surface p-card shadow-lg" style={{ bottom: insets.bottom + space.bottomSafe - 34 }}>
        {nearbyPlace && center ? (
          <View className="gap-3">
            <Heading level="card">지난번 자리 근처예요</Heading>
            <NearbyPlaceCard
              name={nearbyPlace.name}
              posterUrl={null}
              distanceLabel={formatDistance(distanceMeters(center, parseLocation(nearbyPlace.location)))}
              onAttach={() => proceed(nearbyPlace.id)}
              onNew={() => proceed(null)}
            />
          </View>
        ) : (
          <View className="gap-3">
            <View className="gap-1">
              <Heading level="card">어디였어요?</Heading>
              <Text className="font-body text-[13px] text-muted">지도를 움직여 잔을 자리 위에</Text>
            </View>
            <AddressCard address={geocode.address} failed={failed} />
            <TextField label="자리 이름" ariaLabel="자리 이름" optional={!failed} maxLength={limits.placeName} value={placeName} onChangeText={setPlaceName} placeholder="불광천 벤치, 해질녘" highlighted={failed} />
            <Button label="여기 맞아요" context="card" disabled={!center || geocode.status === "loading"} onPress={() => proceed(null)} />
          </View>
        )}
      </View>
    </View>
  );
}

function parseLocation(wkb: string): LatLng {
  const m = /POINT\(([-\d.]+) ([-\d.]+)\)/.exec(wkb);
  return m ? { lng: Number(m[1]), lat: Number(m[2]) } : FALLBACK;
}
