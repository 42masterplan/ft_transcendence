import AvatarIcon from '@/components/avatar/AvatarIcon';
import {Label} from '@/components/shadcn/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/shadcn/ui/radio-group';
import {useState} from 'react';
import Axios from '@/api';

// import SendDataFile from '@/api/SendData';
// async function uploadAvatar(file: File) {
//   // const res = await SendDataFile('/users/profile', file);
//   console.log(res);
// }
export default function SetAvatar({setProfileImage}: {setProfileImage: any}) {
  const [selected, Setselected] = useState(0);
  const AvatarList: Array<string> = [
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
    // process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI16 || ''
  ];
  async function uploadAvatar(file: File) {
    const formData = new FormData();
    formData.set('name', file);
    try {
      const res = await Axios.post('/users/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      //이거 윈도우문제인지 알길이 없어서 일단 넘어갈께요.
      console.log(res.data);
      console.log(res.data.profileImage);
      setProfileImage(res.data.profileImage);
    } catch (err) {
      console.log(err);
      alert('업로드 실패');
    }
  }
  function clickHandler(id: string) {
    if (id === '15') {
      // 숨겨진 태그 선택
      const hiddenInput = document.getElementById(`fileUpload-${id}`);
      if (hiddenInput) hiddenInput.click();
    } else {
      Setselected(parseInt(id));
      setProfileImage(AvatarList[parseInt(id)]);
    }
  }

  const renderAvatarContainer = () => {
    const rows = [];

    for (let row = 0; row < 4; row++) {
      const rowSquares = [];
      for (let col = 0; col < 4; col++) {
        const idx = row * 4 + col;
        const id = idx.toString();
        rowSquares.push(
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
              <AvatarIcon key={id} size='' avatarName={AvatarList[idx]} />
            </Label>
          </div>
        );
      }
      rows.push(
        <div className='flex items-center space-x-3' key={row}>
          {rowSquares}
        </div>
      );
    }
    return rows;
  };
  return (
    <>
      <h1
        className='font-roboto-mono text-1xl
font-semibold leading-10 tracking-normal text-custom4'
      >
        아바타 선택
      </h1>
      <div className=' flex place-content-center'>
        <label htmlFor='profile-upload' />
        <form>
          <input
            type='file'
            id={'fileUpload-15'}
            className='forUpload hidden'
            accept='image/*'
            required
            onChange={(e) => {
              if (e.target.files === null || e.target.files[0] === null) return;
              else {
                console.log('uploading..To Server');
                uploadAvatar(e.target.files[0]);
                console.log('끝?');
              }
            }}
          ></input>
        </form>
        <RadioGroup defaultValue='0' className='grid gap-4'>
          {renderAvatarContainer()}
        </RadioGroup>
      </div>
    </>
  );
}
