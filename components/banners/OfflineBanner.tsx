import { WifiOff } from "lucide-react-native";
import { Banner } from "./Banner";
import { colors } from "@/lib/tokens";

export function OfflineBanner({ pending }: { pending: number }) {
  return <Banner tone="dark" icon={<WifiOff size={20} color={colors.bg} />} title="인터넷이 안 돼요" sub={pending > 0 ? `심어둔 자리 ${pending}개는 연결되면 올라가요` : "내 자리는 보여요. 저장은 연결되면"} />;
}
