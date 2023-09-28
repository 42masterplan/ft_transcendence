import {Avatar, AvatarFallback, AvatarImage} from '../shadcn/avatar';

export default function AvatarIcon() {
  return (
    <Avatar>
      <AvatarImage />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
