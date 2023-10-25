import HeaderDropDownBtn from "./HeaderDropDownBtn";
import NotificationBtn from "./notification-button/NotificationBtn";

export default function Header() {
  return (
    // <header className="fixed top-0 left-0 right-0 w-full flex flex-row items-center justify-between px-1 py-3">
    <header className="w-full flex flex-row items-center justify-between px-3 py-3">
      <HeaderDropDownBtn />
      <h1 className="font-mono text-custom3 font-bold tracking-[0.4rem] text-2xl sm:text-5xl text-center px-1">
        AMAZING PONG
      </h1>
      <NotificationBtn />
    </header>
  );
}
