import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { SheetCard } from "./SheetCard";
import type { ReportReason } from "@/lib/supabase/reports";

const REASONS: { key: ReportReason; label: string }[] = [
  { key: "not_tea_spot", label: "차 마시는 자리가 아니에요" },
  { key: "privacy", label: "다른 사람의 얼굴이나 집이 찍혔어요" },
  { key: "harmful", label: "불쾌하거나 위험한 내용이에요" },
  { key: "other", label: "그 밖의 이유" },
];

type Props = { visible: boolean; busy: boolean; onSubmit: (reason: ReportReason) => void; onCancel: () => void };

export function ReportCard({ visible, busy, onSubmit, onCancel }: Props) {
  const [reason, setReason] = useState<ReportReason | null>(null);
  return (
    <SheetCard visible={visible} ariaLabel="자리 신고" onDismiss={onCancel}>
      <View className="gap-4">
        <Heading level="card">이 자리를 신고할게요</Heading>
        <View role="radiogroup" aria-label="신고 사유" className="gap-2">
          {REASONS.map((r) => {
            const on = reason === r.key;
            return (
              <Pressable key={r.key} role="radio" aria-checked={on} aria-label={r.label} onPress={() => setReason(r.key)} className={`min-h-[50px] justify-center rounded-btn-card px-4 ${on ? "border-2 border-brown bg-brown-soft" : "border border-divider bg-bg"}`}>
                <Text className={`font-body text-[15px] text-ink ${on ? "font-bold" : ""}`}>{r.label}</Text>
              </Pressable>
            );
          })}
        </View>
        <Text className="font-body text-[12px] text-muted">신고하면 내 지도에서 바로 사라져요</Text>
        <View className="flex-row gap-2.5">
          <Button label="취소" variant="secondary" context="card" className="flex-1" onPress={onCancel} disabled={busy} />
          <Button label="보내기" variant="danger" context="card" className="flex-1" disabled={!reason || busy} onPress={() => reason && onSubmit(reason)} />
        </View>
      </View>
    </SheetCard>
  );
}
