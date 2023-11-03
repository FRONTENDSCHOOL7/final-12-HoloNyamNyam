import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const viewBtnState = atom({
  key: 'viewBtnState',
  default: '별점순',
  effects_UNSTABLE: [persistAtom],
});
