import AvatarIcon from '@/components/avatar/AvatarIcon';
import {Label} from '@/components/shadcn/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/shadcn/ui/radio-group';
import {useEffect, useState, useRef} from 'react';
import useAxios from '@/hooks/useAxios';

interface SetAvatarProps {
  setProfileImage: any;
  titleFontStyle: string;
  hoverEffect: string;
}

export default function SetAvatar({
  setProfileImage,
  titleFontStyle,
  hoverEffect
}: SetAvatarProps) {
  const [selected, setSelected] = useState(0);
  const [customAvatar, setCustomAvatar] = useState('');
  const {fetchData, response, isSuccess} = useAxios();
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [avatarList, setAvatarList] = useState([
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI1 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI2 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI3 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI4 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI5 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI6 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI7 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI8 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI9 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI10 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI11 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI12 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI13 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI14 || '',
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI15 || ''
  ]);

  useEffect(() => {
    if (isSuccess === true) handleSuccess();
  }, [isSuccess, response]);
  const handleSuccess = () => {
    setProfileImage(avatarList[selected]);
    setSelected(15);
    console.log('성공한 경우');
    console.log(response);
    console.log(response.profileImage);
    if (response != null) {
      const customAvatar =
        process.env.NEXT_PUBLIC_API_ENDPOINT + '/' + response.profileImage;
      console.log(customAvatar);
      setAvatarList([...avatarList, customAvatar]);
      setCustomAvatar(customAvatar);
      setProfileImage(customAvatar);
    }
  };
  const uploadAvatar = (file: File) => {
    const formData = new FormData();
    formData.set('profileImage', file);
    fetchData({
      method: 'post',
      url: '/users/profile-image',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData,
      successTitle: '아바타 업로드 성공',
      successDescription: '아바타 업로드에 성공했습니다.',
      errorTitle: '아바타 업로드 실패',
      errorDescription: '아바타 업로드에 실패했습니다.'
    });
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!fileUploadRef.current?.files || !fileUploadRef.current.files[0])
      return;
    uploadAvatar(fileUploadRef.current.files[0]);
  };
  const renderAvatarContainer = () => {
    const rows = [];

    for (let row = 0; row < 4; row++) {
      const rowSquares = [];
      for (let col = 0; col < 4; col++) {
        const idx = row * 4 + col;
        const id = idx.toString();
        rowSquares.push(renderAvatarSquare(id, idx));
      }
      rows.push(
        <div className='flex items-center space-x-3' key={row}>
          {rowSquares}
        </div>
      );
    }
    return rows;
  };
  const renderAvatarSquare = (id: string, idx: number) => (
    <div className='flex items-center space-x-2' key={id}>
      <RadioGroupItem
        value={id}
        id={id}
        checked={id === selected.toString()}
        className='peer sr-only'
        onClick={() => clickHandler(id)}
      />
      <Label
        htmlFor={idx.toString()}
        className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
      >
        {renderAvatarIcon(id)}
      </Label>
    </div>
  );
  const renderAvatarIcon = (id: string) =>
    id !== '15' ? (
      <AvatarIcon key={id} size='' avatarName={avatarList[parseInt(id)]} />
    ) : (
      <AvatarIcon key={id} size='' avatarName={customAvatar} />
    );
  const clickHandler = (id: string) => {
    if (id === '15') {
      // Use ref to access file input
      if (fileUploadRef.current) fileUploadRef.current.click();
    } else {
      setSelected(parseInt(id));
      setProfileImage(avatarList[parseInt(id)]);
    }
  };
  return (
    <div className={`w-full ${hoverEffect}`}>
      <h1 className={titleFontStyle}>아바타 선택</h1>
      <div className='flex place-content-center py-2'>
        <label htmlFor='profile-upload' />
        <form>
          <input
            type='file'
            id={'fileUpload-15'}
            className='forUpload hidden'
            accept='image/*'
            required
            ref={fileUploadRef}
            onChange={handleFileUpload}
          />
        </form>
        <RadioGroup defaultValue='0' className='w-full grid gap-4'>
          {renderAvatarContainer()}
        </RadioGroup>
      </div>
    </div>
  );
}
