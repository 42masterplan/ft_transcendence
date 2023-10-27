import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col w-full justify-center items-center self-center max-w-[640px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
