import {User} from '@/lib/classes/User';
import {DMType} from '@/lib/types';
import {DM} from '@/lib/classes/DM';
import UserInfoCard from '../userInfoCard/UserInfoCard';

interface DMCardProps {
  dmInfo: DMType;
  myName: string;
  className?: string;
}

export default function DMCard({dmInfo, myName, className = ''}: DMCardProps) {
  const dm = new DM(dmInfo, myName);
  const side = dm.isReceivedMessage ? 'left' : 'right';
  const justify = dm.isReceivedMessage ? 'justify-start' : 'justify-end';
  return (
    <div
      className={`flex flex-row w-full h-fit items-center ${justify} ${className}`}
    >
      <UserInfoCard
        userInfo={dm.senderInfo}
        size='sm'
        side={side}
        printIntro
        insteadOfIntro={dm.content}
        showStatus={false}
        className='bg-custom2'
      />
    </div>
  );
}
