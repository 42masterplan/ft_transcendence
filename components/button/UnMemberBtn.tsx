import {Button} from '@/components/shadcn/ui/button';
import useAxios from '@/hooks/useAxios';
import {useToast} from '../shadcn/ui/use-toast';
import {ToastAction} from '../shadcn/ui/toast';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useCookies} from 'react-cookie';
import SpinningLoader2 from '@/components/loader/SpinningLoader2';
export default function UnMemberBtn({children}: {children: React.ReactNode}) {
  const {fetchData, isSuccess, loading} = useAxios();
  const {toast} = useToast();
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies();
  useEffect(() => {
    if (isSuccess === true) {
      removeCookie('accessToken');
      router.push('/welcome');
    }
  }, [isSuccess]);
  if (loading) return <SpinningLoader2 />;
  return (
    <Button
      className='w-full h-12 bg-custom2/70 text-custom4 rounded-lg'
      onClick={() => {
        toast({
          title: 'Are you sure you want to delete your account?',
          description: 'This action cannot be undone.',
          variant: 'destructive',

          action: (
            <ToastAction
              altText='Delete Account'
              onClick={() => {
                fetchData({
                  method: 'delete',
                  url: '/users'
                });
              }}
            >
              Delete Account
            </ToastAction>
          )
        });
      }}
    >
      {children}
    </Button>
  );
}
