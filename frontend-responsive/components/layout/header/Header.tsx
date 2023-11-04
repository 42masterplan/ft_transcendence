import ResponsiveContainer from "@/components/container/ResponsiveContainer";
import HeaderDropDownBtn from "./dropDownButton/HeaderDropDownBtn";
import NotificationBtn from "./notification-button/NotificationBtn";
import {
  getDummyNotificationCountSync,
  getDummyCurrentUserIdSync,
} from "@/DummyBackend/outdated/DummyAPI";

export default function Header() {

  return (
    // <header className="fixed top-0 left-0 right-0 w-full flex flex-row items-center justify-between px-1 py-3">
    <header className="w-full box-border flex flex-row items-center justify-between px-3 py-3">
      <ResponsiveContainer className="w-full justify-between ">
      <HeaderDropDownBtn />
      <h1 className="font-mono text-custom3 font-bold tracking-[0.4rem] text-2xl sm:text-5xl text-center px-2 truncate">
        AMAZING PONG
      </h1>
      <NotificationBtn/>
      </ResponsiveContainer>
    </header>
  );
}
