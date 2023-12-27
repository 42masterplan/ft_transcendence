import {Button} from '@/components/shadcn/ui/button';
import {ShieldMinus} from 'lucide-react';
import useAxios from '@/hooks/useAxios';
type UnblockButtonProps = {
  userId: string;
};

export default function UnblockButton({userId}: UnblockButtonProps) {
  const {fetchData, isSuccess} = useAxios();
  useEffect(() => {
    if (isSuccess) {
      location.reload();
    }
  }, [isSuccess]);
  return (
    <Button
      size='icon'
      className='bg-custom1/40 hover:bg-custom1/60 hover:scale-[115%] duration-200'
      onClick={() => {
        fetchData({
          method: 'delete',
          url: '/users/block/' + userId,
          successTitle: 'User unblocked',
          successDescription: "well you can't see their posts anymore.",
          errorTitle: 'Unblock user failed',
          errorDescription: 'Please try again later.'
        });
      }}
    >
      <ShieldMinus />
    </Button>
  );
}
