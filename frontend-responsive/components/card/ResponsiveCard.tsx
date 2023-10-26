/**
 * This component is a card component which is responsive.
 * Recommended to use this component inside a flex container. Because it will
 *  stretch to the full width of the container.
 */

import { Card } from "../shadcn/ui/card";

type ResponsiveCardProps = {
  children: React.ReactNode;
  bgColor?: string;
  border?: string;
  side?: "left" | "right" | "center";
  hoverEffect?: boolean;
};

export default function ResponsiveCard({
  children,
  bgColor = "",
  border = "border-none",
  side = "center",
  hoverEffect = false,
}: ResponsiveCardProps) {
  // If the side is left, the user's name is aligned to the left.
  let justifyDirection: string;
  if (side === "left") {
    justifyDirection = "flex-row justify-start";
  } else if (side === "center") {
    justifyDirection = "flex-row justify-center";
  } else {
    justifyDirection = " flex-row-reverse justify-end";
  }

  // If hoverEffect is true, the card will have a hover effect.
  let hoverEffectClassName: string;
  if (hoverEffect && bgColor !== "") {
    hoverEffectClassName = `hover:${bgColor}/90`;
  } else {
    hoverEffectClassName = "";
  }

  const className = `flex ${justifyDirection} items-center p-0.5 sm:p-1 ${bgColor} ${border} ${hoverEffectClassName} w-full`;

  return <Card className={className}>{children}</Card>;
}
