import UserInfoCard from '@/components/card/userInfoCard/UserInfoCard';
import RequestButton from './RequestButton';
import {gameRequest} from '@/types/notification';
import {GameInfoType} from '@/types/game';
import {Game} from '@/classes/Game';
import {User} from '@/classes/User';
import useSocket from '@/hooks/useSocket';
import {userInfoType} from '@/types/user';

type NotificationCardProps = {
  request: gameRequest;
  setMatchRequests: any;
  setNotificationCount: any;
};

export default function MatchRequestCard(props: NotificationCardProps) {
  const {request, setMatchRequests, setNotificationCount} = props;
  const newMatch: GameInfoType = new Game();
  const notificationShooter: userInfoType = new User();
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
