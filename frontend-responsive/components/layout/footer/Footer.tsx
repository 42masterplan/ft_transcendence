import FooterButton from "./FooterButton";

export default function Footer() {
  return (
    <footer className="hidden sm:flex flex-row w-full min-w-[360px] justify-center space-x-3 px-3 py-3">
      <FooterButton type="myPage" />
      <FooterButton type="game" />
      <FooterButton type="channel" />
      <FooterButton type="social" />
      {/* <FooterButton type="rank" iconSize={iconSize} /> */}
    </footer>
  );
}
