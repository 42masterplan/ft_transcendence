import {Avatar, AvatarFallback, AvatarImage} from '../shadcn/avatar';

export default function AvatarIcon({avatarName}: {avatarName: string}) {
  return (
    <Avatar>
      {avatarName == '' ? (
        '' // 추후에 이곳에 업로드한 아바타 이미지가 올 수 있도록 업데이트
      ) : (
        <AvatarImage src={`/character/${avatarName}.svg`} />
      )}

      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
