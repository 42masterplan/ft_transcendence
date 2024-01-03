import {Tabs, TabsList, TabsTrigger} from '@/components/shadcn/ui/tabs';
import {Theme} from '@/lib/types';

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
        <TabsTrigger
          value={Theme.Climbing}
          onClick={() => setTheme(Theme.Climbing)}
        >
          Climbing
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
