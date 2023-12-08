import useChatSocket from '@/hooks/useChatSocket';
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
  const [socket] = useChatSocket('channel');
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
                      title: 'Are you sure you want to log out?',
                      description: 'This action cannot be undone.',

                      action: (
                        <ToastAction
                          altText='Log Out'
                          onClick={() => {
                            socket.emit('setAdmin', {
                              channelId: channelId,
                              userId: user.userId
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
                  onClick={() => {}}
                  id='user_ban'
                />
                <Image
                  src='/icon/kick.png'
                  alt={user.userName}
                  width={50}
                  height={50}
                  className='h-7 w-7 lg:hover:scale-125 transition-transform ease-in-out duration-200 rounded-full'
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
