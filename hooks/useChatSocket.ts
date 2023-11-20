import {Socket, io} from 'socket.io-client';
type SocketNamespace =
  | 'friends'
  | 'global'
  | 'channel'
  | 'dm'
  | 'game'
  | 'matching';

import {useCallback} from 'react';
const sockets: {[key: string]: Socket} = {};
const useChatSocket = (namespace: SocketNamespace): [Socket, () => void] => {
  const disconnect = useCallback(() => {
    if (!sockets[namespace]) return;
    sockets[namespace].disconnect();
    delete sockets[namespace];
  }, [namespace]);

  if (sockets[namespace]) return [sockets[namespace], disconnect];
  let url;
  if (namespace === 'global') url = chatSocketUrl;
  else url = chatSocketUrl;

  sockets[namespace] = io(url, {
    autoConnect: false,
    transports: ['websocket']
    // auth: {
    //   Authorization: `Bearer ${getAuthorization()}`
    // }
  });
  return [sockets[namespace], disconnect];
};

const chatSocketUrl = process.env.NEXT_PUBLIC_CHAT_SOCKET ?? '';

export default useChatSocket;
