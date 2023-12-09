import ChildTab from '../../components/game/ChildTab';
import MatchMakingBtn from '../../components/game/matchmaking/LadderMatchMaking';
import NormalMatchMakingBtn from '@/components/game/matchmaking/NormalMatchMaking';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/shadcn/ui/card';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/shadcn/ui/tabs';

export default function Game() {
  return (
    <div className='flex justify-center items-center'>
      <Tabs defaultValue='ladder' className='w-full h-full pt-20 sm:max-w-2xl '>
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
            <CardFooter className='flex justify-center'>
              <MatchMakingBtn />
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='normal'>
          <Card>
            <CardHeader>
              <CardTitle>Normal Game</CardTitle>
              <CardDescription>
                다양한 테마와 규칙을 적용할 수 있는 노멀 게임입니다. 친구를
                초대해 즐겨보세요!
              </CardDescription>
            </CardHeader>
            <CardContent className='flex justify-center'>
              <ChildTab />
            </CardContent>
            <CardFooter className='flex justify-center'>
              <NormalMatchMakingBtn />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
