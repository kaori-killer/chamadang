import { useCallback, useEffect, useRef } from "react";
import { FlatList, View, type ListRenderItem, type NativeScrollEvent, type NativeSyntheticEvent } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import type { PlaceRow } from "@/lib/supabase/types";

const CARD_W = 330;
const GAP = 10;
const SIDE = 16;

type Props = {
  places: PlaceRow[];
  selectedId: string;
  renderCard: (place: PlaceRow) => React.ReactNode;
  onSelect: (id: string) => void;
  onSwipeDown: () => void;
  onSwipeUp: () => void;
};

export function PlaceCardCarousel({ places, selectedId, renderCard, onSelect, onSwipeDown, onSwipeUp }: Props) {
  const list = useRef<FlatList<PlaceRow>>(null);
  const index = Math.max(0, places.findIndex((p) => p.id === selectedId));

  useEffect(() => {
    list.current?.scrollToIndex({ index, animated: false });
  }, [index]);

  const onEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / (CARD_W + GAP));
    const next = places[i];
    if (next && next.id !== selectedId) onSelect(next.id);
  }, [places, selectedId, onSelect]);

  const vertical = Gesture.Pan()
    .activeOffsetY([-24, 24])
    .failOffsetX([-12, 12])
    .onEnd((e) => {
      if (e.translationY > 60) runOnJS(onSwipeDown)();
      else if (e.translationY < -60) runOnJS(onSwipeUp)();
    });

  const renderItem: ListRenderItem<PlaceRow> = useCallback(({ item }) => <View style={{ width: CARD_W }}>{renderCard(item)}</View>, [renderCard]);

  return (
    <GestureDetector gesture={vertical}>
      <View>
        <FlatList
          ref={list}
          horizontal
          data={places}
          keyExtractor={(p) => p.id}
          renderItem={renderItem}
          initialScrollIndex={index}
          getItemLayout={(_, i) => ({ length: CARD_W + GAP, offset: (CARD_W + GAP) * i, index: i })}
          snapToInterval={CARD_W + GAP}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SIDE, gap: GAP }}
          onMomentumScrollEnd={onEnd}
          accessibilityRole="list"
          accessibilityLabel="근처 자리 카드, 옆으로 넘겨 이동"
        />
      </View>
    </GestureDetector>
  );
}
