/**
 * This component is a card component which is responsive.
 * Recommended to use this component inside a flex container. Because it will
 *  stretch to the full width of the container.
 */

type ResponsiveContainerProps = {
  children: React.ReactNode;
  bgColor?: string;
  hoverEffect?: boolean;
  rounded?: boolean;
  className?: string;
};

// TODO: Forwarding ref, cn function component

export default function ResponsiveContainer({
  children,
  bgColor = "",
  hoverEffect = false,
  rounded = false,
  className = "",
}: ResponsiveContainerProps) {
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

  let roundedClassName: string;
  if (rounded) {
    roundedClassName = "rounded-md sm:rounded-lg";
  } else {
    roundedClassName = "";
  }

  const classNameString = `box-border flex min-w-fit p-0 m-0 ${roundedClassName} ${colorClassName} ${hoverEffectClassName} ${className}`;

  return <div className={classNameString}>{children}</div>;
}
