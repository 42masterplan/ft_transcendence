import ResponsiveContainer from '@/components/container/ResponsiveContainer';
import {Button} from '@/components/shadcn/ui/button';
import {Input} from '@/components/shadcn/ui/input';
import {Switch} from '@/components/shadcn/ui/switch';
import {Search} from 'lucide-react';
import * as API from '@/DummyBackend/socialAPI';
import {signal, effect, Signal} from '@preact/signals-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/ui/select';

import * as React from 'react';
import ScrollableContainer from '@/components/container/ScrollableContainer';

export type target = 'friend' | 'all users';
export type status = 'Online' | 'Offline' | 'InGame' | 'All';

interface SocialPageNavBarProps {
  searchTarget: Signal<target>;
  searchTargetStatus: Signal<status>;
  searchTargetInput: Signal<string>;
  className?: string;
}

export function SocialPageNavBar({
  className,
  searchTarget,
  searchTargetStatus,
  searchTargetInput
}: SocialPageNavBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchTargetInput.value = e.target.value;
  };
  return (
    <ResponsiveContainer
      className={`flex flex-col sm:flex-row w-full justify-between items-center gap-5 px-3 py-3 bg-custom2 rounded-2xl ${className}`}
    >
      <div className='flex w-full items-center justify-between sm:justify-normal gap-6'>
        <div className='flex items-center gap-3 hover:scale-[110%] transition-transform px-3'>
          <Switch
            className=''
            id='search-target'
            onCheckedChange={() => {
              searchTarget.value =
                searchTarget.value === 'friend' ? 'all users' : 'friend';
            }}
          />
          <p>{searchTarget.value.toUpperCase()}</p>
        </div>
        <Select
          defaultValue='All'
          onValueChange={(value) => {
            searchTargetStatus.value = value as status;
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
        {/* <Button variant='iconBtn' size='icon' className='p-2'>
          <Search />
        </Button> */}
      </div>
    </ResponsiveContainer>
  );
}
