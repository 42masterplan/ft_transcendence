import { ScrollArea, ScrollBar } from "@/components/shadcn/ui/scroll-area";
import ResponsiveContainer from "./ResponsiveContainer";

export type orientationType = "horizontal" | "vertical";

type ScrollableCardProps = {
  children: React.ReactNode;
  orientation?: orientationType;
  rounded?: boolean;
  className?: string;
};

export default function ScrollableContainer({
  children,
  orientation = "vertical",
  rounded = true,
  className = "",
}: ScrollableCardProps) {
  let flexOrientation: string = "";
  if (orientation === "horizontal") {
    flexOrientation = "flex-row";
  } else if (orientation === "vertical") {
    flexOrientation = "flex-col";
  }
  let roundedClassName: string;
  if (rounded) {
    roundedClassName = "rounded-md sm:rounded-lg";
  } else {
    roundedClassName = "";
  }
  return (
    <ScrollArea className={`w-full h-full ${roundedClassName} ${className}`}>
      <ResponsiveContainer className={`flex ${flexOrientation}`}>{children}</ResponsiveContainer>
      <ScrollBar orientation={orientation} />
    </ScrollArea>
  );
}
