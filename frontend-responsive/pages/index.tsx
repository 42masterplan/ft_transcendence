import ScrollableContainer from "@/components/container/ScrollableContainer";
import UserInfoCard from "@/components/card/userInfoCard/UserInfoCard";
import ResponsiveContainer from "@/components/container/ResponsiveContainer";
import * as Class from "@/lib/class";
import * as Type from "@/lib/type";
import * as API from "@/DummyBackend/new/mainAPI";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import GameStatsCard from "@/components/card/cardUsedInHomePage/GameStatsCard";
import AchievementCard from "@/components/card/cardUsedInHomePage/AchievementCard";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import MatchHistoryCard from "@/components/card/cardUsedInHomePage/MatchHistoryCard";

export default function HomePage() {
  // TODO: FIX THIS ------------------------------------------------------------

  // get user info from server
  const userInfo = API.main__getUserInfo();
  const currentUser = new Class.User();
  // push data to currentUser
  currentUser.id = userInfo.id;
  currentUser.name = userInfo.name;
  currentUser.profileImage = userInfo.profileImage;
  currentUser.currentStatus = userInfo.currentStatus as Type.userStatus;
  currentUser.introduction = userInfo.introduction;
  const rank: API.rank = userInfo.rank;
  // get challenge from server
  const achievements: API.challenge[] = userInfo.challenges;
  // get game history from server
  const matchHistory: API.match[] = API.main__getGameHistory();

  // TODO: FIX THIS ------------------------------------------------------------

  interface AchievementsSectionProps {
    achievements: API.challenge[];
  }

  function AchievementsSection({ achievements }: AchievementsSectionProps) {
    return (
      <Card className="m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1">
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>

        <Tabs defaultValue="myProgress" className="px-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="myProgress">My progress</TabsTrigger>
            <TabsTrigger value="successRate">Success rate</TabsTrigger>
          </TabsList>
          <TabsContent value="myProgress">
            <ScrollableContainer className="w-full h-96 sm:h-84">
              <CardContent className="flex flex-col gap-3">
                {achievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.name}
                    achievementRate={achievement}
                    type="myProgress"
                  />
                ))}
              </CardContent>
            </ScrollableContainer>
          </TabsContent>
          <TabsContent value="successRate">
            <ScrollableContainer className="w-full h-96 sm:h-84">
              <CardContent className="flex flex-col gap-3">
                {achievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.name}
                    achievementRate={achievement}
                    type="successRate"
                  />
                ))}
              </CardContent>
            </ScrollableContainer>
          </TabsContent>
        </Tabs>
      </Card>
    );
  }

  function MatchHistorySection() {
    return (
      <Card className="m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1">
        <CardHeader>
          <CardTitle>Match history</CardTitle>
        </CardHeader>
        <ScrollableContainer className="w-full h-[47rem]">
          <CardContent className="flex flex-col gap-3">
            {matchHistory.map((match) => (
              <MatchHistoryCard key={match.createdAt} match={match} />
            ))}
          </CardContent>
        </ScrollableContainer>
      </Card>
    );
  }

  return (
    <>
      <ScrollableContainer className="w-full py-0 sm:py-3">
        <UserInfoCard
          userInfo={currentUser}
          size="lg"
          printIntro
          stretch
          className="m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1"
        />
        <ResponsiveContainer className="flex-col sm:flex-row gap-2 sm:gap-0 max-h-96">
          <ResponsiveContainer className="flex-col flex-1 gap-2">
            {/* left side */}
            <GameStatsCard rank={rank} />
            <AchievementsSection achievements={achievements} />
          </ResponsiveContainer>
          <ResponsiveContainer className="flex-col flex-1">
            {/* right side */}
            <MatchHistorySection />
          </ResponsiveContainer>
        </ResponsiveContainer>
      </ScrollableContainer>
    </>
  );
}
