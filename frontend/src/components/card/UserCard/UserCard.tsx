/*

user card component

how to use: <UserCard userInfo={userInfo} cardType={cardType} />

usage tip:
1. locate this component in to the container which has flex flex-col px-1 style

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

import UserCardButton from './UserCardButton';
import UserCardAvatar from './UserCardAvatar';

import {Card, CardDescription, CardTitle} from '@/components/shadcn/card';

export default function UserCard(props: any) {
  // get objects from props
  const userName = props.userInfo.name;
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

  // tailwind css style
  const style = {
    card: 'flex flex-row justify-between w-full my-1',
    contentsContainer: 'flex flex-col w-full p-1',
    upperContainer: 'flex flex-row justify-between w-full p-1',
    btnContainer: 'flex flex-row justify-between items-center space-x-1',
    descriptionContainer: 'p-1'
  };

  return (
    <>
      <Card className={style.card}>
        <UserCardAvatar userInfo={props.userInfo} />
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
