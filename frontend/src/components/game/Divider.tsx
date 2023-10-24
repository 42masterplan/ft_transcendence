import {Button} from '@/components/shadcn/button';

export default function Divider() {
  return (
    <div className='relative w-full'>
      <div className='border-[1px] border-neutral-50 border-dashed'></div>
      <div
        className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-8 
                   flex justify-center items-center 
                   bg-zinc-300 text-black font-roboto-mono font-bold rounded py-2'
      >
        VS
      </div>
    </div>
  );
}
