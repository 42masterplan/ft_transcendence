import AvatarIcon from '@/components/avatar/AvatarIcon';
import {Label} from '@/components/shadcn/label';
import {RadioGroup, RadioGroupItem} from '@/components/shadcn/radio-group';

export default function AvatarContainer() {
  const AvatarList = [
    'cat_kickBoard',
    'crocodile_health',
    'dog_body',
    'dog_boxing',
    'dog_stateBoard',
    'gorilla_baseBall',
    'kangaroo_boxing',
    'koala_health',
    'mouse_health',
    'panda_health',
    'polarbear_ski',
    'rhino_health',
    'rhino_skateBoard',
    'shark_health',
    'sloth_health',
    ''
  ];

  function uploadHandler(id: string) {
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
              className='peer sr-only'
              onClick={() => uploadHandler(id)}
            />
            <Label
              htmlFor={idx.toString()}
              className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
            >
              <AvatarIcon key={id} avatarName={AvatarList[idx]} />
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
      <input
        type='file'
        id={'fileUpload-15'}
        className='forUpload hidden'
        accept='image/*'
        required
      ></input>
      <RadioGroup defaultValue='1' className='grid gap-4'>
        {renderAvatarContainer()}
      </RadioGroup>
    </>
  );
}
