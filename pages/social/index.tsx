import ResponsiveContainer from '@/components/container/ResponsiveContainer';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import {Button} from '@/components/shadcn/ui/button';
import {Input} from '@/components/shadcn/ui/input';
import {Switch} from '@/components/shadcn/ui/switch';
import {Search} from 'lucide-react';
import * as API from '@/DummyBackend/socialAPI';
import {signal, effect} from '@preact/signals-react';
import {Label} from '@/components/shadcn/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/shadcn/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/ui/select';

import {userStatus} from '@/lib/types';
import {Value} from '@radix-ui/react-select';

import * as React from 'react';
import {Check, ChevronsUpDown} from 'lucide-react';

import {cn} from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/shadcn/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/shadcn/ui/popover';

// type target = 'friend' | 'all users';
// const searchTarget = signal<target>('friend');
// type status = 'Online' | 'Offline' | 'In Game' | 'All';
// const searchTargetStatus = signal<status>('All');

// interface SocialPageNavBarProps {
//   className?: string;
// }

// function SocialPageNavBar({className}: SocialPageNavBarProps) {
//   return (
//     <ResponsiveContainer
//       className={`flex flex-col sm:flex-row w-full justify-between items-center gap-5 py-3 bg-custom2 rounded-2xl ${className}`}
//     >
//       <div className='flex w-full items-center justify-between sm:justify-normal gap-6'>
//         <div className='flex items-center gap-3 hover:scale-[120%] transition-transform px-3'>
//           <Switch
//             className=''
//             id='search-target'
//             onCheckedChange={() => {
//               searchTarget.value =
//                 searchTarget.value === 'friend' ? 'all users' : 'friend';
//             }}
//           />
//           <p>{searchTarget.value.toUpperCase()}</p>
//         </div>

//         <Select
//           onValueChange={() => {
//             console.log('searchTargetStatus: ' + searchTargetStatus.value);
//           }}
//           defaultValue='All'
//         >
//           <SelectTrigger className='w-32'>
//             <SelectValue placeholder='Select' />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem
//               value='All'
//               onSelect={() => {
//                 console.log("select 'All'");
//                 searchTargetStatus.value = 'All';
//               }}
//             >
//               All
//             </SelectItem>
//             <SelectItem
//               value='Online'
//               onSelect={() => {
//                 searchTargetStatus.value = 'Online';
//               }}
//             >
//               Online
//             </SelectItem>
//             <SelectItem value='Offline'>Offline</SelectItem>
//             <SelectItem value='InGame'>In Game</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <div className='flex flex-row items-center w-full sm:w-96 gap-3'>
//         <Input type='text' placeholder='user name' className='h-11' />
//         <Button variant='iconBtn' size='icon' className='p-2'>
//           <Search />
//         </Button>
//       </div>
//     </ResponsiveContainer>
//   );
// }

export default function SocialPage() {
  const users = API.social__getUsers();
  // TODO: modify user list depends on the switch
  return (
    <>
      {/* <SocialPageNavBar className='px-5' /> */}
      <SocialPageNavBar />
    </>
  );
}
