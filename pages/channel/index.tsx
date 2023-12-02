import {useCallback, useEffect, useReducer, useRef} from 'react';
import Image from 'next/image';
import WaitImage from '@/public/postcss.config.png';
import useChatSocket from '@/hooks/useChatSocket';
import ChannelBody from '@/components/channel/body/ChannelBody';
import ChannelList from '@/components/channel/list/ChannelList';
import ChannelHeader from '@/components/channel/header/ChannelHeader';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import ChannelInput from '@/components/channel/body/ChannelInput';
import {toast} from '@/components/shadcn/ui/use-toast';
import {channelStateType} from '@/types/channel';
import {ChannelHistoryType} from '@/types/channel';
import {useRouter} from 'next/router';
const initialStateInfo: channelStateType = {
  channelName: '',
  channelID: '',
  role: 'owner',
  engagedChannels: []
};

function channelInfoReducer(state: any, action: any) {
  switch (action.type) {
    case 'ID_SET': // channelId 변경됨
      console.log('ID_SET', action.payload);
      return {
        ...state,
        channelID: action.payload
      };
    case 'NAME_SET': // channelName 변경됨
      return {
        ...state,
        channelName: action.payload
      };
    case 'ROLE_SET': // role 변경됨
      return {
        ...state,
        role: action.payload
      };
    case 'ENGAGED_SET': // engagedChannels 변경됨
      return {
        ...state,
        engagedChannels: action.payload
      };
    default:
      return state;
  }
}

const messageReducer = (state: ChannelHistoryType[], action: any) => {
  switch (action.type) {
    case 'MESSAGE_SET': // message 변경됨
      return action.payload;
    case 'MESSAGE_ADD': // message 추가됨
      return [...state, action.payload];
    default:
      return state;
  }
};

export default function ChannelPage() {
  const [channelInfoState, infoDispatch] = useReducer(
    channelInfoReducer,
    initialStateInfo
  );
  const [messageState, messageDispatch] = useReducer(messageReducer, []);
  const [socket] = useChatSocket('channel');
  const {channelName, channelID} = channelInfoState;
  const channelInfoRef = useRef(channelInfoState);
  const router = useRouter();
  const myRoleHandler = useCallback(({role}: any) => {
    console.log('myRole', role);
    infoDispatch({
      type: 'ROLE_SET',
      payload: role
    });
  }, []);
  const errorHandler = useCallback(({error}: any) => {
    console.log('error', error);
    toast(error);
  }, []);
  useEffect(() => {
    socket.on('connect', () => {
      console.log('---------connected----------');
      socket.on('myRole', myRoleHandler);
      socket.on('error_exist', errorHandler);
    });
    socket.on('disconnect', () => {
      console.log('---------disconnected----------');
    });
    return () => {
      console.log('---------off----------');
      socket.off('myRole', myRoleHandler);
      socket.off('error_exist', errorHandler);
    };
  }, [router.pathname]);

  return (
    <div className='flex h-full'>
      <ChannelList
        channelInfoState={channelInfoState}
        infoDispatch={infoDispatch}
        messageDispatch={messageDispatch}
        ref={channelInfoRef}
      />
      <div className='flex flex-col h-full w-full'>
        <ChannelHeader channelInfoState={channelInfoState} />
        {channelName === '' ? (
          <Image
            src={WaitImage}
            alt='채널에 참여해주세요'
            className='bg-custom4 h-full w-full'
          />
        ) : (
          <>
            <ScrollableContainer className='bg-custom2 rounded-none'>
              <ChannelBody
                channelInfoState={channelInfoState}
                messageState={messageState}
                messageDispatch={messageDispatch}
                ref={channelInfoRef}
              />
            </ScrollableContainer>
            <ChannelInput channelId={channelID} />
          </>
        )}
      </div>
    </div>
  );
}
