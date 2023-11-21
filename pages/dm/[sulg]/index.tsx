import {useState} from 'react';
import SpinningLoader from '@/components/loader/SpinningLoader';
import {useRouter} from 'next/router';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import MessageInputBar from '@/components/input/MessageInputBar';
import DMCard from '@/components/card/cardUsedInDMPage/DMCard';
import {DMType} from '@/lib/types';
import {DM} from '@/lib/classes/DM';

export default function DMPage() {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);
  const [msg, setMsg] = useState('');
  const [DMData, setDMData] = useState<DMType[] | null>(null);

  // IMPLEMENTING --------------------------------------------------------------

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

  // fetch DM data from server
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
        const dummyData: DMType[] = [
          {
            id: '1',
            senderName: 'receiver',
            senderProfileImage: '',
            receiverName: 'receiver',
            receiverProfileImage: '',
            content: 'Hello',
            sendTime: new Date()
          },
          {
            id: '2',
            senderName: 'sender',
            senderProfileImage: '',
            receiverName: 'receiver',
            receiverProfileImage: '',
            content: 'Hello',
            sendTime: new Date()
          },
          {
            id: '3',
            senderName: 'receiver',
            senderProfileImage: '',
            receiverName: 'receiver',
            receiverProfileImage: '',
            content: 'Hello',
            sendTime: new Date()
          },
          {
            id: '4',
            senderName: 'sender',
            senderProfileImage: '',
            receiverName: 'receiver',
            receiverProfileImage: '',
            content: 'Hello',
            sendTime: new Date()
          },
          {
            id: '5',
            senderName: 'receiver',
            senderProfileImage: '',
            receiverName: 'receiver',
            receiverProfileImage: '',
            content: 'Hello',
            sendTime: new Date()
          },
          {
            id: '6',
            senderName: 'sender',
            senderProfileImage: '',
            receiverName: 'receiver',
            receiverProfileImage: '',
            content:
              'receiverrece iverr e c eiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiverreceiver',
            sendTime: new Date()
          },
          {
            id: '7',
            senderName: 'sender',
            senderProfileImage: '',
            receiverName: 'receiver',
            receiverProfileImage: '',
            content: 'Hello',
            sendTime: new Date()
          },
          {
            id: '8',
            senderName: 'sender',
            senderProfileImage: '',
            receiverName: 'receiver',
            receiverProfileImage: '',
            content: 'Hello',
            sendTime: new Date()
          },
          {
            id: '9',
            senderName: 'receiver',
            senderProfileImage: '',
            receiverName: 'receiver',
            receiverProfileImage: '',
            content: 'Hello',
            sendTime: new Date()
          },
          {
            id: '10',
            senderName: 'sender',
            senderProfileImage: '',
            receiverName: 'receiver',
            receiverProfileImage: '',
            content: 'Hello',
            sendTime: new Date()
          }
        ];
        return dummyData;
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

  async function handleSendDM() {
    // wait for 1 sec
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = true; // change to false to test friend request failed
    if (response) {
      // if success,
    } else {
      // if failed, show error message
    }
  }

  // ---------------------------------------------------------------------------

  return (
    <>
      <div className='bg-custom4'>header</div>
      <ScrollableContainer gap={3}>
        <div>
          {DMData.map((dm) => (
            <DMCard key={dm.id} dmInfo={dm} myName='sender' className='mb-3' />
          ))}
        </div>
      </ScrollableContainer>
      <MessageInputBar
        isSending={isSending}
        setIsSending={setIsSending}
        msg={msg}
        setMsg={setMsg}
        handleSendMsg={handleSendDM}
      />
    </>
  );
}
