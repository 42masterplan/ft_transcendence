import React from 'react';

import useSocket from '@/hooks/useSocket';
import {useCallback, useEffect, useState} from 'react';
import AvatarIcon from '@/components/avatar/AvatarIcon';

import useSocketAction from '@/hooks/useSocketAction';
import {BiSolidXCircle} from 'react-icons/bi';
interface userListType {
  channelId: string;
  userId: string;
  profileImage: string;
  userName: string;
}
export default function AdminListSlider({channelId}: {channelId: string}) {
  const [socket] = useSocket('channel');
  const [adminUserList, setadminUserList] = useState([] as userListType[]);
  const adminUserHandler: (res: userListType[]) => void = useCallback(
    (res: userListType[]) => {
      setadminUserList(res);
    },
    []
  );
  useEffect(() => {
    socket.on('getAdminUsers', adminUserHandler);
    socket.emit('getAdminUsers', {channelId: channelId});
    return () => {
      socket.off('getAdminUsers', adminUserHandler);
    };
  }, [socket, adminUserHandler, channelId]);
  return (
    <div className=' border border-amber-400 h-40'>
      <p>관리자 유저 목록</p>
      <div className='flex overflow-x-auto'>
        {adminUserList.map((adminUser: userListType) => {
          return (
            <div className='flex'>
              <BiSolidXCircle
                className='h-10 w-10 hover:bg-custom4 rounded-full absolute z-10'
                onClick={() => {
                  socket.emit('changeAdmin', {
                    channelId: channelId,
                    userId: adminUser.userId,
                    types: 'remove'
                  });
                }}
              />
              <p>
                <AvatarIcon
                  avatarName={adminUser.profileImage}
                  size='h-20 w-20'
                />
                <p>{adminUser.userName}</p>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
