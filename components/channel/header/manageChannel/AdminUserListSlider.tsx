import React from 'react';

import useSocket from '@/hooks/useSocket';
import {useEffect, useState, useRef} from 'react';
import AvatarIcon from '@/components/avatar/AvatarIcon';

import {BiSolidXCircle} from 'react-icons/bi';
import {useToast} from '@/components/shadcn/ui/use-toast';

interface userListType {
  channelId: string;
  userId: string;
  profileImage: string;
  userName: string;
}
export default function AdminListSlider({
  channelId,
  setOpen
}: {
  channelId: string;
  setOpen: any;
}) {
  const [socket] = useSocket('channel');
  const [adminUserList, setAdminUserList] = useState([] as userListType[]);
  const {toast} = useToast();
  const adminUserListRef = useRef(adminUserList);
  useEffect(() => {
    socket.on(
      'getAdminUsers',
      (res: {adminUsers: userListType[]; channelId: string}) => {
        if (res.channelId !== channelId) return;
        setAdminUserList(res.adminUsers);
        adminUserListRef.current = res.adminUsers;
      }
    );
    socket.emit('getAdminUsers', {channelId: channelId});
    return () => {
      socket.off('getAdminUsers');
    };
  }, [socket, channelId]);
  return (
    <div className=' border border-amber-400 h-40'>
      <p>관리자 유저 목록</p>
      <div className='flex overflow-x-auto'>
        {adminUserList.map((adminUser: userListType) => {
          return (
            <div className='flex' key={adminUser.userId}>
              <BiSolidXCircle
                className='h-6 w-6 hover:bg-custom4 rounded-full absolute z-10'
                onClick={() => {
                  socket.emit(
                    'changeAdmin',
                    {
                      channelId: channelId,
                      userId: adminUser.userId,
                      types: 'user'
                    },
                    (res: string) => {
                      if (res === 'changeAdmin Success!') {
                        toast({
                          title: '관리자 권한이 해제되었습니다.',
                          description: '관리자 권한이 해제되었습니다.'
                        });
                        setOpen(false);
                      } else {
                        toast({
                          title: '관리자 권한 해제 실패',
                          description: res
                        });
                        socket.emit('getAdminUsers', {channelId: channelId});
                      }
                    }
                  );
                }}
              />
              <div>
                <AvatarIcon
                  avatarName={adminUser.profileImage}
                  size='h-20 w-20'
                />
                <div>{adminUser.userName}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
