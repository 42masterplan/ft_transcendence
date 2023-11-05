import {Progress} from '@/components/shadcn/ui/progress';
import React from 'react';

interface DynamicProgressBarProps {
  progress: number;
  start?: number;
}

export default function DynamicProgressBar({
  progress,
  start = 0
}: DynamicProgressBarProps) {
  const [progressValue, setProgressValue] = React.useState(start);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgressValue(progress), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progressValue} className='bg-custom1' />;
}
