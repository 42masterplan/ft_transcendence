import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

interface InputWithLabelProps {
  header: string;
  placeholder: string;
}

export function InputWithLabel({header, placeholder}: InputWithLabelProps) {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='text'>{header}</Label>
      <Input type='text' id='text' placeholder={placeholder} />
    </div>
  );
}
