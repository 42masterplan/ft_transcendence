import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

export default function AvatarIcon() {
  return (
    <Avatar>
      <AvatarImage />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
