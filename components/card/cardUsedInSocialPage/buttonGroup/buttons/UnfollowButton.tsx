import {Button} from '@/components/shadcn/ui/button';
import {UserX} from 'lucide-react';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {ToastAction} from '@/components/shadcn/ui/toast';
import useAxios from '@/hooks/useAxios';
import {useEffect} from 'react';
type UnfollowButtonProps = {
  userId: string;
};

export default function UnfollowButton({userId}: UnfollowButtonProps) {
  const {fetchData, isSuccess} = useAxios();
  const {toast} = useToast();
  useEffect(() => {
    if (isSuccess) {
      location.reload();
    }
  }, [isSuccess]);
  return (
    <Button
      size='icon'
      className='bg-custom2/40 hover:bg-custom2/60 hover:scale-[115%] duration-200'
      onClick={() => {
        toast({
          title: '정말로 친구를 삭제하시겠습니까?',
          action: (
            <ToastAction
              altText='Unfriend User'
              onClick={() => {
                fetchData({
                  method: 'delete',
                  url: '/users/friends/' + userId,
                  errorTitle: '친구 삭제 실패',
                  errorDescription:
                    '친구 삭제에 실패하였습니다. 새로고침 후 다시 시도해주세요',
                  successTitle: '친구 삭제 완료',
                  successDescription:
                    '친구 삭제에 성공하였습니다. 이제 다시 친구 요청을 보낼 수 있습니다.'
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
