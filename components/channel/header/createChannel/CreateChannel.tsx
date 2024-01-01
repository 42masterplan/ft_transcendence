import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/shadcn/ui/dropdown-menu';
import {Button} from '@/components/shadcn/ui/button';
import {Input} from '@/components/shadcn/ui/input';
import {Label} from '@/components/shadcn/ui/label';
import {MessageSquarePlus} from 'lucide-react';
import Axios from '@/api';
import {Dispatch, SetStateAction, useState} from 'react';
import {userType, selectUserType} from '@/types/user';
import useSocket from '@/hooks/useSocket';
import {useToast} from '@/components/shadcn/ui/use-toast';
const SelectChannelType = ({
  channelType,
  setChannelType
}: {
  channelType: string;
  setChannelType: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className='grid grid-cols-4 items-center gap-6'>
      <Label htmlFor='channel_type' className='text-right'>
        채널 유형
      </Label>
      <Select
        value={channelType}
        onValueChange={(type) => {
          setChannelType(type);
          console.log(type);
        }}
      >
        <SelectTrigger className=' bg-custom2 w-[342px]'>
          <SelectValue placeholder='채널 유형 선택' id='channel_type' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>채널 유형 선택</SelectLabel>
            <SelectItem value='Public'>Public</SelectItem>
            <SelectItem value='Private'>Private</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const ChannelNameInput = ({
  channelName,
  setChannelName
}: {
  channelName: string;
  setChannelName: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className='grid grid-cols-4 items-center gap-6'>
      <Label htmlFor='channel_name' className='text-right'>
        채널 명
      </Label>
      <Input
        className='col-span-3'
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
    </div>
  );
};

const InviteFriendSelector = ({
  inviteFriendList,
  setInviteFriendList
}: {
  inviteFriendList: selectUserType[];
  setInviteFriendList: Dispatch<SetStateAction<selectUserType[]>>;
}) => {
  return (
    <div className='grid grid-cols-4 items-center gap-6'>
      <Label htmlFor='description' className='text-right'>
        친구 초대
      </Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='col-span-3 bg-custom2'>
            친구 초대
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[280px] max-h-[300px] overflow-auto'>
          <DropdownMenuLabel> 친구 초대</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {inviteFriendList.map((friendInfo, idx) => {
            return (
              <DropdownMenuCheckboxItem
                key={friendInfo.id}
                className='col-span-3'
                checked={friendInfo.checked}
                onClick={() => {
                  setInviteFriendList((prev) => {
                    const newFriendList = [...prev];
                    newFriendList[idx].checked = !newFriendList[idx].checked;
                    return newFriendList;
                  });
                }}
              >
                {friendInfo.name}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const PasswordInput = ({
  password,
  setPassword
}: {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className='grid grid-cols-4 items-center gap-6'>
      <Label htmlFor='password' className='text-right'>
        password
      </Label>
      <Input
        id='password'
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className='col-span-3'
      />
    </div>
  );
};

export default function CreateChannel() {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelType, setChannelType] = useState('');
  const [password, setPassword] = useState('');
  const [inviteFriendList, setInviteFriendList] = useState(
    [] as selectUserType[]
  );
  const [socket] = useSocket('channel');
  const {toast} = useToast();
  const fetchUserInfos = async () => {
    try {
      const {data}: {data: userType[]} = await Axios.get(`/users/friends`, {
        params: {id: 'user_id'}
      });
      console.log(data);
      const results = [] as any;
      data.forEach((value) => {
        results.push({
          name: value.name,
          id: value.id,
          checked: false
        });
      });
      setInviteFriendList(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const createChannel = () => {
    if (
      channelName.trim().length === 0 ||
      channelType.length === 0 ||
      channelName.length > 16 ||
      password.length > 16
    ) {
      toast({
        title: '채널 생성 실패',
        description:
          '채널 이름과 채널 유형을 입력해주세요! 채널명과 비밀번호의 최대 길이는 16자입니다.(비밀번호는 선택사항입니다.)',
        variant: 'destructive',
        duration: 3000
      });
      return;
    }
    socket.emit(
      'createChannel',
      {
        name: channelName.trim(),
        password: password.replace(/\s/g, ''),
        invitedFriendIds: inviteFriendList.map((friendInfo) => {
          if (friendInfo.checked) return friendInfo.id;
        }),
        status: channelType
      },
      (msg: string) => {
        if (msg === 'createChannel Success!') {
          toast({
            title: '채널 생성 성공',
            description: msg
          });

          setChannelName('');
          setPassword('');
          setChannelType('');
          setInviteFriendList([]);
          setOpen(false);
        } else {
          toast({
            title: '채널 생성 실패',
            description: msg,
            variant: 'destructive'
          });
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className='rounded-full bg-custom4'
          onClick={() => {
            fetchUserInfos();
          }}
        >
          <MessageSquarePlus className='h-6 w-6' />
          <p className='text-6'> 채널 생성</p>
          <span className='sr-only'>Public Room List</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-custom1'>
        <DialogHeader>
          <DialogTitle className='text-center'>채널 생성</DialogTitle>
          <DialogDescription className='text-center'>
            채널을 원하는대로 만들 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-6 py-4'>
          <SelectChannelType
            channelType={channelType}
            setChannelType={setChannelType}
          />
          <ChannelNameInput
            channelName={channelName}
            setChannelName={setChannelName}
          />
          <InviteFriendSelector
            inviteFriendList={inviteFriendList}
            setInviteFriendList={setInviteFriendList}
          />
          <PasswordInput password={password} setPassword={setPassword} />
        </div>
        <DialogFooter>
          <Button type='submit' className='w-full' onClick={createChannel}>
            채널 생성하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
