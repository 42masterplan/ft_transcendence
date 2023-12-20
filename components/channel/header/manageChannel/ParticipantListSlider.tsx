import useSocket from '@/hooks/useSocket';
import {useCallback, useEffect, useState} from 'react';
import AvatarIcon from '@/components/avatar/AvatarIcon';
import Image from 'next/image';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {ToastAction} from '@/components/shadcn/ui/toast';

interface userListType {
  channelId: string;
  userId: string;
  profileImage: string;
  userName: string;
}

export default function BanUserListSlider({channelId}: {channelId: string}) {
  const [socket] = useSocket('channel');
  const [participants, setParticipants] = useState([] as userListType[]);
  const [searchTerm, setSearchTerm] = useState('');
  const {toast} = useToast();
  const adminUserHandler: (res: userListType[]) => void = useCallback(
    (res: userListType[]) => {
      setParticipants(res);
    },
    []
  );

  const participantsHandler: (res: userListType[]) => void = useCallback(
    (res: userListType[]) => {
      //I want to filter me out of the list
      res = res.filter((user) => user.userName !== 'joushin'); //TODO: change this to my username
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

  // Filter participants based on search term
  const filteredParticipants = participants.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className='border border-amber-400 h-42 p-2'>
      <div className='flex justify-between'>
        <p>참여중인 유저 목록</p>
        <input
          type='text'
          placeholder='검색'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='bg-custom2 border'
        />
      </div>
      <div className='flex space-x-2'>
        {filteredParticipants.map((user: userListType) => (
          <div key={user.userId} className='flex items-center text-center'>
            <div>
              <p>
                <AvatarIcon avatarName={user.profileImage} size='h-20 w-20' />
                {user.userName}
              </p>
              <div className='flex'>
                <Image
                  src='/icon/admin.png'
                  alt={user.userName}
                  width={50}
                  height={50}
                  className='h-7 w-7 lg:hover:scale-125 transition-transform ease-in-out duration-200 rounded-full'
                  onClick={() => {
                    toast({
                      title: `${user.userName}님을 관리자로 임명하시겠습니까?`,
                      description: '관리자는 채널을 관리할 수 있습니다.',
                      action: (
                        <ToastAction
                          altText='관리자 임명'
                          onClick={() => {
                            socket.emit('changeAdmin', {
                              channelId: channelId,
                              userId: user.userId,
                              types: 'admin'
                            });
                          }}
                        >
                          관리자 임명
                        </ToastAction>
                      )
                    });
                  }}
                />
                <Image
                  src='/icon/ban-user.png'
                  alt={user.userName}
                  width={50}
                  height={50}
                  className='h-7 w-7 lg:hover:scale-125 transition-transform ease-in-out duration-200 rounded-full'
                  onClick={() => {
                    toast({
                      title: `${user.userName}님을 BAN 하시겠습니까?`,
                      description:
                        'BAN된 유저는 자동으로 채널에서 추방되며, 채널에 참여할 수 없습니다.',
                      variant: 'destructive',
                      action: (
                        <ToastAction
                          altText='BAN'
                          onClick={() => {
                            socket.emit('banUser', {
                              channelId: channelId,
                              userId: user.userId
                            });
                          }}
                        >
                          유저 BAN
                        </ToastAction>
                      )
                    });
                  }}
                />
                <Image
                  src='/icon/kick.png'
                  alt={user.userName}
                  width={50}
                  height={50}
                  className='h-7 w-7 lg:hover:scale-125 transition-transform ease-in-out duration-200 rounded-full'
                  onClick={() => {
                    toast({
                      title: `${user.userName}님을 추방 하시겠습니까?`,
                      description:
                        '이 유저는 채널에서 추방되며, 채널에는 다시 참여할 수 없습니다.',
                      variant: 'destructive',
                      action: (
                        <ToastAction
                          altText='KICK'
                          onClick={() => {
                            socket.emit('kickUser', {
                              channelId: channelId,
                              userId: user.userId
                            });
                          }}
                        >
                          유저 추방
                        </ToastAction>
                      )
                    });
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
