import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/shadcn/ui/avatar';

interface AvatarType {
  avatarName: string;
  size: string;
}

export default function AvatarIcon({avatarName, size}: AvatarType) {
  console.log(avatarName);
  return (
    <Avatar className={size}>
      {avatarName == '' ? (
        '' // 추후에 이곳에 업로드한 아바타 이미지가 올 수 있도록 업데이트
      ) : (
        <AvatarImage className={size} src={avatarName} />
      )}
      <AvatarFallback className='text-custom4'>CN</AvatarFallback>
    </Avatar>
  );
}
