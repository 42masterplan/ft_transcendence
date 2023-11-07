import AvatarIcon from '@/components/avatar/AvatarIcon';
import {Label} from '@/components/shadcn/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/shadcn/ui/radio-group';
import {useState} from 'react';

export default function AvatarContainer() {
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

  function clickHandler(id: string) {
    Setselected(parseInt(id));
    if (id === '15') {
      // 숨겨진 태그 선택
      const hiddenInput = document.getElementById(`fileUpload-${id}`);
      if (hiddenInput) {
        hiddenInput.click();
      }
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
    <div className=' flex place-content-center'>
      <input
        type='file'
        id={'fileUpload-15'}
        className='forUpload hidden'
        accept='image/*'
        required
        onChange={(e) => {
          console.log(e.target.files);
        }}
      ></input>
      <RadioGroup defaultValue='1' className='grid gap-4'>
        {renderAvatarContainer()}
      </RadioGroup>
    </div>
  );
}
