import useSocket from '@/hooks/useSocket';
import {useCallback, useEffect, useState} from 'react';
import AvatarIcon from '@/components/avatar/AvatarIcon';
import {BiSolidXCircle} from 'react-icons/bi';
import useSocketAction from '@/hooks/useSocketAction';
interface BanUserListType {
  channelId: string;
  userId: string;
  profileImage: string;
  userName: string;
}
export default function BanUserListSlider({channelId}: {channelId: string}) {
  const [socket] = useSocket('channel');
  const [banUserList, setBanUserList] = useState([] as BanUserListType[]);
  const banUserHandler: (res: BanUserListType[]) => void = useCallback(
    (res: BanUserListType[]) => {
      setBanUserList(res);
    },
    []
  );
  useEffect(() => {
    socket.on('getBannedUsers', banUserHandler);
    socket.emit('getBannedUsers', {channelId: channelId});
    return () => {
      socket.off('getBannedUsers', banUserHandler);
    };
  }, [socket, banUserHandler, channelId]);
  const unBanUserAction = useSocketAction(
    'unBanUser',
    'unBanUser Success!',
    '유저를 밴 해제했습니다. 이제 유저는 다시 입장 할 수 있습니다.',
    'unBanUser Fail!',
    '유저를 밴 해제하는데 실패했습니다.'
  );
  return (
    <div className=' border border-amber-400 h-40 p-2'>
      <p>밴 유저 목록</p>
      <div className='flex overflow-x-auto'>
        {banUserList.map((banUser: BanUserListType) => {
          return (
            <div className='flex'>
              <BiSolidXCircle
                className='h-10 w-10 hover:bg-custom4 rounded-full absolute z-10 '
                onClick={() => {
                  unBanUserAction(channelId, banUser.userId, banUser.userName);
                }}
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
