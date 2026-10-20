import { useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { useAccount } from "@/hooks/useAccount";
import { colors } from "@/lib/tokens";

function Check({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <Pressable role="checkbox" aria-checked={value} aria-label={label} onPress={() => onChange(!value)} className="min-h-[48px] flex-row items-center gap-3 rounded-btn-card border border-divider bg-bg px-3.5 py-3">
      <Switch value={value} onValueChange={onChange} trackColor={{ true: colors.brown, false: colors.divider }} thumbColor={colors.bg} />
      <Text className="flex-1 font-body text-[14px] text-ink">{label}</Text>
    </Pressable>
  );
}

export default function DeleteAccount() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { placeCount, remove } = useAccount();
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const ready = a && b;

  return (
    <View className="flex-1 bg-ink/45 justify-end">
      <View role="dialog" aria-label="계정 삭제 확인" className="mx-edge rounded-card bg-surface p-card pb-4 shadow-xl" style={{ marginBottom: insets.bottom + 50 }}>
        <View className="gap-4">
          <Heading level="card">계정과 모든 자리를{"\n"}지울까요?</Heading>
          <Text className="font-body text-[13px] text-muted">자리 {placeCount.data ?? 0}개가 모두 사라져요</Text>
          <View className="gap-2.5">
            <Check label="모든 자리와 영상이 삭제되는 걸 알아요" value={a} onChange={setA} />
            <Check label="되돌릴 수 없다는 걸 알아요" value={b} onChange={setB} />
          </View>
          {remove.isError ? <Text role="alert" className="font-body text-[13px] text-brown-deep">삭제가 안 됐어요. 잠시 후 다시 시도해주세요</Text> : null}
          <View className="gap-2">
            <Button label={ready ? "계정 지우기" : "둘 다 확인하면 지울 수 있어요"} variant="danger" context="card" disabled={!ready || remove.isPending} onPress={() => remove.mutate(undefined, { onSuccess: () => router.replace("/onboarding/intro") })} />
            <Button label="그만둘게요" variant="secondary" context="card" onPress={() => router.back()} disabled={remove.isPending} />
          </View>
        </View>
      </View>
    </View>
  );
}
