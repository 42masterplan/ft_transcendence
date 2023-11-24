import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';
import {v1} from 'uuid';
//이단계 인증을 위한 전역 상태 false면 아직 인증되지 않았다는 의미
const {persistAtom} = recoilPersist();
export const twoFactorAuthorizeState = atom<boolean>({
  key: `twoFactorAuthorizeState ${v1()}`,
  default: false,
  effects_UNSTABLE: [persistAtom]
});
