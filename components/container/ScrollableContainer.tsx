import {ScrollArea, ScrollBar} from '@/components/shadcn/ui/scroll-area';

export type orientationType = 'horizontal' | 'vertical';

type ScrollableCardProps = {
  children: React.ReactNode;
  orientation?: orientationType;
  rounded?: boolean;
  className?: string;
};

export default function ScrollableContainer({
  children,
  orientation = 'vertical',
  rounded = true,
  className = ''
}: ScrollableCardProps) {
  let flexOrientation: string = '';
  if (orientation === 'horizontal') {
    flexOrientation = 'flex-row';
  } else if (orientation === 'vertical') {
    flexOrientation = 'flex-col';
  }
  let roundedClassName: string;
  if (rounded) {
    roundedClassName = 'rounded-md sm:rounded-lg';
  } else {
    roundedClassName = '';
  }
  return (
    <ScrollArea
      className={`w-full h-full p-1 ${roundedClassName} ${className}`}
    >
      <div className={`flex w-full h-full ${flexOrientation}`}>{children}</div>
      <ScrollBar orientation={orientation} />
    </ScrollArea>
  );
}
