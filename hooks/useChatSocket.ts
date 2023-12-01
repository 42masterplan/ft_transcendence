import {Socket, io} from 'socket.io-client';
type SocketNamespace =
  | 'friends'
  | 'global'
  | 'channel'
  | 'dm'
  | 'game'
  | 'matching';

import {useCallback} from 'react';
const chatSocketUrl = process.env.NEXT_PUBLIC_CHAT_SOCKET ?? '';
const sockets: {[key: string]: Socket} = {};
const useChatSocket = (namespace: SocketNamespace): [Socket, () => void] => {
  const disconnect = useCallback(() => {
    if (!sockets[namespace]) return;
    sockets[namespace].disconnect();
    delete sockets[namespace];
  }, [namespace]);
  let url = chatSocketUrl + '/' + namespace;
  if (sockets[namespace]) return [sockets[namespace], disconnect];
  sockets[namespace] = io(url, {
    autoConnect: true,
    transports: ['websocket']
    // auth: {
    //   Authorization: `Bearer ${getAuthorization()}`
    // }
  });
  return [sockets[namespace], disconnect];
};

export default useChatSocket;
