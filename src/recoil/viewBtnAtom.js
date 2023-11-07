import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'session',
  storage: sessionStorage,
});

export const viewBtnState = atom({
  key: 'viewBtnState',
  default: '별점순',
  effects_UNSTABLE: [persistAtom],
});
