import {Button} from '@/components/shadcn/ui/button';
import {Input} from '@/components/shadcn/ui/input';
import {Switch} from '@/components/shadcn/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/ui/select';

import * as React from 'react';

import {
  socialPageTargetUser as target,
  socialPageUserStatus as status
} from '@/lib/types';
import {set} from 'react-hook-form';

interface SocialPageNavBarProps {
  searchTarget: target;
  setSearchTarget: React.Dispatch<React.SetStateAction<target>>;
  searchTargetStatus: status;
  setSearchTargetStatus: React.Dispatch<React.SetStateAction<status>>;
  searchTargetInput: string;
  setSearchTargetInput: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

export function SocialPageNavBar({
  searchTarget,
  setSearchTarget,
  searchTargetStatus,
  setSearchTargetStatus,
  searchTargetInput,
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
      <div className='flex w-full items-center justify-between sm:justify-normal gap-6'>
        <div className='flex items-center gap-3 hover:scale-[110%] transition-transform px-3'>
          <Switch
            className=''
            id='search-target'
            onCheckedChange={() => {
              setSearchTarget(
                searchTarget === 'friend' ? 'all users' : 'friend'
              );
            }}
          />
          <p>{searchTarget.toUpperCase()}</p>
        </div>
        <Select
          defaultValue='All'
          onValueChange={(value) => {
            setSearchTargetStatus(value as status);
          }}
        >
          <SelectTrigger className='w-32'>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='All'>All</SelectItem>
            <SelectItem value='Online'>Online</SelectItem>
            <SelectItem value='Offline'>Offline</SelectItem>
            <SelectItem value='InGame'>InGame</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
