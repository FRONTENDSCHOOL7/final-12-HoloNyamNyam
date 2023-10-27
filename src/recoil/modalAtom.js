import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// recoil의 저장소 상태의 기본 형태
// key는 상태에 대한 식별자로 다른 상태 key 이름을 중복 선언하면 에러
// 통상적으로 key 이름은 변수 이름하고 똑같이 함
// default는 초기값
export const modalState = atom({
  key: 'modalState',
  default: { show: false, type: 'myProfile', commentId: null, feedId: null },
  effects_UNSTABLE: [persistAtom],
});
