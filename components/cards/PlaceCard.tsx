import { Pressable, Text, View } from "react-native";
import { Navigation, Plus } from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Heading } from "@/components/ui/Heading";
import { ClipThumb } from "./ClipThumb";
import { TIME_TAGS } from "@/components/plant/TagPicker";
import { colors, size } from "@/lib/tokens";
import type { ClipRow, PlaceRow } from "@/lib/types";

type Props = {
  place: PlaceRow;
  clips: ClipRow[];
  clipUrl: (path: string) => string;
  distanceLabel: string | null;
  onDirections: () => void;
  onExpandVideo: (clip: ClipRow) => void;
  onDelete?: () => void;
  onReport?: () => void;
  onAddClip?: () => void;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};
const shortDate = (iso: string) => { const d = new Date(iso); return `${d.getMonth() + 1}.${d.getDate()}`; };

export function PlaceCard({ place, clips, clipUrl, distanceLabel, onDirections, onExpandVideo, onDelete, onReport, onAddClip }: Props) {
  const latest = clips[0];
  const older = clips.slice(1);
  const mine = place.is_mine;
  const label = mine ? `내 마당${place.address_short ? ` · ${place.address_short}` : ""}` : `모두의 마당${place.address_short ? ` · ${place.address_short}` : ""}`;

  return (
    <View role="article" aria-label={place.name ?? "이름 없는 자리"} className="h-[400px] w-[330px] rounded-card bg-surface p-card pb-4 shadow-lg">
      <View className="flex-1 gap-3">
        <Heading level="card">{place.name ?? "이름 없는 자리"}</Heading>
        <View className="flex-row gap-3.5">
          {latest ? (
            <ClipThumb videoUrl={clipUrl(latest.video_path)} label={clips.length > 1 ? `${shortDate(latest.recorded_at)} 최근` : "1.5초"} width={size.thumbCard.w} height={size.thumbCard.h} onExpand={() => onExpandVideo(latest)} />
          ) : (
            <View style={{ width: size.thumbCard.w, height: size.thumbCard.h }} className="rounded-btn-card bg-khaki-soft" />
          )}
          <View className="flex-1 gap-2">
            <Text className={`font-body text-[12px] font-medium ${mine ? "text-brown" : "text-khaki"}`}>{label.replace(" · ", ", ")}</Text>
            <Text className="font-body text-[12px] text-muted">
              {clips.length > 1 ? `${clips.length}번 심은 자리` : latest ? formatDate(latest.recorded_at) : ""}{latest?.tea ? `, ${latest.tea}` : ""}
            </Text>
            <View className="flex-row flex-wrap gap-1.5">
              {place.tags.map((t) => <Chip key={t} label={t} tone={(TIME_TAGS as readonly string[]).includes(t) ? "brown" : "khaki"} />)}
            </View>
          </View>
        </View>
        {older.length > 0 || onAddClip ? (
          <View className="gap-1.5">
            <Text className="font-body text-[12px] font-bold text-muted">이 자리의 다른 날</Text>
            <View className="flex-row gap-2">
              {older.slice(0, 3).map((c) => (
                <ClipThumb key={c.id} videoUrl={clipUrl(c.video_path)} label={shortDate(c.recorded_at)} width={size.thumbList.w} height={size.thumbList.h} autoplay={false} onExpand={() => onExpandVideo(c)} />
              ))}
              {onAddClip ? (
                <Pressable role="button" aria-label="같은 자리에 더하기" onPress={onAddClip} style={{ width: size.thumbList.w, height: size.thumbList.h }} className="items-center justify-center rounded-input border border-dashed border-brown">
                  <Plus size={20} color={colors.brown} />
                </Pressable>
              ) : null}
            </View>
          </View>
        ) : null}
        {latest?.note ? <Text className="flex-1 font-body text-[14px] leading-[22px] text-ink">{latest.note}</Text> : <View className="flex-1" />}
        <Button label={distanceLabel ? `길 찾기, 여기서 ${distanceLabel}` : "길 찾기"} variant="tertiary" context="card" icon={<Navigation size={18} color={colors.ink} />} onPress={onDirections} />
        {mine && onDelete ? (
          <Pressable role="button" aria-label="이 자리 지우기" onPress={onDelete} className="min-h-[32px] self-center justify-center">
            <Text className="font-body text-[13px] text-muted underline">이 자리 지우기</Text>
          </Pressable>
        ) : !mine && onReport ? (
          <Pressable role="button" aria-label="이 자리 신고하기" onPress={onReport} className="min-h-[32px] self-center justify-center">
            <Text className="font-body text-[13px] text-muted underline">신고하기</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
