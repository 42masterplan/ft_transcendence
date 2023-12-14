import {Tabs, TabsList, TabsTrigger} from '@/components/shadcn/ui/tabs';
import {Theme} from '@/lib/types';

export default function ChildTab({setTheme}: any) {
  return (
    <Tabs defaultValue={Theme.Theme1}>
      <TabsList>
        <TabsTrigger
          value={Theme.Theme1}
          onClick={() => setTheme(Theme.Theme1)}
        >
          Theme1
        </TabsTrigger>
        <TabsTrigger
          value={Theme.Theme2}
          onClick={() => setTheme(Theme.Theme2)}
        >
          Theme2
        </TabsTrigger>
        <TabsTrigger
          value={Theme.Theme3}
          onClick={() => setTheme(Theme.Theme3)}
        >
          Theme3
        </TabsTrigger>
        <TabsTrigger
          value={Theme.Theme4}
          onClick={() => setTheme(Theme.Theme4)}
        >
          Theme4
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
