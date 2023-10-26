import { Gamepad2, MessagesSquare, Home, Trophy, Users } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import { LayoutResponsiveDesign } from "../../../lib/LayoutResponsiveDesign";
import Link from "next/link";

// There are 5 types of buttons in the footer:
// GameBtn, ChannelBtn, MyPageBtn, SocialBtn, RankBtn

// Footer button props
type FooterButtonProps = {
  type: "game" | "channel" | "myPage" | "social" | "rank";
};

export default function FooterButton({ type }: FooterButtonProps) {
  let href: string = "";
  let icon: any = null;
  const iconSize = LayoutResponsiveDesign.iconSize;

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
    <Link href={href} className="flex w-full h-12">
      <Button variant="iconBtn" size="footerBtn" className="w-full">
        {icon}
      </Button>
    </Link>
  );
}
