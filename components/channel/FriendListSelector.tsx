import React, {useContext, useState} from 'react';
import {APIContext, FriendInfoType} from '@/DummyBackend/APIData';
import {Button} from '@/components/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/shadcn/ui/dropdown-menu';

interface RenderFriendProps {
  friendInfos: FriendInfoType[];
  selected: Array<Object>;
  setSelected: any;
}
function renderFriendCheckBoxItems({
  friendInfos,
  selected,
  setSelected
}: RenderFriendProps) {
  const handleCheckedChange = (e) => {
    const new_array = selected.map((s) => {
      if (s.id == e.target.innerText)
        //임시로 이렇게 두긴 했는데 바꾸긴 해야 할듯요
        return {
          ...s,
          is_selected: !s.is_selected
        };
      else return s;
    });
    console.log(e.target.innerText);
    console.log(new_array);
    setSelected(new_array);
  };
  return friendInfos.map((friendInfo, idx) => {
    return (
      <DropdownMenuCheckboxItem
        key={friendInfo.id}
        className='col-span-3'
        value={friendInfo.id}
        checked={selected[idx].is_selected}
        onClick={(e) => handleCheckedChange(e)}
      >
        {friendInfo.name}
      </DropdownMenuCheckboxItem>
    );
  });
}

export default function FriendListSelector({children}: any) {
  const {friendInfos} = useContext(APIContext);
  const selectedFriends = friendInfos.map((friend) => {
    return {
      id: friend.id,
      name: friend.name,
      is_selected: false
    };
  });
  const [selected, setSelected] = useState(selectedFriends);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='col-span-3 bg-custom2'>
          {children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[280px] max-h-[300px] overflow-auto'>
        <DropdownMenuLabel>{children}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderFriendCheckBoxItems({friendInfos, selected, setSelected})}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
