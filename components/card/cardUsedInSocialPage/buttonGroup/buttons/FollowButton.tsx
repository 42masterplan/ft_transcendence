import {Button} from '@/components/shadcn/ui/button';
import {UserPlus} from 'lucide-react';
import useAxios from '@/hooks/useAxios';

type FollowButtonProps = {
  userId: string;
};

export default function FollowButton({userId}: FollowButtonProps) {
  const {fetchData} = useAxios();

  return (
    <Button
      size='icon'
      className='bg-custom3 hover:bg-custom3/70 hover:scale-[115%] duration-200'
      onClick={() => {
        fetchData({
          url: '/users/friends/request',
          method: 'post',
          body: {
            friendId: userId
          },
          successTitle: '친구 요청 전송',
          successDescription: '친구 요청을 전송하였습니다.',
          errorTitle: '친구 요청 전송 실패',
          errorDescription: '친구 요청 전송을 실패하였습니다.'
        });
      }}
    >
      <UserPlus />
    </Button>
  );
}
