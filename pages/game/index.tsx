import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/shadcn/ui/tabs';
import LadderGameSection from '@/components/sections/gamePage/LadderGameSection';
import NormalGameSection from '@/components/sections/gamePage/NormalGameSection';

export default function Game() {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Tabs defaultValue='ladder' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 h-fit'>
          <TabsTrigger value='ladder' className='font-extrabold text-4xl'>
            Ladder
          </TabsTrigger>
          <TabsTrigger value='normal' className='font-extrabold text-4xl'>
            Normal
          </TabsTrigger>
        </TabsList>
        <TabsContent value='ladder'>
          <LadderGameSection />
        </TabsContent>
        <TabsContent value='normal'>
          <NormalGameSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
