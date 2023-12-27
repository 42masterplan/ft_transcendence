import UserInfoCard from '@/components/card/userInfoCard/UserInfoCard';
import RequestButton from './RequestButton';
import {friendRequest} from '@/DummyBackend/notificationAPI';
import * as Type from '@/lib/types';
import {User} from '@/lib/classes/User';
import useAxios from '@/hooks/useAxios';
import {useEffect} from 'react';
import {useToast} from '@/components/shadcn/ui/use-toast';

export default function FriendRequestCard({request}: {request: friendRequest}) {
  const notificationShooter: Type.UserInfo = new User();
  notificationShooter.name = request.friend.name;
  notificationShooter.profileImage = request.friend.profileImage;
  const {fetchData, response, isSuccess} = useAxios();
  const {toast} = useToast();

  const handleAccept = () => {
    fetchData({
      method: 'put',
      url: '/users/friends/request',
      body: {
        friendId: request.id
      }
    });
  };
  const handleReject = () => {
    fetchData({
      method: 'delete',
      url: `/users/friends/request/${request.id}`
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Friend request accepted',
        description: 'You are now friends with ' + notificationShooter.name
      });
    } else {
      toast({
        title: 'Friend request rejected',
        description: 'You are not friends with ' + notificationShooter.name
      });
    }
  }, [isSuccess]);
  return (
    <div className='flex flex-row justify-between items-center'>
      <UserInfoCard
        userInfo={notificationShooter}
        showStatus={false}
        size='sm'
      />
      <RequestButton
        requestType='friend'
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
}
