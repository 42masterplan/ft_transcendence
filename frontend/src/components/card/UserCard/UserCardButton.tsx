/*
button types:
1. match: match with this user
2. follow: follow this user (add to friend)
3. unfollow: unfollow this user (remove from friend)
4. block: block this user (remove from friend and block)
5. unblock: unblock this user (remove from blocked list)

- All buttons will use Tooltip and toaster component from shadcn

- WARNING!: These buttons should only be used in UserCard..
  ask me when you want to use them in other components.

- note: this component has issues with rendering stuffs inside TooltipContent
it is commented out for now, but it will be fixed in the future. 

TODO
1. add request to server
2. fix errors with TooltipContent

*/

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';

import {Button} from '@/components/shadcn/button';
import {ToastAction} from '@/components/shadcn/toast';
import {useToast} from '@/components/shadcn/use-toast';

// props for MatchButton: {btnName}
export default function UserCardButton(props: any) {
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

  // tailwind css style
  const style = {
    btn: 'bg-color_3 flex justify-center items-center p-1 rounded-md h-min'
  };

  return (
    <>
      <Button className={style.btn} onClick={handleClick}>
        <TooltipProvider>
          <Tooltip>
            {/* <TooltipTrigger> */}
            <img src={btnIconPath} alt={btnName} />
            {/* </TooltipTrigger> */}
            <TooltipContent>
              <p>{details}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>
    </>
  );
}
