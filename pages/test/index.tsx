import Modal from '@/components/modal/Modal';
import {Button} from '@/components/shadcn/ui/button';
import {useState} from 'react';

export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className='flex w-full h-full bg-slate-600'>
        <div className='flex w-1/2 h-full bg-slate-500'>
          <div className='flex w-full h-1/2 bg-slate-400'></div>
          <div className='flex w-full h-1/2 bg-slate-300'>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            <Modal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            ></Modal>
          </div>
        </div>
        <div className='flex w-1/2 h-full bg-slate-400'></div>
      </div>
    </>
  );
}
