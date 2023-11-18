import {Button} from '@/components/shadcn/ui/button';
import {Send} from 'lucide-react';
import {useEffect, useState} from 'react';

export default function DMButton(userId: string) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  function openDM() {
    console.log("DMButton's userId: ", userId);
  }
  return (
    <Button
      size='icon'
      className='bg-custom4 hover:bg-custom4/60'
      onClick={openDM}
    >
      <Send />
    </Button>
  );
}
