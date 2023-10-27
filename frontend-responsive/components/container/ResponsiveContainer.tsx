/**
 * This component is a card component which is responsive.
 * Recommended to use this component inside a flex container. Because it will
 *  stretch to the full width of the container.
 */

type ResponsiveCardProps = {
  children: React.ReactNode;
  bgColor?: string;
  hoverEffect?: boolean;
  className?: string;
};

// TODO: Forwarding ref, cn function component

export default function ResponsiveContainer({
  children,
  bgColor = "",
  hoverEffect = false,
  className = "",
}: ResponsiveCardProps) {
  // If hoverEffect is true, the card will have a hover effect.
  let colorClassName: string;
  if (bgColor !== "") {
    colorClassName = `bg-${bgColor}`;
  } else {
    colorClassName = "";
  }

  let hoverEffectClassName: string;
  if (hoverEffect && bgColor !== "") {
    hoverEffectClassName = `hover:${colorClassName}/90`;
  } else {
    hoverEffectClassName = "";
  }

  const classNameString = `flex items-center min-w-fit p-0 m-0 
  rounded-md sm:rounded-lg ${colorClassName} ${hoverEffectClassName} ${className}`;

  return <div className={classNameString}>{children}</div>;
}
