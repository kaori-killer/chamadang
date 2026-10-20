import { Modal, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { space } from "@/lib/tokens";

type Props = { visible: boolean; ariaLabel: string; onDismiss: () => void; children: React.ReactNode };

export function SheetCard({ visible, ariaLabel, onDismiss, children }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <Pressable aria-label="닫기" onPress={onDismiss} className="flex-1 bg-ink/45" />
      <View role="dialog" aria-label={ariaLabel} aria-modal className="absolute left-edge right-edge rounded-card bg-surface p-card pb-4 shadow-xl" style={{ bottom: insets.bottom + space.bottomSafe }}>
        {children}
      </View>
    </Modal>
  );
}
