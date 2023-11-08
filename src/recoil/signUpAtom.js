import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'session',
  storage: sessionStorage,
});

export const signUpState = atom({
  key: 'signUpState',
  default: {
    oneCheck: false,
    twoCheck: false,
  },
  effects_UNSTABLE: [persistAtom],
});
