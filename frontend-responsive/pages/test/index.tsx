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
    <>
      <ScrollableContainer className="w-full h-full">
        <div className="flex flex-col gap-4">
        <UserInfoCard userInfo={userInfo} size="lg"  bgColor="custom3" printIntro />
        <UserInfoCard userInfo={userInfo} size="lg" bgColor="custom3" printIntro side="right"/>
        <UserInfoCard userInfo={userInfo} size="lg" bgColor="custom3" />
        <UserInfoCard userInfo={userInfo} size="lg"  bgColor="custom3" printIntro stretch/>
        <UserInfoCard userInfo={userInfo} size="lg" bgColor="custom3" printIntro side="right" stretch/>
        <UserInfoCard userInfo={userInfo} size="lg" bgColor="custom3" stretch />
        
        
        <UserInfoCard userInfo={userInfo} size="md" bgColor="custom3" printIntro />
        <UserInfoCard userInfo={userInfo} size="md" bgColor="custom3" printIntro side="right"/>
        <UserInfoCard userInfo={userInfo} size="md" bgColor="custom3" />
        <UserInfoCard userInfo={userInfo} size="md"  bgColor="custom3" printIntro stretch/>
        <UserInfoCard userInfo={userInfo} size="md" bgColor="custom3" printIntro side="right" stretch/>
        <UserInfoCard userInfo={userInfo} size="md" bgColor="custom3" stretch />

        
        
        
        <UserInfoCard userInfo={userInfo} size="sm" bgColor="custom3" printIntro />
        <UserInfoCard userInfo={userInfo} size="sm" bgColor="custom3" printIntro side="right"/>
        <UserInfoCard userInfo={userInfo} size="sm" bgColor="custom3" />
        <UserInfoCard userInfo={userInfo} size="sm" bgColor="custom3" printIntro insteadOfIntro="a very long long chat a very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chat"/>
        <UserInfoCard userInfo={userInfo} side="right" size="sm" bgColor="custom3" printIntro insteadOfIntro="a very 11231231231231asdfasdfsadfasdfsadfsad2312long long chat a very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chata very long long chat"/>
        <UserInfoCard userInfo={userInfo} size="sm"  bgColor="custom3" printIntro stretch/>
        <UserInfoCard userInfo={userInfo} size="sm" bgColor="custom3" printIntro side="right" stretch/>
        <UserInfoCard userInfo={userInfo} size="sm" bgColor="custom3" stretch />
        </div>
      </ScrollableContainer>
    </>
  );
}
