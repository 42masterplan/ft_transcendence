import FooterButton from "./FooterButton";
import { useRouter } from "next/router";

export default function Footer() {
  // get current page url
  const router = useRouter();
  const currentUrl = router.pathname;

  return (
    <footer className="hidden sm:flex flex-row w-full min-w-[360px] justify-center space-x-3 px-3 py-3">
      <FooterButton type="myPage" currentUrl={currentUrl} />
      <FooterButton type="game" currentUrl={currentUrl} />
      <FooterButton type="channel" currentUrl={currentUrl} />
      <FooterButton type="social" currentUrl={currentUrl} />
      {/* <FooterButton type="rank" iconSize={iconSize} /> */}
    </footer>
  );
}
