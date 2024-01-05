import Header from './header/Header';
import Footer from './footer/Footer';
import {Toaster} from '@/components/shadcn/ui/toaster';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import useSocket from '@/hooks/useSocket';
import {useToast} from '../shadcn/ui/use-toast';
export default function Layout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const [socket] = useSocket('alarm');
  const {toast} = useToast();
  useEffect(() => {
    socket.emit('isDoubleLogin', (isDoubleLogin: boolean) => {
      if (isDoubleLogin) {
        toast({
          title: '에러',
          description: '다른 기기에서 로그인 된 상태입니다.',
          variant: 'destructive'
        });
        router.push('/welcome/double-tab');
      }
    });
  }, [toast, socket, router.pathname]);
  return (
    <>
      {router.pathname.startsWith('/welcome') ||
      router.pathname.startsWith('/game/in-game') ||
      router.pathname.startsWith('/game/pre-game') ? null : (
        <Header
          className={`flex flex-row w-full items-center justify-between px-3 sm:px-4 h-[5vh] sm:h-[7vh]`}
        />
      )}

      <main
        className={`flex flex-col h-[95vh] sm:h-[86vh] w-full sm:max-w-5xl`}
      >
        {children}
      </main>
      {router.pathname.startsWith('/welcome') ||
      router.pathname.startsWith('/game/in-game') ? null : (
        <Footer
          className={`hidden sm:flex flex-row w-full items-center justify-between gap-4 px-3 h-[7vh]`}
        />
      )}
      <Toaster />
    </>
  );
}
