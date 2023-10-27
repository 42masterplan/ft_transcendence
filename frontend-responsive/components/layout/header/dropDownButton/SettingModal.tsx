import React from "react";
import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenuSeparator,
} from "@/components/shadcn/ui/dropdown-menu";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/ui/dialog";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import ScrollableContainer from "@/components/container/ScrollableContainer";
import ResponsiveContainer from "@/components/container/ResponsiveContainer";

export default function SettingsModal() {
  return (
    <DialogContent className="w-[425px]">
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
      </DialogHeader>
      <DropdownMenuSeparator />
      <ScrollableContainer className="h-[300px]">
        <SettingModalContents />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </ScrollableContainer>
    </DialogContent>
  );
}

function SettingContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex flex-col">
      {children}
    </li>
  )
}

function SettingModalContents() {
  return (
    <ResponsiveContainer className="flex-col w-full p-1">
      <ul className="flex flex-col">
        <SettingContentContainer>
          <Input
            type="text"
            id="nickName"
            placeholder="Type your nickname here"
          />
          <Button variant="secondary" className="w-full">
            Change Nickname
          </Button>
        </SettingContentContainer>
        {/* ADD SETTING CONTENTS BELOW */}
        {/* return 10 dummy -------------------------------------------------*/}
        {
          Array.from(Array(100).keys()).map((_, index) => {
            return (
              <SettingContentContainer key={index}>
                <p>BLABLA</p>
              </SettingContentContainer>
            )
          })
        }
        {/* -----------------------------------------------------------------*/}
      </ul>
    </ResponsiveContainer>
  );
}
