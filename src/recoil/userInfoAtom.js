import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'session',
  storage: sessionStorage,
});

export const userInfoState = atom({
  key: 'userInfoState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
