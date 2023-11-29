import {atom} from 'recoil';

import {v1} from 'uuid';

export interface channelnfoType {
  channelName: string;
  channelID: string;
}

export const loginState = atom<channelnfoType>({
  key: `channel ${v1()}`,
  default: {
    channelName: '',
    channelID: ''
  }
});
