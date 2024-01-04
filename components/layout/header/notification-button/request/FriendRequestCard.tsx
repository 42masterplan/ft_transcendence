import UserInfoCard from '@/components/card/userInfoCard/UserInfoCard';
import RequestButton from './RequestButton';
import {friendRequest} from '@/types/notification';
import {userInfoType} from '@/types/user';
import {User} from '@/classes/User';
import useAxios from '@/hooks/useAxios';
import {useEffect} from 'react';
import {useToast} from '@/components/shadcn/ui/use-toast';

export default function FriendRequestCard({
  request,
  fetchList
}: {
  request: friendRequest;
  fetchList: () => void;
}) {
  const notificationShooter: userInfoType = new User();
  notificationShooter.name = request.friend.name;
  notificationShooter.profileImage = request.friend.profileImage;
  const {fetchData: accept, isSuccess: isAcceptSuccess} = useAxios();
  const {fetchData: reject, isSuccess: isRejectSuccess} = useAxios();
  const {toast} = useToast();

  const handleAccept = () => {
    accept({
      method: 'put',
      url: '/users/friends/request',
      body: {
        requestId: request.id
      }
    });
  };
  const handleReject = () => {
    reject({
      method: 'delete',
      url: `/users/friends/request/${request.id}`
    });
  };
  useEffect(() => {
    if (isAcceptSuccess) fetchList();
  }, [isAcceptSuccess]);
  useEffect(() => {
    if (isRejectSuccess) fetchList();
  }, [isRejectSuccess]);
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
