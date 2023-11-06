import {Switch} from '@/components/shadcn/ui/switch';

export default function Options() {
  return (
    <div className='p-1 grid gap-y-3'>
      <div className='justify-between flex'>
        <h3 className="text-center text-black text-sm font-bold font-['Roboto Mono']">
          game-settings1
        </h3>
        <Switch />
      </div>
      <div className='justify-between flex'>
        <h3 className="text-center text-black text-sm font-bold font-['Roboto Mono']">
          game-settings2
        </h3>
        <Switch />
      </div>
      <div className='justify-between flex'>
        <h3 className="text-center text-black text-sm font-bold font-['Roboto Mono']">
          game-settings3
        </h3>
        <Switch />
      </div>
      <div className='justify-between flex'>
        <h3 className="text-center text-black text-sm font-bold font-['Roboto Mono']">
          game-settings4
        </h3>
        <Switch />
      </div>
    </div>
  );
}
