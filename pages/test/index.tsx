import CrescentLoader from '@/components/loader/CrescentLoader';
import FadingDotsLoader from '@/components/loader/FadingDotsLoader';
import SpinningLoader2 from '@/components/loader/SpinningLoader2';

export default function TestPage() {
  return (
    <>
      <div className='flex w-full h-full gap-10 items-center bg-slate-600'>
        <FadingDotsLoader size={1} />
        <FadingDotsLoader size={2} />
        <FadingDotsLoader size={3} />
        <FadingDotsLoader size={4} />
        <FadingDotsLoader size={5} />
        <FadingDotsLoader size={6} />
        <FadingDotsLoader size={7} />
        <FadingDotsLoader size={8} />
        <FadingDotsLoader size={9} />
        <FadingDotsLoader size={10} />
      </div>
    </>
  );
}
