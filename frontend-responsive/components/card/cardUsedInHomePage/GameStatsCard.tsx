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
import { Trophy } from "lucide-react";
import React from "react";
import DynamicProgressBar from "../../graph/DynamicProgressBar";

interface GameStatsCardProps {
  rank: API.rank;
}

export default function GameStatsCard({ rank }: GameStatsCardProps) {
  const winRate = (rank.win / (rank.win + rank.lose)) * 100;

  let tierStringColor = "";
  if (rank.tier === "Bronze") {
    tierStringColor = "text-amber-700	";
  } else if (rank.tier === "Silver") {
    tierStringColor = "text-gray-500";
  } else if (rank.tier === "Gold") {
    tierStringColor = "text-yellow-600	";
  } else if (rank.tier === "Platinum") {
    tierStringColor = "text-stone-600	";
  } else {
    tierStringColor = "text-black";
  }

  return (
    <Card className="m-2 hover:scale-102 duration-200 hover:-translate-y-1">
      <CardHeader>
        <CardTitle>Game Stats</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div>
          <div className="flex flex-row w-full justify-between py-1">
            <p className="text-lg text-blue-300">Wins: {rank.win}</p>
            <p className="text-lg text-rose-300">Losses: {rank.lose}</p>
          </div>
          <DynamicProgressBar progress={winRate} />
        </div>
        <div className="flex flex-col w-full gap-1 items-center">
          <Trophy className={`w-20 h-20 ${tierStringColor}`} />
          <p
            className={`${tierStringColor}  font-sans text-3xl font-extrabold`}
          >{`${rank.tier}`}</p>
        </div>
      </CardContent>
    </Card>
  );
}
