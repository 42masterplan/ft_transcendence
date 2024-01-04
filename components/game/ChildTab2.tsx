import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/shadcn/ui/tabs';
import {Theme} from '@/types/game';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/shadcn/ui/carousel';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/shadcn/ui/card';
import {Button} from '../shadcn/ui/button';

export default function ChildTab({setTheme}: any) {
  // theme array
  const themes = [];
  // push all themes to array
  for (const theme in Theme) {
    themes.push(theme);
  }
  return (
    <Carousel className='w-full max-w-xs'>
      <CarouselContent>
        {themes.map((theme) => (
          <CarouselItem key={theme}>
            <div className='flex flex-col justify-center items-center p-1 gap-3'>
              <Image
                src={`/gameThemes/Profile/${theme}.png`}
                width={300}
                height={300}
                alt='이미지를 불러오는데 실패했습니다.'
                className='rounded-full'
              />
              <Button
                className='bg-lime-600 hover:scale-110 hover:bg-lime-500 transition-transform'
                onClick={() => setTheme(theme)}
              >
                Set Theme to {theme}
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
