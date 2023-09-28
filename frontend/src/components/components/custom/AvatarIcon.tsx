import {Avatar, AvatarFallback, AvatarImage} from '../shadcn/avatar';

export default function AvatarIcon({avatorName}: {avatorName: string}) {
  return (
    <Avatar>
      <AvatarImage src={`/character/${avatorName}.svg`} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
