/**
 * UserInfoCard
 * This component is a card that displays a user's information.
 * Mandatory props:
 * - userInfo: UserInfo -> user information
 * Optional props:
 * - size: UserInfoCardSize -> size of the card. Default is "medium".
 * - side: "left" | "right" -> side of the card. Default is "left".
 * - bgColor: string -> background color of the card. Default is "".
 * - printIntro: boolean -> whether to print the user's introduction. Default is false.
 * - showStatus: boolean -> whether to show the user's status. Default is true.
 * - className: string -> className of the card. Default is "".
 */

import AvatarWithStatus from './AvatarWithStatus';
import {UserInfo} from '@/lib/types';
import {sizeType} from '@/lib/ResponsiveDesign';

type UserInfoCardProps = {
  userInfo: UserInfo;
  size?: sizeType;
  side?: 'left' | 'right';
  printIntro?: boolean;
  showStatus?: boolean;
  stretch?: boolean;
  insteadOfIntro?: string;
  className?: string;
};

export default function UserInfoCard({
  userInfo,
  size = 'md',
  side = 'left',
  printIntro = false,
  showStatus = true,
  stretch = false,
  insteadOfIntro = '',
  className = ''
}: UserInfoCardProps) {
  let flexAlign: string;
  let textAlign: string;
  if (side === 'left') {
    // If the side is left, the user's name is aligned to the left.
    flexAlign = 'flex-row';
    textAlign = 'items-start text-left';
  } else {
    // If the side is right, the user's name is aligned to the right.
    flexAlign = 'flex-row-reverse';
    textAlign = 'items-end text-left';
  }

  let widthFit: string;
  let introWidthFit: string;
  if (stretch) {
    widthFit = 'w-full';
    switch (size) {
      case 'sm':
        introWidthFit = 'w-11/12';
        break;
      case 'md':
        introWidthFit = 'w-5/6';
        break;
      case 'lg':
        introWidthFit = 'w-3/4';
        break;
      default:
        introWidthFit = 'w-5/6';
        break;
    }
  } else {
    widthFit = 'w-fit';
    switch (size) {
      case 'sm':
        introWidthFit = 'w-48';
        break;
      case 'md':
        introWidthFit = 'w-64';
        break;
      case 'lg':
        introWidthFit = 'w-96';
        break;
      default:
        introWidthFit = 'w-64';
        break;
    }
  }

  let avatarSize: sizeType;
  let nameFontSize: string;
  let introFontSize: string;
  switch (size) {
    case 'sm':
      avatarSize = 'sm';
      nameFontSize = 'text-lg sm:text-xl px-1';
      introFontSize = 'text-sm sm:text-base px-1';
      break;
    case 'md':
      avatarSize = 'md';
      nameFontSize = 'text-2xl sm:text-3xl px-2';
      introFontSize = 'text-base sm:text-lg px-2';
      break;
    case 'lg':
      avatarSize = 'lg';
      nameFontSize = 'text-5xl sm:text-6xl px-3';
      introFontSize = 'text-lg sm:text-xl px-3';
      break;
    default:
      avatarSize = 'md';
      nameFontSize = 'text-2xl sm:text-3xl px-2';
      introFontSize = 'text-base sm:text-lg px-2';
      break;
  }

  let intro: string;
  if (insteadOfIntro !== '') {
    intro = insteadOfIntro;
  } else {
    intro = userInfo.introduction;
  }

  type UserInfoTextContainerProps = {
    name: string;
    intro: string;
  };

  function UserInfoTextContainer({name, intro}: UserInfoTextContainerProps) {
    return (
      <div
        className={`flex ${textAlign} w-full flex-col justify-center gap-1 px-2 sm:px-3`}
      >
        <h1 className={`${nameFontSize} font-bold`}>{name}</h1>
        {printIntro && (
          <div
            className={`flex ${introFontSize} ${introWidthFit} break-words overflow-hidden`}
          >
            {intro}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        className={`flex ${widthFit} ${flexAlign} ${className} rounded-xl p-1 sm:p-2`}
      >
        <AvatarWithStatus
          status={userInfo.currentStatus}
          image={userInfo.profileImage}
          showStatus={showStatus}
          size={avatarSize}
        />
        <UserInfoTextContainer
          name={userInfo.name}
          intro={intro}
        ></UserInfoTextContainer>
      </div>
    </>
  );
}
