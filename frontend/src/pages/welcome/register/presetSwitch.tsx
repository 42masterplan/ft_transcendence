import {Label} from '@/components/components/shadcn/label';
import {Switch} from '@/components/components/shadcn/switch';

export function PresetSwitch() {
  return (
    <div className='flex items-center space-x-3'>
      <h1
        className='font-roboto-mono text-1xl
            font-semibold leading-10 tracking-normal text-center'
      >
        아바타 선택
      </h1>
      <>
        <Switch id='preset-image' />
        <Label htmlFor='preset-image'>프리셋 이미지</Label>
      </>
    </div>
  );
}
