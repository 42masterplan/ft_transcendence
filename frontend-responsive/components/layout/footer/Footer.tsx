import FooterButton from "./FooterButton";
import { useRouter } from "next/router";
import { ResponsiveDesign } from "@/lib/ResponsiveDesign";

export default function Footer() {
  // get current page url
  const router = useRouter();
  const currentUrl = router.pathname;

  return (
    <footer
      className={
        "hidden sm:flex flex-row w-full justify-center space-x-3 px-3 py-3" +
        ResponsiveDesign.minWidth
      }
    >
      <FooterButton type="myPage" currentUrl={currentUrl} />
      <FooterButton type="game" currentUrl={currentUrl} />
      <FooterButton type="channel" currentUrl={currentUrl} />
      <FooterButton type="social" currentUrl={currentUrl} />
      {/* <FooterButton type="rank" iconSize={iconSize} /> */}
    </footer>
  );
}
