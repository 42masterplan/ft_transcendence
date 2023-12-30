import {Button} from '@/components/shadcn/ui/button';
import {Gamepad2} from 'lucide-react';
import NormalMatchMakingDialog from '@/components/game/matchmaking/NormalMatchMakingDialog';
import {useState} from 'react';

type MatchRequestButtonProps = {
  userId: string;
};

export default function MatchRequestButton({userId}: MatchRequestButtonProps) {
  const [isWaiting, setIsWaiting] = useState(false);
  const [matchId, setMatchId] = useState('');
  const [isThemeSelect, setIsThemeSelect] = useState(false);
  return (
    <>
      <Button
        size='icon'
        variant='outline'
        className='hover:scale-[115%] duration-200'
        onClick={() => setIsThemeSelect(true)}
      >
        <Gamepad2 />
      </Button>
      <NormalMatchMakingDialog
        isWaiting={isWaiting}
        setIsWaiting={setIsWaiting}
        matchId={matchId}
        setMatchId={setMatchId}
        userId={userId}
        isThemeSelecting={isThemeSelect}
        setIsThemeSelecting={setIsThemeSelect}
      />
    </>
  );
}
