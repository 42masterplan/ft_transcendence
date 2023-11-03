import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Toaster } from "@/components/shadcn/ui/toaster"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main
        className={`flex flex-1 px-2 sm:px-0 box-border flex-col justify-center items-center self-center max-w-screen-sm min-h-[80vh]`}
      >
        {children}
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
