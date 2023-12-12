import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/shadcn/ui/tabs';
import {Ref} from 'react';

function onTabClick() {
  console.log('tab clicked');
}

export default function ChildTab(themeRef: Ref<string>) {
  return (
    <Tabs defaultValue='theme'>
      <TabsList>
        <TabsTrigger value='theme1'>Theme1</TabsTrigger>
        <TabsTrigger value='theme2'>Theme2</TabsTrigger>
        <TabsTrigger value='theme3'>Theme3</TabsTrigger>
        <TabsTrigger value='theme4'>Theme4</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
