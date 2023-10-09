import {Avatar, AvatarFallback, AvatarImage} from '../shadcn/avatar';

interface AvatarType {
  avatarName: string;
  size: string;
}

export default function AvatarIcon({avatarName, size}: AvatarType) {
  return (
    <Avatar>
      {avatarName == '' ? (
        '' // 추후에 이곳에 업로드한 아바타 이미지가 올 수 있도록 업데이트
      ) : (
        <AvatarImage className={size} src={`/character/${avatarName}.svg`} />
      )}
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
