import React from "react";

import {
  LogOut,
  Settings,
  Users,
  Menu,
  Gamepad2,
  Home,
  Trophy,
  Bell,
  MessagesSquare,
} from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";

import ThemeSwitchBtn from "./ThemeSwitchBtn";
import { type } from "os";
import { LayoutResponsiveDesign } from "../../../lib/LayoutResponsiveDesign";
import Link from "next/link";

export default function HeaderDropDownBtn() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex relative flex-row justify-center items-center">
          <Button variant="iconBtn" size="headerBtn">
            <Menu className={LayoutResponsiveDesign.iconSize} />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* main menu */}
        <DropdownMenuGroup>
          <Link href="/">
            <DropdownMenuItem>
              <Home className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/game">
            <DropdownMenuItem>
              <Gamepad2 className="mr-2 h-4 w-4" />
              <span>Play Game</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/channel">
            <DropdownMenuItem>
              <MessagesSquare className="mr-2 h-4 w-4" />
              <span>Chatting Channels</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/social">
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Social</span>
            </DropdownMenuItem>
          </Link>
          {/* <Link href="/rank">
            <DropdownMenuItem>
              <Trophy className="mr-2 h-4 w-4" />
              <span>Ladder</span>
            </DropdownMenuItem>
          </Link> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* etc */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            {/* Todo: add function to open settings modal */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ThemeSwitchBtn />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
            {/* Todo: add function to logout */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
