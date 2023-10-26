import { ScrollArea } from "@/components/shadcn/ui/scroll-area"

type ScrollableCardProps = {
  children: React.ReactNode;
};

export default function ScrollableCard({ children }: ScrollableCardProps) {
  return (
    <ScrollArea className="w-full h-full rounded-md">
      {children}
    </ScrollArea>
  );
}
