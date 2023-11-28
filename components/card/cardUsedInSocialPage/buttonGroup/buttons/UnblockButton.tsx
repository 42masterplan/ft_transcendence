import {Button} from '@/components/shadcn/ui/button';
import {ShieldMinus} from 'lucide-react';
import {useToast} from '@/components/shadcn/ui/use-toast';
import useAxios from '@/hooks/useAxios';
type UnblockButtonProps = {
  userId: string;
};

export default function UnblockButton({userId}: UnblockButtonProps) {
  // function to send unblock request: TODO: implement this
  const {fetchData} = useAxios();
  return (
    <Button
      size='icon'
      className='bg-custom1/40 hover:bg-custom1/60 hover:scale-[115%] duration-200'
      onClick={() => {
        fetchData({
          method: 'post',
          url: '/users/unblock',
          params: {
            id: userId
          }
        });
      }}
    >
      <ShieldMinus />
    </Button>
  );
}
