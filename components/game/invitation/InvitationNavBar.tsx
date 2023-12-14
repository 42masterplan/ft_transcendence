import {Input} from '@/components/shadcn/ui/input';
import * as React from 'react';

interface SocialPageNavBarProps {
  setSearchTargetInput: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

export function InvitationNavBar({
  setSearchTargetInput,
  className = ''
}: SocialPageNavBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTargetInput(e.target.value);
  };
  return (
    <div
      className={`flex flex-col sm:flex-row w-full h-32s justify-between items-center gap-5 px-3 py-3 bg-custom2 rounded-2xl ${className}`}
    >
      <div className='flex flex-row items-center w-full sm:w-96 gap-3'>
        <Input
          type='text'
          placeholder='user name'
          className='h-11'
          onInput={handleInputChange}
        />
      </div>
    </div>
  );
}
