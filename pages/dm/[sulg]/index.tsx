import {useState} from 'react';
import SpinningLoader from '@/components/loader/SpinningLoader';
import {useRouter} from 'next/router';

export default function DMPage() {
  const router = useRouter();
  const [DMData, setDMData] = useState(null);
  // check if the current user is friend with the user in the url
  // if not, redirect to /social
  // if yes, render the DM page
  async function checkFriendStatus() {
    // dummy function to test
    // wait for 1 sec
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = true; // change to false to test friend request failed
    if (response) {
      return true;
    } else {
      return false;
    }
  }

  async function getDMData(): Promise<any> {
    const isFriend = await checkFriendStatus();
    if (!isFriend) {
      // if not friend or error, redirect to /social
      router.push('/social');
    } else {
      // get DM data (connect socket)
      // dummy function to test
      // wait for 1 sec
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = true; // change to false to test friend request failed
      if (response) {
        const DMData =
          'THIS IS DUMMY DM DATA. PLEASE CHANGE IT TO REAL DATA. JSON FORMAT IS PREFERRED';
        return DMData;
      } else {
        return null;
      }
    }
  }

  // when getDMData() is done, setDMData() to the result
  getDMData().then((result) => {
    setDMData(result);
  });

  if (!DMData) {
    return <SpinningLoader />;
  }
  return (
    <div>
      <div>DM Page</div>
      <div>{DMData}</div>
    </div>
  );
}
