import {Button} from '@/components/shadcn/ui/button';
import {ShieldAlert} from 'lucide-react';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {ToastAction} from '@/components/shadcn/ui/toast';
import useAxios from '@/hooks/useAxios';
import {useEffect} from 'react';
type BlockButtonProps = {
  userId: string;
};

export default function BlockButton({userId}: BlockButtonProps) {
  const {fetchData, isSuccess} = useAxios();
  const {toast} = useToast();
  useEffect(() => {
    if (isSuccess) {
      location.reload();
    }
  }, [isSuccess]);

  const sendBlockRequest = async () => {
    fetchData({
      method: 'post',
      url: '/users/block',
      body: {
        id: userId
      },
      errorTitle: '차단 실패',
      errorDescription:
        '이미 차단된 사용자이거나 네트워크에 오류가 있습니다. 새로고침 후 다시 시도해주세요.',
      successTitle: '유저 차단 완료',
      successDescription: '유저 차단에 성공하였습니다.'
    });
  };

  return (
    <Button
      variant='destructive'
      size='icon'
      className='hover:scale-[115%] duration-200'
      onClick={() => {
        toast({
          title: '이 유저를 정말 차단하시겠습니까?',
          description: '차단하게 되면 친구가 끊기게 됩니다.',
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
