import UserInfoCard from '@/components/card/userInfoCard/UserInfoCard';
import RequestButton from './RequestButton';
import ResponsiveContainer from '@/components/container/ResponsiveContainer';
import * as dummyAPI from '@/DummyBackend/notificationAPI';
import * as Type from '@/lib/types';
import {User} from '@/lib/classes/User';

interface FriendRequestCardProps {
  request: dummyAPI.friendRequest;
}

export default function FriendRequestCard({request}: FriendRequestCardProps) {
  const notificationShooter: Type.UserInfo = new User();
  notificationShooter.name = request.id;
  // notificationShooter.introduction = request.introduction; // TODO: do we need this? this will ruin the design
  notificationShooter.profileImage = request.profileImage;

  // TODO: implement this
  const handleAccept = () => {
    console.log('Friend accepted');
  };

  const handleReject = () => {
    console.log('Friend rejected');
  };

  return (
    <ResponsiveContainer className='flex-row justify-between items-center'>
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
    </ResponsiveContainer>
  );
}
