import * as React from 'react';
import {Check, Plus, Send} from 'lucide-react';
import {type FriendInfo} from '@/components/alarm/FriendRequest';
import {cn} from '@/lib/utils';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/shadcn/avatar';
import {Button} from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/shadcn/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/shadcn/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/shadcn/dialog';
import {Input} from '@/components/shadcn/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';
import AvatarIcon from '../avatar/AvatarIcon';

const friendInfos = [
  {
    id: 'RandomUUid',
    name: 'jjin',
    profile_image: 'polarbear_ski',
    introduction: 'I love badminton',
    current_status: 'INGAME'
  },
  {
    id: 'RandomUUid',
    name: 'daejlee',
    profile_image: 'rhino_health',
    introduction: '난 대지리다!',
    current_status: 'OFFLINE'
  },
  {
    id: 'RandomUUid',
    name: 'joushin',
    profile_image: 'gorilla_baseBall',
    introduction: '난 조신이다!',
    current_status: 'OFFLINE'
  },
  {
    id: 'uuid',
    name: 'hkong',
    profile_image: 'koala_health',
    current_status: 'OFFLINE',
    introduction: 'I love Swimming~'
  },
  {
    id: 'uuid',
    name: 'Seoyoo',
    profile_image: 'shark_health',
    current_status: 'ONLINE',
    introduction: 'I love Health'
  }
] as const;

export function CardsChat() {
  const [open, setOpen] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<FriendInfo[]>([]);

  const [messages, setMessages] = React.useState([
    {
      role: 'agent',
      content: 'Hi, how can I help you today?'
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my account."
    },
    {
      role: 'agent',
      content: 'What seems to be the problem?'
    },
    {
      role: 'user',
      content: "I can't log in."
    }
  ]);
  const [input, setInput] = React.useState('');
  const inputLength = input.trim().length;

  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center'>
          <div className='flex items-center space-x-4'>
            <AvatarIcon avatarName='sloth_health' />
            <div>
              <p className='text-sm font-medium leading-none'>Sofia Davis</p>
              <p className='text-sm text-muted-foreground'>m@example.com</p>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size='icon'
                  variant='outline'
                  className='ml-auto rounded-full'
                  onClick={() => setOpen(true)}
                >
                  <Plus className='h-4 w-4' />
                  <span className='sr-only'>New message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.role === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              setMessages([
                ...messages,
                {
                  role: 'user',
                  content: input
                }
              ]);
              setInput('');
            }}
            className='flex w-full items-center space-x-2'
          >
            <Input
              id='message'
              placeholder='Type your message...'
              className='flex-1'
              autoComplete='off'
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type='submit' size='icon' disabled={inputLength === 0}>
              <Send className='h-4 w-4' />
              <span className='sr-only'>Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='gap-0 p-0 outline-none'>
          <DialogHeader className='px-4 pb-4 pt-5'>
            <DialogTitle>New message</DialogTitle>
            <DialogDescription>
              Invite a user to this thread. This will create a new group
              message.
            </DialogDescription>
          </DialogHeader>
          <Command className='overflow-hidden rounded-t-none border-t'>
            <CommandInput placeholder='Search user...' />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className='p-2'>
                {friendInfos.map((user) => (
                  <CommandItem
                    key={user.email}
                    className='flex items-center px-2'
                    onSelect={() => {
                      if (selectedUsers.includes(user)) {
                        return setSelectedUsers(
                          selectedUsers.filter(
                            (selectedUser) => selectedUser !== user
                          )
                        );
                      }

                      return setSelectedUsers(
                        [...users].filter((u) =>
                          [...selectedUsers, user].includes(u)
                        )
                      );
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt='Image' />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className='ml-2'>
                      <p className='text-sm font-medium leading-none'>
                        {user.name}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {user.email}
                      </p>
                    </div>
                    {selectedUsers.includes(user) ? (
                      <Check className='ml-auto flex h-5 w-5 text-primary' />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className='flex items-center border-t p-4 sm:justify-between'>
            {selectedUsers.length > 0 ? (
              <div className='flex -space-x-2 overflow-hidden'>
                {selectedUsers.map((user) => (
                  <Avatar
                    key={user.email}
                    className='inline-block border-2 border-background'
                  >
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            ) : (
              <p className='text-sm text-muted-foreground'>
                Select users to add to this thread.
              </p>
            )}
            <Button
              disabled={selectedUsers.length < 2}
              onClick={() => {
                setOpen(false);
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
