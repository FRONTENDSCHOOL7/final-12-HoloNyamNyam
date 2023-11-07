import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'session',
  storage: sessionStorage,
});

export const cardShowState = atom({
  key: 'cardShowState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
