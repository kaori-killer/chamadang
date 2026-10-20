import { useRef, useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LocateFixed, Settings } from "lucide-react-native";
import { MapView } from "@/components/map/MapView";
import type { MapBounds, MapHandle, Region } from "@/components/map/types";
import { ModeToggle } from "@/components/map/ModeToggle";
import { PlantFab } from "@/components/map/PlantFab";
import { EmptyMine } from "@/components/map/EmptyMine";
import { PlaceCardLayer } from "@/components/cards/PlaceCardLayer";
import { LocationOffBanner } from "@/components/banners/LocationOffBanner";
import { OfflineBanner } from "@/components/banners/OfflineBanner";
import { IconButton } from "@/components/ui/IconButton";
import { TopBar } from "@/components/ui/TopBar";
import { Heading } from "@/components/ui/Heading";
import { usePlaces } from "@/hooks/usePlaces";
import { useClusters } from "@/hooks/useClusters";
import { usePermissions } from "@/hooks/usePermissions";
import { useNetwork } from "@/hooks/useNetwork";
import { useUploadQueue } from "@/hooks/useUploadQueue";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useUi } from "@/store/ui";
import { colors, space } from "@/lib/tokens";

const SEOUL: Region = { center: { lat: 37.6027, lng: 126.9291 }, zoom: 15 };

export default function MapHome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapHandle>(null);
  const [region, setRegion] = useState<Region>(SEOUL);
  const [bounds, setBounds] = useState<MapBounds | null>(null);
  const { mode, setMode, selectedPlaceId, card, openCard, openCluster, collapseCard } = useUi();
  const places = usePlaces(bounds, mode);
  const markers = useClusters(places.data ?? [], region.zoom, selectedPlaceId);
  const permissions = usePermissions();
  const online = useNetwork();
  const queue = useUploadQueue();
  const me = useCurrentLocation();
  const bottomInset = insets.bottom + space.bottomSafe;

  const locationOff = permissions.data?.location === "denied";
  const cameraReady = permissions.data?.camera === "granted" && permissions.data?.microphone === "granted" && permissions.data?.location === "granted";
  const emptyMine = mode === "mine" && places.isSuccess && places.data.length === 0;

  const plant = () => router.push(cameraReady ? "/plant/record" : { pathname: "/onboarding/permissions", params: { returnTo: "plant" } });

  return (
    <View className="flex-1 bg-bg">
      <MapView
        ref={mapRef}
        initialRegion={SEOUL}
        markers={markers}
        bottomInset={bottomInset}
        showsUserLocation={!locationOff}
        onMarkerPress={(id) => (id.startsWith("cluster:") ? openCluster(id.slice("cluster:".length).split(",")) : openCard(id))}
        onMapPress={collapseCard}
        onRegionChangeIdle={(r, b) => { setRegion(r); setBounds(b); }}
      />
      {emptyMine ? <EmptyMine /> : null}

      <View className="absolute left-0 right-0 top-0 gap-3">
        <TopBar
          edge="map"
          left={<Heading level="page" className="text-[24px]">차마당</Heading>}
          right={
            <View className="flex-row items-center gap-2">
              <ModeToggle mode={mode} onChange={setMode} />
              <IconButton ariaLabel="설정" size={36} onPress={() => router.push("/settings")}>
                <Settings size={18} color={colors.ink} />
              </IconButton>
            </View>
          }
        />
        <View className="px-edge">
          {!online ? <OfflineBanner pending={queue.pending} /> : locationOff ? <LocationOffBanner onEnable={() => router.push({ pathname: "/onboarding/permissions", params: { returnTo: "home" } })} /> : null}
        </View>
      </View>

      {card === "none" ? (
        <>
          <View className="absolute right-edge" style={{ bottom: bottomInset + 34 }}>
            <IconButton ariaLabel="현재 위치로" size={48} className={locationOff ? "opacity-50" : ""} disabled={locationOff} onPress={() => me.data && mapRef.current?.animateTo(me.data, 16)}>
              <LocateFixed size={22} color={colors.ink} />
            </IconButton>
          </View>
          <View className="absolute left-0 right-0 items-center" style={{ bottom: insets.bottom + 16 }}>
            <PlantFab caption={locationOff ? "위치를 켜면 심을 수 있어요" : emptyMine ? "첫 자리 심기" : online ? "여기, 차 마시기 좋아요" : "찍어두면 나중에 올려드려요"} disabled={locationOff} onPress={plant} />
          </View>
        </>
      ) : null}

      <PlaceCardLayer places={places.data ?? []} onFocusPlace={(p) => mapRef.current?.animateTo({ lat: p.lat, lng: p.lng })} />
    </View>
  );
}
