/**
 * How to use:

import Modal from '@/components/modal/Modal';
import {Button} from '@/components/shadcn/ui/button';
import {useState} from 'react';

export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        showCloseButton={true}
        className='bg-custom2 w-1/4 h-1/3'
      >
        <h1>This is modal contents. Pass it as a child of it</h1>
      </Modal>
    </>
  );
}

*/

import {X} from 'lucide-react';
import {Button} from '../shadcn/ui/button';
import ScrollableContainer from '../container/ScrollableContainer';

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showCloseButton?: boolean;
  children?: null | React.ReactNode | React.ReactNode[];
  className?: string;
}

export default function Modal({
  isModalOpen,
  setIsModalOpen,
  showCloseButton = true,
  children = null,
  className = ''
}: ModalProps) {
  if (!isModalOpen) {
    return null;
  }
  return (
    <>
      <div
        className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-10'
        onClick={() => {
          setIsModalOpen(false);
          console.log('Modal closed');
        }}
      >
        <div
          className={`bg-custom2 rounded-lg shadow-xl w-96 h-96 mx-auto relative ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <Button
              className='absolute top-3 right-3 z-20'
              variant='ghost'
              size='icon'
              onClick={() => {
                setIsModalOpen(false);
                console.log('Modal closed');
              }}
            >
              <X />
            </Button>
          )}
          <ScrollableContainer className='p-3'>{children}</ScrollableContainer>
        </div>
      </div>
    </>
  );
}
