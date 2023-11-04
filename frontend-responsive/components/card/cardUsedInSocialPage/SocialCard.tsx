import * as Type from "@/lib/type";
import * as Class from "@/lib/class";
interface SocialCardProps {
  id: string;
  profileImage: string;
  name: string;
  currentStatus: Type.userStatus | string;
  introduction: string;
  isFriend: boolean;
  isBlocked: boolean;
}

import UserInfoCard from "../userInfoCard/UserInfoCard";

function userPropsToUserClass(props: SocialCardProps): Type.UserInfo {
  const userClass = new Class.User();
  userClass.id = props.id;
  userClass.profileImage = props.profileImage;
  userClass.name = props.name;
  userClass.currentStatus = props.currentStatus as Type.userStatus;
  userClass.introduction = props.introduction;
  return userClass as Type.UserInfo;
}

export default function SocialCard(props: SocialCardProps) {
  const user = userPropsToUserClass(props);
  if (props.isBlocked && !props.isFriend) {
    return (
      <UserInfoCard
        userInfo={user}
        size="md"
        printIntro={true}
        stretch={false}
        insteadOfIntro="Current user is blocked. You can't see this user's intro."
      />
    );
  } else if (props.isFriend && !props.isBlocked) {
    return (
      <UserInfoCard
        userInfo={user}
        size="md"
        printIntro={true}
        stretch={false}
      />
    );
  } else if (!props.isFriend && !props.isBlocked) {
    return (
      <UserInfoCard
        userInfo={user}
        size="md"
        printIntro={true}
        stretch={false}
        insteadOfIntro="Current user is blocked. You can't see this user's intro."
      />
    );
  } else {
    // throw new Error("invalid user status");
    return (
      <UserInfoCard
        userInfo={user}
        size="md"
        printIntro={true}
        stretch={false}
        insteadOfIntro="This should not happen - ERROR: Followed and Blocked at the same time"
      />
    )
  }
}
