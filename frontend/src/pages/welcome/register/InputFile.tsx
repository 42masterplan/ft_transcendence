import {Input} from '@/components/components/shadcn/input';
import {Label} from '@/components/components/shadcn/label';

export function InputFile() {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='커스텀 아바타 직접 올리기'>
        커스텀 아바타 직접 올리기
      </Label>
      <Input id='picture' type='file' />
    </div>
  );
}
