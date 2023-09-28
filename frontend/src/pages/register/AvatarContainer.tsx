import AvatarIcon from '../../../components/Avatar';

export default function AvatarContainer() {
  return (
    <>
      <div className='flex items-center space-x-3'>
        <AvatarIcon />
        <AvatarIcon />
        <AvatarIcon />
        <AvatarIcon />
      </div>
      <div className='flex items-center space-x-3'>
        <AvatarIcon />
        <AvatarIcon />
        <AvatarIcon />
        <AvatarIcon />
      </div>
    </>
  );
}
