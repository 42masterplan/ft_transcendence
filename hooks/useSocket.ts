import {Socket, io} from 'socket.io-client';
import {useCallback} from 'react';
type SocketNamespace = 'channel' | 'dm' | 'game' | 'alarm' | 'ladder';
const socketUrl = process.env.NEXT_PUBLIC_CHAT_SOCKET ?? '';
const sockets: {[key: string]: Socket} = {};
import getAuthorization from '@/lib/utils/cookieUtils';
const useSocket = (
  namespace: SocketNamespace,
  options?: any
): [Socket, () => void] => {
  const disconnect = useCallback(() => {
    if (!sockets[namespace]) return;
    sockets[namespace].disconnect();
    delete sockets[namespace];
  }, [namespace]);
  let url = socketUrl + '/' + namespace;
  console.log('autoConnectOption', options?.autoConnect);
  const autoConnectOption =
    options?.autoConnect === undefined ? options?.autoConnect : true;
  if (sockets[namespace]) return [sockets[namespace], disconnect];
  sockets[namespace] = io(url, {
    autoConnect: autoConnectOption,
    transports: ['websocket'],
    auth: {
      Authorization: `Bearer ${getAuthorization()}`
    }
  });
  return [sockets[namespace], disconnect];
};

export default useSocket;
