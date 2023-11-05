import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/shadcn/ui/tabs';
import Options from './GameOptions';

export default function ChildTab() {
  return (
    <Tabs defaultValue='theme'>
      <TabsList>
        <TabsTrigger value='theme1'>Theme1</TabsTrigger>
        <TabsTrigger value='theme2'>Theme2</TabsTrigger>
        <TabsTrigger value='theme3'>Theme3</TabsTrigger>
        <TabsTrigger value='theme4'>Theme4</TabsTrigger>
      </TabsList>
      <TabsContent value='theme1'>
        <Options />
      </TabsContent>
      <TabsContent value='theme2'>
        <Options />
      </TabsContent>
      <TabsContent value='theme3'>
        <Options />
      </TabsContent>
      <TabsContent value='theme4'>
        <Options />
      </TabsContent>
    </Tabs>
  );
}
