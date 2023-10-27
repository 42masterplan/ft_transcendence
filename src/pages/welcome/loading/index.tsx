export default function welcomeLoading() {
  // "text-[64px] shrink-0 font-jost h-[96px] text-center">
  return (
    <div className='flex flex-col justify-center items-center gap-5 h-screen'>
      <h1 className='h-24 text-center text-neutral-50 text-[64px] font-bold font-roboto-mono'>
        환영합니다!
      </h1>
      <h2 className='h-24 text-center text-neutral-50 text-[32px] font-bold font-roboto-mono shrink-0'>
        로딩중...
      </h2>
    </div>
  );
}
