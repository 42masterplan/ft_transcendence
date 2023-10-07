/**
 * @component UserCard.tsx
 * @howToUse <UserCard userInfo={targetUser} cardType={card-type} />
 * @description
 * - This component is used to display user information in card format.
 * - It takes two props: userInfo and cardType.
 * - 1. userInfo is an object that contains user information. (single user)
 *    It has 5 properties: id, name, profile_image, current_status, introduction
 * - 2. cardType is a string that determines the type of card to be displayed.
 *    There are 5 types of cards and each card has different buttons.
 *      1. basic: no buttons
 *      2. friend: match, unfollow, block
 *      3. noneFriend: follow, block
 *      4. friendRequest: follow, unfollow, block
 *      5. blockedUser: unblock
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/shadcn/card';
import AvatarIcon from '../avatar/AvatarIcon';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';

import {Button} from '@/components/shadcn/button';
import {ToastAction} from '@/components/shadcn/toast';
import {useToast} from '@/components/shadcn/use-toast';

// -----------------------------------------------------------------------------

/*
button types:
1. match: match with this user
2. follow: follow this user (add to friend)
3. unfollow: unfollow this user (remove from friend)
4. block: block this user (remove from friend and block)
5. unblock: unblock this user (remove from blocked list)

- All buttons will use Tooltip and toaster component from shadcn

- WARNING!: These buttons will only be used in UserCard
*/

// props for MatchButton: {btnName}
function UserCardButton(props: any) {
  const btnName: string = props.btnName; // name of the button

  const btnIconPath = `/icon/user-card-icon/${btnName}.svg`;

  const toastTypes: string[] = ['simple', 'confirm'];

  let details: string;
  let toastMessage: string;
  let toastType: string;

  switch (btnName) {
    case 'match':
      details = 'match with this user';
      toastType = toastTypes[0];
      toastMessage = 'Match request has been sent!';
      break;
    case 'follow':
      details = 'follow this user (add to friend)';
      toastType = toastTypes[0];
      toastMessage = 'Friend request has been sent!';
      break;
    case 'unfollow':
      details = 'unfollow this user (remove from friend)';
      toastType = toastTypes[1];
      toastMessage = 'Are you sure to unfriend this user?';
      break;
    case 'block':
      details = 'block this user (remove from friend and block)';
      toastType = toastTypes[1];
      toastMessage = 'Are you sure to block this user?';
      break;
    case 'unblock':
      details = 'unblock this user (remove from blocked list)';
      toastType = toastTypes[0];
      toastMessage = 'User has been unblocked!';
      break;
    default:
      details = 'no details';
      toastType = toastTypes[0];
      toastMessage = 'no toast message';
  }

  // handle click event -> toast
  const {toast} = useToast();

  // handle click event
  const handleClick = () => {
    if (toastType === toastTypes[0]) {
      // TODO: send request to server
      // simple toast
      toast({
        description: toastMessage
      });
    } else if (toastType === toastTypes[1]) {
      // confirm toast
      toast({
        description: toastMessage,
        action: (
          <ToastAction
            altText='Confirm'
            onClick={() => {
              // TODO: send request to server
              toast({
                description: 'Confirmed!'
              });
            }}
          >
            Confirm
          </ToastAction>
        )
      });
    }
  };

  // tailwind css style -
  const style = {
    btn: 'bg-color_3 flex justify-center items-center p-1 rounded-md h-min'
  };

  return (
    <>
      <Button className={style.btn} onClick={handleClick}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <img src={btnIconPath} alt={btnName} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{details}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>
    </>
  );
}

// -----------------------------------------------------------------------------

/*
props for UserCard: { 
  1. userInfo: {id, name, profile_image, current_status, introduction} 
  2. cardType: {basic, friend, noneFriend, friendRequest, blockedUser}
}

buttons for each cardType:
1. basic: none
2. friend: match, unfollow, block
3. noneFriend: follow, block
4. friendRequest: follow, unfollow, block
5. blockedUser: unblock
*/

export default function UserCard(props: any) {
  // tailwind css style
  const style = {
    card: 'flex flex-row justify-between w-full my-1',
    contentsContainer: 'flex flex-col w-full p-1',
    iconContainer: 'p-2',
    upperContainer: 'flex flex-row justify-between w-full p-1',
    btnContainer: 'flex flex-row justify-between items-center space-x-1',
    descriptionContainer: 'p-1'
  };

  // get objects from props
  const userId = props.userInfo.id; // will not be used
  const userName = props.userInfo.name;
  const userAvatar = props.userInfo.profile_image;
  const userStatus = props.userInfo.current_status; // it will be used later
  const userIntro = props.userInfo.introduction;
  const cardType = props.cardType;

  const relationControlBtn: string[] = [];

  // add buttons based on cardType
  switch (cardType) {
    case 'basic':
      break;
    case 'friend':
      relationControlBtn.push('match');
      relationControlBtn.push('unfollow');
      relationControlBtn.push('block');
      break;
    case 'noneFriend':
      relationControlBtn.push('follow');
      relationControlBtn.push('block');
      break;
    case 'friendRequest':
      relationControlBtn.push('follow');
      relationControlBtn.push('unfollow');
      relationControlBtn.push('block');
      break;
    case 'blockedUser':
      relationControlBtn.push('unblock');
      break;
    default:
      break;
  }

  return (
    <>
      <Card className={style.card}>
        <div className={style.iconContainer}>
          <AvatarIcon avatarName={userAvatar} />
        </div>
        <div className={style.contentsContainer}>
          <div className={style.upperContainer}>
            <CardTitle>{userName}</CardTitle>
            <div className={style.btnContainer}>
              {relationControlBtn.map((btnName) => (
                <UserCardButton key={btnName} btnName={btnName} />
              ))}
            </div>
          </div>
          <div className={style.descriptionContainer}>
            <CardDescription>{userIntro}</CardDescription>
          </div>
        </div>
      </Card>
    </>
  );
}
