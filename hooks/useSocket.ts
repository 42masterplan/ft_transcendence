import {Socket, io} from 'socket.io-client';
import {useCallback} from 'react';
type SocketNamespace = 'channel' | 'dm' | 'game' | 'alarm';
const socketUrl = process.env.NEXT_PUBLIC_CHAT_SOCKET ?? '';
const sockets: {[key: string]: Socket} = {};
const useSocket = (namespace: SocketNamespace): [Socket, () => void] => {
  const disconnect = useCallback(() => {
    if (!sockets[namespace]) return;
    sockets[namespace].disconnect();
    delete sockets[namespace];
  }, [namespace]);
  let url = socketUrl + '/' + namespace;
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

export default useSocket;
