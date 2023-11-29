import {Button} from '@/components/shadcn/ui/button';
import {ShieldAlert} from 'lucide-react';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {ToastAction} from '@/components/shadcn/ui/toast';
import useAxios from '@/hooks/useAxios';
type BlockButtonProps = {
  userId: string;
};

export default function BlockButton({userId}: BlockButtonProps) {
  const {fetchData} = useAxios();
  // function to send block request: TODO: implement this
  const sendBlockRequest = async () => {
    fetchData({
      method: 'post',
      url: '/users/block',
      body: {
        id: userId
      },
      errorTitle: 'Block request failed',
      errorDescription: 'Please try again later.',
      successTitle: 'User blocked',
      successDescription: 'User blocked successfully.'
    });
  };

  const {toast} = useToast();
  return (
    <Button
      variant='destructive'
      size='icon'
      className='hover:scale-[115%] duration-200'
      onClick={() => {
        toast({
          title: 'Are you sure you want to block this user?',
          description: 'Unfriend action will be followed.',
          action: (
            <ToastAction altText='Block User' onClick={sendBlockRequest}>
              Block User
            </ToastAction>
          )
        });
      }}
    >
      <ShieldAlert />
    </Button>
  );
}
