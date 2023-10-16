import React, {useContext, useState} from 'react';
import {APIContext} from '@/components/Layout';
import {type FriendInfoType} from '@/components/APIData';
import {DropdownMenuCheckboxItemProps} from '@radix-ui/react-dropdown-menu';
import {Button} from '../shadcn/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/shadcn/dropdown-menu';
type Checked = DropdownMenuCheckboxItemProps['checked'];
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
        return {
          ...s,
          is_selected: !s.is_selected
        };
      else return s;
    });
    // console.log(e.target.value);
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

export default function FriendListSelector() {
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
        <Button variant='outline' className='col-span-3 bg-white'>
          친구 초대
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[280px] max-h-[300px] overflow-auto'>
        <DropdownMenuLabel>전체 친구 목록</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderFriendCheckBoxItems({friendInfos, selected, setSelected})}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
