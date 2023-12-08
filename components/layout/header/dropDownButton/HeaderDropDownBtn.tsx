import React from 'react';
import {
  LogOut,
  Settings,
  Users,
  Menu,
  Gamepad2,
  Home,
  MessagesSquare
} from 'lucide-react';
import {Button} from '@/components/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/shadcn/ui/dropdown-menu';
import {Dialog, DialogTrigger} from '@/components/shadcn/ui/dialog';
import ThemeSwitchBtn from '../ThemeSwitchBtn';
import {ResponsiveDesign} from '../../../../lib/ResponsiveDesign';
import Link from 'next/link';
import SettingsModal from './SettingModal';
import {useRouter} from 'next/router';
import LogOutBtn from '@/components/button/LogoutBtn';
interface DropdownMenuPageItemProps {
  href: string;
  icon: React.ReactNode;
  name: string;
  currentUrl: string;
}

function DropdownMenuPageItem({
  href,
  icon,
  name,
  currentUrl
}: DropdownMenuPageItemProps) {
  let linkBgColor = 'bg-transparent';
  if (currentUrl === href) {
    linkBgColor = 'bg-custom1';
  }
  return (
    <Link href={href}>
      <DropdownMenuItem className={linkBgColor}>
        {icon}
        <span>{name}</span>
      </DropdownMenuItem>
    </Link>
  );
}

export default function HeaderDropDownBtn() {
  // get current page url
  const router = useRouter();
  const currentUrl = router.pathname;
  console.log(currentUrl);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex relative flex-row justify-center items-center'>
            <Button variant='iconBtn' size='headerBtn'>
              <Menu className={ResponsiveDesign.iconSize} />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-60'>
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* main menu */}
          <DropdownMenuGroup>
            <DropdownMenuPageItem
              href='/'
              icon={<Home className='mr-2 h-4 w-4' />}
              name='My Profile'
              currentUrl={currentUrl}
            />
            <DropdownMenuPageItem
              href='/game'
              icon={<Gamepad2 className='mr-2 h-4 w-4' />}
              name='Play Game'
              currentUrl={currentUrl}
            />
            <DropdownMenuPageItem
              href='/channel'
              icon={<MessagesSquare className='mr-2 h-4 w-4' />}
              name='Chatting Channels'
              currentUrl={currentUrl}
            />
            <DropdownMenuPageItem
              href='/social'
              icon={<Users className='mr-2 h-4 w-4' />}
              name='Social'
              currentUrl={currentUrl}
            />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {/* etc */}
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />
                <span>Settings</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem>
              <ThemeSwitchBtn />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className='mr-2 h-4 w-4' />
              <LogOutBtn>로그 아웃</LogOutBtn>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <SettingsModal />
    </Dialog>
  );
}
