import { Gamepad2, MessagesSquare, Home, Trophy, Users } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import { ResponsiveDesign } from "../../../lib/ResponsiveDesign";
import Link from "next/link";

// There are 5 types of buttons in the footer:
// GameBtn, ChannelBtn, MyPageBtn, SocialBtn, RankBtn

// Footer button props
type FooterButtonProps = {
  type: "game" | "channel" | "myPage" | "social" | "rank";
  currentUrl: string;
};

export default function FooterButton({ type, currentUrl }: FooterButtonProps) {
  let href: string = "";
  let icon: any = null;
  const iconSize = ResponsiveDesign.iconSize;

  switch (type) {
    case "game":
      href = "/game";
      icon = <Gamepad2 className={iconSize} />;
      break;
    case "channel":
      href = "/channel";
      icon = <MessagesSquare className={iconSize} />;
      break;
    case "myPage":
      href = "/";
      icon = <Home className={iconSize} />;
      break;
    case "social":
      href = "/social";
      icon = <Users className={iconSize} />;
      break;
    case "rank":
      href = "/rank";
      icon = <Trophy className={iconSize} />;
      break;
  }

  return (
    <Link href={href} className="flex w-full justify-center h-12">
      {/* if currentUrl === href, use variant: footerBtnClicked */}
      <Button
        variant={
          currentUrl === href ? "footerBtnClicked" : "footerBtn"
        }
        size="footerBtn"
      >
        {icon}
      </Button>
      
    </Link>
  );
}
