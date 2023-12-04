import React from 'react';

import useChatSocket from '@/hooks/useChatSocket';
import {useCallback, useEffect, useState} from 'react';
import AvatarIcon from '@/components/avatar/AvatarIcon';
import {FcUnlock} from 'react-icons/fc';
import useSocketAction from '@/hooks/useSocketAction';
interface userListType {
  channelId: string;
  userId: string;
  profileImage: string;
  userName: string;
}
export default function BanUserListSlider({channelId}: {channelId: string}) {
  const [socket] = useChatSocket('channel');
  const [adminUserList, setadminUserList] = useState([] as userListType[]);
  const adminUserHandler: (res: userListType[]) => void = useCallback(
    (res: userListType[]) => {
      setadminUserList(res);
    },
    []
  );
  const participantsHandler: (res: userListType[]) => void = useCallback(
    (res: userListType[]) => {
      setadminUserList(res);
    },
    []
  );
  useEffect(() => {
    socket.on('getBannedUsers', adminUserHandler);
    socket.on('getParticipants', participantsHandler);
    socket.emit('getAdminUsers', {channelId: channelId});
    return () => {
      socket.off('getAdminUsers', participantsHandler);
    };
  }, [socket, participantsHandler, channelId]);

  return (
    <div className=' border border-amber-400'>
      <p>밴 유저 목록</p>
      <div className='flex overflow-x-auto'>
        {adminUserList.map((banUser: userListType) => {
          return (
            <div className='flex'>
              <FcUnlock
                className='h-10 w-10 hover:bg-custom4 rounded-full'
                onClick={() => {}}
              />
              <p>
                <AvatarIcon
                  avatarName={banUser.profileImage}
                  size='h-20 w-20'
                />
                <p>{banUser.userName}</p>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
