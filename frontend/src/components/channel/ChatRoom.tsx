import * as React from 'react';
import {Check, Send} from 'lucide-react';
import {LuUsers} from 'react-icons/lu';
import {cn} from '@/lib/utils';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/shadcn/avatar';
import {Button} from '@/components/shadcn/button';
import {useContext, useRef, useEffect} from 'react';
import {APIContext, type FriendInfoType} from '../Layout';

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

export function CardsChat() {
  const {friendInfos, chatInfos, chatMyInfo} = useContext(APIContext);
  const [open, setOpen] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<FriendInfoType[]>(
    []
  );
  const [messages, setMessages] = React.useState(chatInfos);
  const [input, setInput] = React.useState('');
  const inputLength = input.trim().length;

  const messageEndRef = useRef<HTMLDivElement>();
  useEffect(() => {
    messageEndRef.current.scrollIntoView({behavior: 'smooth'});
  }, [messages]);
  return (
    <>
      <Card className='w-full flex flex-col h-100'>
        <CardHeader className='flex flex-row items-center '>
          <div className='flex items-center space-x-4'>
            <div className='font-bold text-2xl'>채팅방 제목</div>
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
                  <LuUsers className='h-4 w-4' />
                  <span className='sr-only'>참여 중 유저 목록</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>참여 중 유저 목록</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col space-y-4 max-h-[800px] overflow-y-auto '>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex w-max max-w-[75%] rounded-lg px-3  text-sm',
                  message.id === chatMyInfo.id
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <div className='text-center p-1'>
                  <AvatarIcon size='small' avatarName={message.profile_image} />
                  {message.name}
                </div>
                <div className='grid place-items-center' ref={messageEndRef}>
                  {message.contents}
                </div>
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
                  ...chatMyInfo,
                  contents: input
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
        <DialogContent className='gap-0 p-0 outline-none bg-white'>
          <DialogHeader className='px-4 pb-4 pt-5'>
            <DialogTitle>참여중인 유저 목록</DialogTitle>
            <DialogDescription>
              현재 채팅방의 멤버를 보여줍니다.
            </DialogDescription>
          </DialogHeader>
          <Command className='overflow-hidden rounded-t-none border-t'>
            <CommandInput placeholder='Search user...' />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className='p-2'>
                {friendInfos.map((user) => (
                  <CommandItem
                    key={user.id}
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
                      <AvatarIcon avatarName={user.profile_image} size='big' />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className='ml-2'>
                      <p className='text-sm font-medium leading-none'>
                        {user.name}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {user.introduction}
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
                    key={user.id}
                    className='inline-block border-2 border-background'
                  >
                    <AvatarImage src={user.profile_image} />
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
