import HeaderDropDownBtn from "./HeaderDropDownBtn";
import NotificationBtn from "./notification-button/NotificationBtn";
import { useEffect, useState } from "react";
import {
  getDummyNotificationCount,
  getDummyCurrentUserId,
} from "@/api/DummyData";
import { UserInfo } from "@/api/type";
import { get } from "http";

export default function Header() {
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [isNotificationCountLoading, setIsNotificationCountLoading] =
    useState<boolean>(true);

  async function getNotificationCount() {
    const currentUserId = await getDummyCurrentUserId();
    setNotificationCount(await getDummyNotificationCount(currentUserId));
  }

  useEffect(() => {
    getNotificationCount().then(() => {
      setIsNotificationCountLoading(false);
    });
  }, [isNotificationCountLoading]);

  return (
    // <header className="fixed top-0 left-0 right-0 w-full flex flex-row items-center justify-between px-1 py-3">
    <header className="w-full flex flex-row items-center justify-between px-3 py-3">
      <HeaderDropDownBtn />
      <h1 className="font-mono text-custom3 font-bold tracking-[0.4rem] text-2xl sm:text-5xl text-center px-1">
        AMAZING PONG
      </h1>
      <NotificationBtn notificationCount={notificationCount} />
    </header>
  );
}
