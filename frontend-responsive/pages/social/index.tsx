import ScrollableContainer from "@/components/container/ScrollableContainer";
import UserInfoCard from "@/components/card/userInfoCard/UserInfoCard";
import * as Types from "@/lib/type";
import {
  getDummyCurrentUserSync,
  getDummyParticipatedGameListSync,
} from "@/DummyBackend/outdated/DummyAPI";
export default function SocialPage() {
  const userInfo: Types.UserInfo = getDummyCurrentUserSync();
  const matchHistory: Types.GameInfo[] = getDummyParticipatedGameListSync(
    userInfo.id
  );

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">social</h1>
    </div>
  );
}
