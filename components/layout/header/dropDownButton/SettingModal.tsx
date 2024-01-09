import {DialogContent} from '@/components/shadcn/ui/dialog';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import ChangeUserInfo from '@/components/userInfo/ChangeUserInfo';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/shadcn/ui/tabs';

export default function SettingsModal() {
  return (
    <DialogContent className='w-full h-4/5 flex '>
      <ScrollableContainer className='h-full'>
        <SettingModalContents />
      </ScrollableContainer>
    </DialogContent>
  );
}

function SettingModalContents() {
  return (
    <Tabs
      defaultValue='account'
      className='flex flex-col space-y-2 items-center '
    >
      <TabsList>
        <TabsTrigger value='account'>Account</TabsTrigger>
      </TabsList>
      <TabsContent value='account' className='text-center'>
        <ChangeUserInfo />
      </TabsContent>
    </Tabs>
  );
}
