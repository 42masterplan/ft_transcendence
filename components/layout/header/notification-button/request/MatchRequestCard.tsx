import UserInfoCard from '@/components/card/userInfoCard/UserInfoCard';
import RequestButton from './RequestButton';
import ResponsiveContainer from '@/components/container/ResponsiveContainer';
import * as dummyAPI from '@/DummyBackend/notificationAPI';
import * as Type from '@/lib/types';
import {Game} from '@/lib/classes/Game';
import {User} from '@/lib/classes/User';

type NotificationCardProps = {
  request: dummyAPI.matchRequest;
};

export default function MatchRequestCard({request}: NotificationCardProps) {
  const newMatch: Type.GameInfo = new Game();
  const notificationShooter: Type.UserInfo = new User();
  notificationShooter.name = request.friend_id;
  notificationShooter.profileImage = request.profile_image;
  newMatch.id = request.game_id;
  // TODO: add game type

  // TODO: implement this
  const handleAccept = () => {
    console.log('Match accepted');
  };

  const handleReject = () => {
    console.log('Match rejected');
  };

  return (
    <ResponsiveContainer className='flex-row justify-between items-center'>
      <UserInfoCard
        userInfo={notificationShooter}
        showStatus={false}
        size='sm'
      />
      <RequestButton
        requestType='match'
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </ResponsiveContainer>
  );
}
