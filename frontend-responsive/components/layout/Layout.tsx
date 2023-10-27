import Header from "./header/Header";
import Footer from "./footer/Footer";
import { ResponsiveDesign } from "@/lib/ResponsiveDesign";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main
        className={
          "flex flex-1 flex-col w-full justify-center items-center self-center " +
          ResponsiveDesign.minWidth +
          ResponsiveDesign.maxWidth
        }
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
