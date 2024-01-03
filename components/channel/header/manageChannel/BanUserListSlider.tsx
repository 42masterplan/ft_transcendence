import useSocket from '@/hooks/useSocket';
import {useRef, useEffect, useState} from 'react';
import AvatarIcon from '@/components/avatar/AvatarIcon';
import {BiSolidXCircle} from 'react-icons/bi';
import {useToast} from '@/components/shadcn/ui/use-toast';
interface BanUserListType {
  channelId: string;
  userId: string;
  profileImage: string;
  userName: string;
}
export default function BanUserListSlider({
  channelId,
  setOpen
}: {
  channelId: string;
  setOpen: any;
}) {
  const [socket] = useSocket('channel');
  const [banUserList, setBanUserList] = useState([] as BanUserListType[]);
  const banUserListRef = useRef(banUserList);
  const {toast} = useToast();
  useEffect(() => {
    socket.on(
      'getBannedUsers',
      (res: {bannedUsers: BanUserListType[]; channelId: string}) => {
        if (res.channelId !== channelId) return;
        setBanUserList(res.bannedUsers);
        banUserListRef.current = res.bannedUsers;
      }
    );
    socket.emit('getBannedUsers', {channelId: channelId});
    return () => {
      socket.off('getBannedUsers');
    };
  }, [socket]);

  return (
    <div className=' border border-amber-400 h-40 p-2'>
      <p>밴 유저 목록</p>
      <div className='flex overflow-x-auto'>
        {banUserList.map((banUser: BanUserListType) => {
          return (
            <div className='flex' key={banUser.userId}>
              <BiSolidXCircle
                className='h-6 w-6 hover:bg-custom4 rounded-full absolute z-10 '
                onClick={() => {
                  socket.emit(
                    'unBanUser',
                    {
                      channelId: channelId,
                      userId: banUser.userId,
                      userName: banUser.userName
                    },
                    (res: string) => {
                      if (res === 'unBanUser Success!') {
                        toast({
                          title: '밴 해제 성공',
                          description: res
                        });
                        setOpen(false);
                      } else {
                        toast({
                          title: '밴 해제 실패',
                          description: res,
                          variant: 'destructive'
                        });
                        socket.emit('getBannedUsers', {channelId: channelId});
                      }
                    }
                  );
                }}
              />
              <div>
                <AvatarIcon
                  avatarName={banUser.profileImage}
                  size='h-20 w-20'
                />
                <div>{banUser.userName}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
