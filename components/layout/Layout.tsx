import Header from './header/Header';
import Footer from './footer/Footer';
import {Toaster} from '@/components/shadcn/ui/toaster';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <main
        className={`flex flex-1 px-4 sm:px-0 py-1 box-border flex-col justify-center items-center self-center w-full lg:w-[1024px] min-h-[80vh]`} // therefore max container size is 1024px
      >
        {children}
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
