import UserInfoCard from '@/components/card/userInfoCard/UserInfoCard';
import RequestButton from './RequestButton';
import * as dummyAPI from '@/DummyBackend/notificationAPI';
import * as Type from '@/lib/types';
import {Game} from '@/lib/classes/Game';
import {User} from '@/lib/classes/User';
import useSocket from '@/hooks/useSocket';

type NotificationCardProps = {
  request: dummyAPI.gameRequest;
  setMatchRequests: any;
  setNotificationCount: any;
};

export default function MatchRequestCard(props: NotificationCardProps) {
  const {request, setMatchRequests, setNotificationCount} = props;
  const newMatch: Type.GameInfo = new Game();
  const notificationShooter: Type.UserInfo = new User();
  const [socket] = useSocket('alarm');
  notificationShooter.name = request.userName;
  notificationShooter.profileImage = request.profileImage;
  newMatch.id = request.matchId;
  newMatch.theme = request.theme;

  //reduce notification count
  const handleAccept = () => {
    setMatchRequests((prev: any) =>
      prev.filter((match: any) => match.id !== newMatch.id)
    );
    setNotificationCount((prev: number) => prev - 1);
    socket.emit('normalGameResponse', {
      isAccept: true,
      matchId: newMatch.id
    });
  };

  const handleReject = () => {
    socket.emit('normalGameResponse', {
      isAccept: false,
      matchId: newMatch.id
    });
    setMatchRequests((prev: any) =>
      prev.filter((match: any) => match.id !== newMatch.id)
    );
    setNotificationCount((prev: number) => prev - 1);
  };

  return (
    <div className='flex flex-row justify-between items-center'>
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
    </div>
  );
}
