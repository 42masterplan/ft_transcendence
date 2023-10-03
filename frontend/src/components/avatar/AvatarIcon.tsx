import {Avatar, AvatarFallback, AvatarImage} from '../shadcn/avatar';

export default function AvatarIcon({avatarName}: {avatarName: string}) {
  return (
    <Avatar>
      <AvatarImage src={`/character/${avatarName}.svg`} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
