import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

//회원가입 토큰 정보
export const SignUpAtom = atom({
  key: 'SignUpAtom',
  default: {
    isLogin: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const PlayListAtom = atom({
  key: 'PlayListAtom',
  default: {},
});

export const userInfoAtom = atom({
  key: 'userInfoAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const isLoginAtom = atom({
  key: 'isLoginAtom',
  default: localStorage.getItem('token') ? true : false,
});

export const backAnimationAtom = atom({
  key: 'backAnimationAtom',
  default: false,
});

export const commentEditIdAtom = atom({
  key: 'commentEditIdAtom',
  default: null,
});

export const commentAtom = atom({
  key: 'commentAtom',
  default: '',
});

export const toastAtom = atom({
  key: 'toastAtom',
  default: null,
});
