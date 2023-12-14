import {Tabs, TabsList, TabsTrigger} from '@/components/shadcn/ui/tabs';

export default function ChildTab({setTheme}: any) {
  return (
    <Tabs defaultValue='Theme'>
      <TabsList>
        <TabsTrigger value='Theme1' onClick={() => setTheme('Theme1')}>
          Theme1
        </TabsTrigger>
        <TabsTrigger value='Theme2' onClick={() => setTheme('Theme2')}>
          Theme2
        </TabsTrigger>
        <TabsTrigger value='Theme3' onClick={() => setTheme('Theme3')}>
          Theme3
        </TabsTrigger>
        <TabsTrigger value='Theme4' onClick={() => setTheme('Theme4')}>
          Theme4
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
