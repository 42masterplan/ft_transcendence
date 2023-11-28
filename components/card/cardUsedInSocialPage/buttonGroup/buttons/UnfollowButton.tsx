import {Button} from '@/components/shadcn/ui/button';
import {UserX} from 'lucide-react';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {ToastAction} from '@/components/shadcn/ui/toast';
import useAxios from '@/hooks/useAxios';
type UnfollowButtonProps = {
  userId: string;
};

export default function UnfollowButton({userId}: UnfollowButtonProps) {
  // function to send unfriend request: TODO: implement this
  const {fetchData} = useAxios();
  const {toast} = useToast();
  return (
    <Button
      size='icon'
      className='bg-custom2/40 hover:bg-custom2/60 hover:scale-[115%] duration-200'
      onClick={() => {
        toast({
          title: 'Are you sure you want to unfriend this user?',
          action: (
            <ToastAction
              altText='Unfriend User'
              onClick={() => {
                fetchData({
                  method: 'delete',
                  url: '/users/friends',
                  params: {
                    id: userId
                  },
                  errorTitle: 'Unfriend user failed',
                  errorDescription: 'Please try again later.',
                  successTitle: 'User unfriended',
                  successDescription:
                    'You can still send friend request to this user.'
                });
              }}
            >
              Unfriend User
            </ToastAction>
          )
        });
      }}
    >
      <UserX />
    </Button>
  );
}
