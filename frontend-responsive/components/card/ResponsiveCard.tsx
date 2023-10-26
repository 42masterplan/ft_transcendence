/**
 * This component is a card component which is responsive.
 * Recommended to use this component inside a flex container. Because it will
 *  stretch to the full width of the container.
 */

import { Card } from "../shadcn/ui/card";

type ResponsiveCardProps = {
  children: React.ReactNode;
  bgColor?: string;
  hoverEffect?: boolean;
  className?: string;
};

export default function ResponsiveCard({
  children,
  bgColor = "",
  hoverEffect = false,
  className = "",
}: ResponsiveCardProps) {
  // If hoverEffect is true, the card will have a hover effect.
  let hoverEffectClassName: string;
  if (hoverEffect && bgColor !== "") {
    hoverEffectClassName = `hover:bg-${bgColor}/90`;
  } else {
    hoverEffectClassName = "";
  }

  const classNameString = `flex justify-center items-center min-w-fit p-0 m-0 
  rounded-md sm:rounded-lg bg-${bgColor} ${hoverEffectClassName} ${className}`;

  return <div className={classNameString}>{children}</div>;
}
