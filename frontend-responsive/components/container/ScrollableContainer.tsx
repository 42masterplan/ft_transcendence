import { ScrollArea, ScrollBar } from "@/components/shadcn/ui/scroll-area";
import ResponsiveContainer from "./ResponsiveContainer";

export type orientationType = "horizontal" | "vertical";

type ScrollableCardProps = {
  children: React.ReactNode;
  orientation?: orientationType;
  className?: string;
};

export default function ScrollableContainer({
  children,
  orientation = "vertical",
  className = "",
}: ScrollableCardProps) {
  let flexOrientation: string = "";
  if (orientation === "horizontal") {
    flexOrientation = "flex-row";
  } else if (orientation === "vertical") {
    flexOrientation = "flex-col";
  }
  return (
    <ScrollArea className={"w-full h-full rounded-md px-4 py-1 " + className}>
      <ResponsiveContainer className={"flex " + flexOrientation}>{children}</ResponsiveContainer>
      <ScrollBar orientation={orientation} />
    </ScrollArea>
  );
}
