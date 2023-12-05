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
  const [participants, setParticipants] = useState([] as userListType[]);
  const adminUserHandler: (res: userListType[]) => void = useCallback(
    (res: userListType[]) => {
      setParticipants(res);
    },
    []
  );
  const participantsHandler: (res: userListType[]) => void = useCallback(
    (res: userListType[]) => {
      setParticipants(res);
    },
    []
  );
  useEffect(() => {
    socket.on('getParticipants', participantsHandler);
    socket.emit('getParticipants', {channelId: channelId});
    return () => {
      socket.off('getParticipants', participantsHandler);
    };
  }, [socket, participantsHandler, channelId]);

  return (
    <div className=' border border-amber-400'>
      <p>참여중인 유저 목록</p>
      <div className='flex overflow-x-auto space-x-2	 '>
        {participants.map((user: userListType) => {
          return (
            <div className='flex  text-center'>
              <FcUnlock
                className='h-7 w-7 lg:hover:scale-150 transition-transform ease-in-out duration-500 rounded-full absolute z-10'
                onClick={() => {}}
              />
              <p>
                <AvatarIcon avatarName={user.profileImage} size='h-20 w-20' />
                {user.userName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
