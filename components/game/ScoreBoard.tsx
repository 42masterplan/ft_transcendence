export default function ScoreBoard(props: {AScore: number; BScore: number}) {
  const {AScore, BScore} = props;
  return (
    <div className='absolute top-1/2 left-1/2 w-[400px] transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center bg-opacity-0 p-0 rounded-md shadow-lg'>
      <h2 className='text-4xl font-bold text-white my-2'>{BScore}</h2>
      <div className='border-[1px] border-neutral-50 border-dashed w-full mx-0'></div>
      <h2 className='text-4xl font-bold text-white my-2'>{AScore}</h2>
    </div>
  );
}
