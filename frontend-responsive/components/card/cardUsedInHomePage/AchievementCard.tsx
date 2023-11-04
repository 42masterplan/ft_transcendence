import * as API from "@/DummyBackend/new/mainAPI";
import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import DynamicProgressBar from "@/components/graph/DynamicProgressBar";

interface AchievementCardProps {
  achievementRate: API.challenge;
  type: "myProgress" | "successRate";
}

export default function AchievementCard({
  achievementRate: achievement,
  type,
}: AchievementCardProps) {
  let rate: number;
  if (type === "myProgress") {
    rate = achievement.progressRate;
  } else {
    rate = achievement.achieveRatio * 100;
  }

  let myProgressComment: string;
  if (achievement.progressRate < 25) {
    myProgressComment = "You can do better!";
  } else if (achievement.progressRate < 50) {
    myProgressComment = "Light weight baby!!!";
  } else if (achievement.progressRate < 75) {
    myProgressComment = "Almost there!";
  } else if (achievement.progressRate < 100) {
    myProgressComment = "You are so close!";
  } else {
    myProgressComment = "You did it!";
  }

  let cardColor: string;
  if (rate < 25) {
    cardColor = "bg-custom1/20";
  } else if (rate < 50) {
    cardColor = "bg-custom2/20";
  } else if (rate < 75) {
    cardColor = "bg-custom3/20";
  } else {
    cardColor = "bg-custom4/20";
  }

  return (
    <Card
      className={`flex flex-col w-full justify-between p-4 gap-2 hover:scale-[1.02] duration-200 ${cardColor}`}
    >
      <CardTitle className=" text-lg">{achievement.name}</CardTitle>
      <CardDescription className="text-sm">
        {achievement.description}
      </CardDescription>
      {type === "myProgress" ? (
        <div>
          <div className="flex justify-between py-0.5 ">
            <div>{myProgressComment}</div>
            <div>{rate}%</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between py-0.5">
            <div>achieved / total</div>
            <div>{rate}%</div>
          </div>
        </div>
      )}
      <DynamicProgressBar progress={rate} />
    </Card>
  );
}
