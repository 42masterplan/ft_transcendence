import {useEffect, useCallback} from 'react';
import useSocket from './useSocket';
import {useToast} from '@/components/shadcn/ui/use-toast';

interface SocketAction {
  (channelId: string, userId: string, user_name: string): void;
}

const useSocketAction = (
  actionType: string,
  successTitle: string,
  successDescription: string,
  failureTitle: string,
  failureDescription: string
) => {
  const [socket, disconnect] = useSocket('channel');
  const {toast} = useToast();

  const executeAction: SocketAction = useCallback(
    (channelId: string, userId: string, user_name: string) => {
      if (!socket) {
        console.error('Socket not initialized.');
        return;
      }
      socket.emit(
        actionType,
        {
          channelId,
          userId
        },
        (res: string) => {
          if (res === `${actionType} Success!`) {
            toast({
              title: successTitle,
              description: user_name + successDescription
            });
          } else {
            toast({
              title: failureTitle,
              description: user_name + failureDescription
            });
          }
        }
      );
    },
    [toast]
  );
  return executeAction;
};

export default useSocketAction;
