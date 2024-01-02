import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/shadcn/ui/tabs';
import {Theme} from '@/lib/types';
import Image from 'next/image';

export default function ChildTab({setTheme}: any) {
  return (
    <Tabs defaultValue={Theme.Default}>
      <TabsList>
        <TabsTrigger
          value={Theme.Default}
          onClick={() => setTheme(Theme.Default)}
        >
          Default
        </TabsTrigger>
        <TabsTrigger
          value={Theme.Badminton}
          onClick={() => setTheme(Theme.Badminton)}
        >
          Badminton
        </TabsTrigger>
        <TabsTrigger
          value={Theme.Basketball}
          onClick={() => setTheme(Theme.Basketball)}
        >
          Basketball
        </TabsTrigger>
        <TabsTrigger
          value={Theme.Soccer}
          onClick={() => setTheme(Theme.Soccer)}
        >
          Soccer
        </TabsTrigger>
        <TabsTrigger
          value={Theme.Swimming}
          onClick={() => setTheme(Theme.Swimming)}
        >
          Swimming
        </TabsTrigger>
      </TabsList>
      <TabsContent value={Theme.Default} className='flex justify-center'>
        <Image
          src='/gameThemes/Profile/Default.jpg'
          width={200}
          height={200}
          alt='이미지를 불러오는데 실패했습니다.'
        />
      </TabsContent>
      <TabsContent value={Theme.Badminton} className='flex justify-center'>
        <Image
          src='/gameThemes/Profile/Badminton.png'
          width={200}
          height={200}
          alt='이미지를 불러오는데 실패했습니다.'
        />
      </TabsContent>
      <TabsContent value={Theme.Basketball} className='flex justify-center'>
        <Image
          src='/gameThemes/Profile/Basketball.png'
          width={200}
          height={200}
          alt='이미지를 불러오는데 실패했습니다.'
        />
      </TabsContent>
      <TabsContent value={Theme.Soccer} className='flex justify-center'>
        <Image src='/gameThemes/Profile/Soccer.png' width={200} height={200} />
      </TabsContent>
      <TabsContent value={Theme.Swimming} className='flex justify-center'>
        <Image
          src='/gameThemes/Profile/Swimming.png'
          width={200}
          height={200}
          alt='이미지를 불러오는데 실패했습니다.'
        />
      </TabsContent>
    </Tabs>
  );
}
