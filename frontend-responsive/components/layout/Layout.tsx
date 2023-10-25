import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-col w-full">
        {children}
      </main>
      <Footer />
    </>
  );
}
