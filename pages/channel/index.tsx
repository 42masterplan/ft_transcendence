import {useCallback, useState, useEffect, useReducer} from 'react';
import Image from 'next/image';
import WaitImage from '@/public/postcss.config.png';
import {ChannelHistoryType} from '@/types/channel';
import useChatSocket from '@/hooks/useChatSocket';
import {ChannelBody} from '@/components/channel/body/ChannelBody';
import ChannelList from '@/components/channel/list/ChannelList';
import ChannelHeader from '@/components/channel/header/ChannelHeader';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import ChannelInput from '@/components/channel/body/ChannelInput';
import {toast} from '@/components/shadcn/ui/use-toast';

import produce from 'immer';
const initialState = {
  channelName: '',
  channelID: '',
  messages: [],
  role: 'users'
};

function channelReducer(state: any, action: any) {
  switch (action.type) {
    case 'ID_SET': // channelId 변경됨
      return {
        ...state,
        channelID: action.payload
      };
    case 'NAME_SET': // channelName 변경됨
      console.log('channelName 변경됨', action.payload);
      return {
        ...state,
        channelName: action.payload
      };
    case 'ROLE_SET': // role 변경됨
      return {
        ...state,
        role: action.payload
      };
    case 'MESSAGE_SET': // message 변경됨
      return {
        ...state,
        messages: action.payload
      };
    case 'MESSAGE_ADD': // message 추가됨
      return {
        ...state,
        messages: state.messages.concat(action.payload)
      };

    default:
      return state;
  }
}

export default function ChannelPage() {
  const [channelState, dispatch] = useReducer(channelReducer, initialState);

  const [socket] = useChatSocket('channel');

  const myRoleHandler = useCallback(({role}: any) => {
    console.log('myRole', role);
    // setRole(role);
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
  }, []);

  return (
    <div className='flex h-full'>
      <ChannelList channelState={channelState} dispatch={dispatch} />
      {channelState.channelName === '' ? (
        <div className='flex flex-col items-center h-full'>
          <ChannelHeader channelState={channelState} />
          <Image
            src={WaitImage}
            alt='채널에 참여해주세요'
            className='bg-custom4 h-full w-full'
          />
        </div>
      ) : (
        <div className='flex flex-col w-full h-full'>
          <ChannelHeader channelState={channelState} />
          <ScrollableContainer className=' bg-custom2 rounded-none'>
            <ChannelBody channelState={channelState} dispatch={dispatch} />
          </ScrollableContainer>
          <ChannelInput channelId={channelState.channelID} />
        </div>
      )}
    </div>
  );
}
