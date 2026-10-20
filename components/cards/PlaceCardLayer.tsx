import { useCallback, useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useClips } from "@/hooks/usePlace";
import { useNearbyOrder } from "@/hooks/useNearbyOrder";
import { usePosterUrl } from "@/hooks/usePosterUrl";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { distanceMeters, formatDistance } from "@/lib/geo/distance";
import { openDirections } from "@/lib/geo/directions";
import { space } from "@/lib/tokens";
import type { ClipRow, PlaceRow } from "@/lib/types";
import { useUi } from "@/store/ui";
import { ClusterCard } from "./ClusterCard";
import { CollapsedBar } from "./CollapsedBar";
import { PlaceCard } from "./PlaceCard";
import { PlaceCardCarousel } from "./PlaceCardCarousel";
import { VideoFullscreen } from "./VideoFullscreen";
import { DeletePlaceCard } from "./DeletePlaceCard";
import { ReportCard } from "./ReportCard";
import { usePlaceActions } from "@/hooks/usePlaceActions";

type Props = { places: PlaceRow[]; onFocusPlace: (place: PlaceRow) => void };

export function PlaceCardLayer({ places, onFocusPlace }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mode, card, selectedPlaceId, clusterIds, openCard, expandCard, closeCard } = useUi();
  const ordered = useNearbyOrder(places, selectedPlaceId, mode);
  const url = usePosterUrl();
  const me = useCurrentLocation();
  const selectedClips = useClips(selectedPlaceId);
  const [fullscreen, setFullscreen] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<PlaceRow | null>(null);
  const [reporting, setReporting] = useState<string | null>(null);
  const actions = usePlaceActions();
  const bottom = insets.bottom + space.bottomSafe;

  const select = useCallback((id: string) => {
    openCard(id);
    const p = places.find((x) => x.id === id);
    if (p) onFocusPlace(p);
  }, [places, openCard, onFocusPlace]);

  const renderCard = useCallback((place: PlaceRow) => (
    <ConnectedCard
      place={place}
      url={url}
      me={me.data ?? null}
      onExpandVideo={(c) => setFullscreen(url(c.video_path))}
      onAddClip={place.is_mine ? () => router.push("/plant/record") : undefined}
      onDelete={place.is_mine ? () => setDeleting(place) : undefined}
      onReport={place.is_mine ? undefined : () => setReporting(place.id)}
    />
  ), [url, me.data, router]);

  if (clusterIds) {
    const members = places.filter((p) => clusterIds.includes(p.id));
    return (
      <View className="absolute left-edge right-edge" style={{ bottom }}>
        <ClusterCard places={members} posterUrl={url} onSelect={select} />
      </View>
    );
  }
  if (!selectedPlaceId || card === "none") return null;
  const selected = places.find((p) => p.id === selectedPlaceId);
  if (!selected) return null;

  if (card === "collapsed") {
    return (
      <View className="absolute left-edge right-edge" style={{ bottom }}>
        <CollapsedBar name={selected.name ?? "이름 없는 자리"} posterUrl={selected.latest_poster ? url(selected.latest_poster) : null} onExpand={expandCard} />
      </View>
    );
  }
  return (
    <>
      <View className="absolute inset-x-0" style={{ bottom }}>
        <PlaceCardCarousel places={ordered} selectedId={selectedPlaceId} renderCard={renderCard} onSelect={select} onSwipeDown={closeCard} onSwipeUp={() => { const latest = selectedClips.data?.[0]; if (latest) setFullscreen(url(latest.video_path)); }} />
      </View>
      <VideoFullscreen videoUrl={fullscreen} onClose={() => setFullscreen(null)} />
      <DeletePlaceCard
        place={deleting}
        posterUrl={deleting?.latest_poster ? url(deleting.latest_poster) : null}
        busy={actions.remove.isPending}
        onCancel={() => setDeleting(null)}
        onConfirm={() => deleting && actions.remove.mutate(deleting.id, { onSuccess: () => { setDeleting(null); closeCard(); } })}
      />
      <ReportCard
        visible={!!reporting}
        busy={actions.report.isPending}
        onCancel={() => setReporting(null)}
        onSubmit={(reason) => reporting && actions.report.mutate({ placeId: reporting, reason }, { onSuccess: () => { setReporting(null); closeCard(); } })}
      />
    </>
  );
}

type CardProps = { place: PlaceRow; url: (p: string) => string; me: { lat: number; lng: number } | null; onExpandVideo: (c: ClipRow) => void; onAddClip?: () => void; onDelete?: () => void; onReport?: () => void };

function ConnectedCard({ place, url, me, onExpandVideo, onAddClip, onDelete, onReport }: CardProps) {
  const clips = useClips(place.id);
  const distance = me ? formatDistance(distanceMeters(me, place)) : null;
  return (
    <PlaceCard
      place={place}
      clips={clips.data ?? []}
      clipUrl={url}
      distanceLabel={distance}
      onDirections={() => openDirections(place, place.name ?? "")}
      onExpandVideo={onExpandVideo}
      onAddClip={onAddClip}
      onDelete={onDelete}
      onReport={onReport}
    />
  );
}
