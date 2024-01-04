import {useToast} from '../shadcn/ui/use-toast';
import {ToastAction} from '../shadcn/ui/toast';
import {useRouter} from 'next/router';
import {useCookies} from 'react-cookie';

export default function LogOutBtn({children}: {children: React.ReactNode}) {
  const {toast} = useToast();
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies();

  return (
    <div
      onClick={() => {
        toast({
          title: '정말로 로그아웃 하시겠습니까?',
          description: '로그아웃 하시면 다시 로그인을 해야합니다.',
          variant: 'destructive',

          action: (
            <ToastAction
              altText='Log Out'
              onClick={() => {
                removeCookie('accessToken', {path: '/'});
                router.push('/welcome');
              }}
            >
              Log Out
            </ToastAction>
          )
        });
      }}
    >
      {children}
    </div>
  );
}
