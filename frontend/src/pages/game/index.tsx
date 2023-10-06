import {MenubarDemo} from './Menu';
import {Button} from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/shadcn/card';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/shadcn/tabs';

export function TabsDemo() {
  return (
    <Tabs defaultValue='ladder' className='w-[400px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='ladder'>Ladder</TabsTrigger>
        <TabsTrigger value='normal'>Normal</TabsTrigger>
      </TabsList>
      <TabsContent value='ladder'>
        <Card>
          <CardHeader>
            <CardTitle>Ladder Game</CardTitle>
            <CardDescription>
              공통된 규칙을 따르며 승패를 겨루는 래더게임 입니다. 승리 혹은
              죽음뿐입니다......
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Start the Game</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value='normal'>
        <Card>
          <CardHeader>
            <CardTitle>Normal Game</CardTitle>
            <CardDescription>
              다양한 테마와 규칙을 적용할 수 있는 노멀 게임입니다. 소문에 따르면
              궁극기 등의 추가 기능이 추가될 수도 있다고 합니다만! 개발팀의
              속도에 따라 정해진다고 합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <MenubarDemo />
          </CardContent>
          <CardFooter>
            <Button>Start the Game</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default function Game() {
  return (
    <div className='w-[560px] h-[440px] p-5 bg-slate-500 rounded-[20px] flex-col justify-center items-center inline-flex'>
      <TabsDemo />
    </div>
  );
}
