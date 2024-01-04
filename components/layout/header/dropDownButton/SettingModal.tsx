import React, {useEffect, useState} from 'react';
import {Switch} from '@/components/shadcn/ui/switch';
import {Label} from '@/components/shadcn/ui/label';
import {DialogContent} from '@/components/shadcn/ui/dialog';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import ChangeUserInfo from '@/components/userInfo/ChangeUserInfo';
import UnMemberBtn from '@/components/button/UnMemberBtn';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/shadcn/ui/tabs';
import LinkBtn from '@/components/button/LinkBtn';
import useAxios from '@/hooks/useAxios';

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
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const {fetchData, isSuccess} = useAxios();
  useEffect(() => {
    if (isSuccess === true) setIs2faEnabled(!is2faEnabled);
  }, [isSuccess]);
  return (
    // <div className='flex flex-col'>
    <Tabs
      defaultValue='account'
      className='flex flex-col space-y-2 items-center '
    >
      <TabsList>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='another'>Another</TabsTrigger>
      </TabsList>
      <TabsContent value='account' className='text-center'>
        <ChangeUserInfo />
      </TabsContent>
      <TabsContent
        value='another'
        className='flex flex-col  justify-center text-center space-y-2'
      >
        <div className='flex justify-center space-x-2'>
          <Switch
            id='two-step'
            checked={is2faEnabled}
            onCheckedChange={() => {
              fetchData({
                method: 'put',
                url: '/users',
                body: {
                  is2faEnabled: !is2faEnabled
                }
              });
            }}
          />
          <Label htmlFor='two-step'>2단계 인증 활성화</Label>
        </div>
        <LinkBtn link='/welcome/setEmail'>2단계 인증 이메일 변경</LinkBtn>
        <UnMemberBtn>회원 탈퇴</UnMemberBtn>
      </TabsContent>
    </Tabs>
    // </div>
  );
}
