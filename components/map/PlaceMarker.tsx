import { Text, View } from "react-native";
import { CupIcon } from "@/components/character/CupIcon";
import type { MapMarker } from "./types";

type Props = Pick<MapMarker, "kind" | "count" | "selected">;

export function PlaceMarker({ kind, count, selected }: Props) {
  const size = selected ? 48 : kind === "mine" ? 40 : 36;
  const bg = kind === "mine" ? "bg-brown" : "bg-khaki";
  return (
    <View style={{ width: size, height: size }} className={`items-center justify-center rounded-full border-[3px] border-bg ${bg}`}>
      <CupIcon size={selected ? 24 : 18} />
      {kind === "cluster" && count ? (
        <View className="absolute -right-1.5 -top-1.5 min-w-[22px] items-center justify-center rounded-full border-2 border-bg bg-ink px-1.5">
          <Text className="font-body text-[12px] font-bold text-bg">{count}</Text>
        </View>
      ) : null}
    </View>
  );
}
