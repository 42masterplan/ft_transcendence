import {atom} from 'recoil';

import {v1} from 'uuid';
import {ChannelHistoryType} from '@/types/channel';
export interface channelnfoType {
  channelName: string;
  channelID: string;
  messages: ChannelHistoryType[];
  role: string;
}

export const loginState = atom<channelnfoType>({
  key: `channel ${v1()}`,
  default: {
    channelName: '',
    channelID: '',
    messages: [],
    role: ''
  }
});
