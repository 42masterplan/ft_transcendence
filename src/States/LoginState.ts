import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

//페이지가 변경되도 변경 상태를 유지하기 위해서 사용된다.
const {persistAtom} = recoilPersist();

export const LoginState = atom<boolean>({
  key: 'LoginState',
  default: false,
  effects_UNSTABLE: [persistAtom]
});
