import {useCallback, useEffect, useReducer, useRef, useState} from 'react';
import useSocket from '@/hooks/useSocket';
import ChannelBody from '@/components/channel/body/ChannelBody';
import ChannelList from '@/components/channel/list/ChannelList';
import ChannelHeader from '@/components/channel/header/ChannelHeader';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import ChannelInput from '@/components/channel/body/ChannelInput';
import {channelStateType} from '@/types/channel';
import {MsgHistoryType} from '@/types/channel';
import GridChannelList from '@/components/channel/list/GridChannelList';

const initialStateInfo: channelStateType = {
  channelName: '',
  channelId: '',
  engagedChannels: [],
  myProfileImage: '',
  myName: '',
  myId: ''
};

function channelInfoReducer(state: any, action: any) {
  switch (action.type) {
    case 'ID_SET': // channelId 변경됨
      return {
        ...state,
        channelId: action.payload
      };
    case 'NAME_SET': // channelName 변경됨
      return {
        ...state,
        channelName: action.payload
      };
    case 'ENGAGED_SET': // engagedChannels 변경됨
      return {
        ...state,
        engagedChannels: action.payload
      };
    case 'CHANNEL_LEAVE': // 참여중인 채널 떠남
      return {
        ...state,
        channelName: '',
        channelId: ''
      };
    case 'MY_INFO_SET': // 내 프로필 이미지 변경됨
      return {
        ...state,
        myProfileImage: action.payload.profileImage,
        myName: action.payload.name,
        myId: action.payload.id
      };
    default:
      return state;
  }
}

const messageReducer = (state: MsgHistoryType[], action: any) => {
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
  const [historyLoading, setHistoryLoading] = useState(false);
  const [socket] = useSocket('channel');
  const channelInfoRef = useRef(channelInfoState);
  const [myInfoSocket] = useSocket('alarm');
  const {channelName, channelId} = channelInfoState;
  useEffect(() => {
    socket.on('connect', () => {
      console.log('---------connected----------');
    });
    myInfoSocket.emit('myInfo', (data: any) => {
      infoDispatch({
        type: 'MY_INFO_SET',
        payload: data
      });
      channelInfoRef.current = {
        ...channelInfoRef.current,
        myProfileImage: data.profileImage,
        myName: data.name,
        myId: data.id
      };
    });
    socket.on('disconnect', () => {
      console.log('---------disconnected----------');
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div className='flex h-full'>
      {channelInfoState.channelName === '' ||
      channelInfoRef.current.channelName === '' ? null : (
        <ChannelList
          channelInfoState={channelInfoState}
          infoDispatch={infoDispatch}
          messageDispatch={messageDispatch}
          ref={channelInfoRef}
          setHistoryLoading={setHistoryLoading}
        />
      )}

      <div className='flex flex-col h-full w-full gap-2'>
        <ChannelHeader
          channelInfoState={channelInfoState}
          infoDispatch={infoDispatch}
        />
        {channelInfoState.channelName === '' ||
        channelInfoRef.current.channelName === '' ? (
          <GridChannelList
            channelInfoState={channelInfoState}
            infoDispatch={infoDispatch}
            messageDispatch={messageDispatch}
            ref={channelInfoRef}
            setHistoryLoading={setHistoryLoading}
          />
        ) : (
          <>
            <ScrollableContainer className='bg-custom2 rounded-none h-full'>
              <ChannelBody
                channelInfoState={channelInfoState}
                messageState={messageState}
                messageDispatch={messageDispatch}
                ref={channelInfoRef}
                historyLoading={historyLoading}
              />
            </ScrollableContainer>
            <ChannelInput
              channelId={channelId}
              historyLoading={historyLoading}
            />
          </>
        )}
      </div>
    </div>
  );
}
