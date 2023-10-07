import UserCard from '@/components/card/UserCard';
import {APIContext} from '@/components/Layout';
import {useContext} from 'react';

export default function Home() {
  // tailwind css style
  const style = {
    // TODO: Erase Border
    mainContainer:
      'border-solid border-2 border-sky-500 flex flex-row justify-between w-full',
    subContainer: 'border-solid border-2 border-sky-500 flex flex-col w-full'
  };

  // SHOULD BE FIXED: Get REAL data from APIContext ----------------------------
  // Get dummy data from APIContext
  const {friendInfos} = useContext(APIContext);

  const mySelf = friendInfos[0]; // change this to real data
  // ----------------------------------------------------------------------------

  return (
    <>
      <div className={style.mainContainer}>
        {/* section left ->  user profile, rank, achievements */}
        <section className={style.subContainer}>
          <p>LEFT SECTION</p>
          <UserCard userInfo={mySelf} cardType='basic' />
          <UserCard userInfo={mySelf} cardType='friend' />
          <UserCard userInfo={mySelf} cardType='noneFriend' />
          <UserCard userInfo={mySelf} cardType='friendRequest' />
          <UserCard userInfo={mySelf} cardType='blockedUser' />
          <p>- User rank will be placed here</p>
          <p>- User achievements will be placed here</p>
        </section>
        {/* section right ->  game history */}
        <section className={style.subContainer}>
          <p>RIGHT SECTION</p>
          <p>- Game history will be placed here</p>
        </section>
      </div>
    </>
  );
}
