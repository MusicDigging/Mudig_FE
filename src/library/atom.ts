import { atom, RecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { UserInfo } from '../types/user';

const { persistAtom } = recoilPersist();

export interface Toast {
  content: string;
  type: string;
}

// 회원가입 토큰 정보
export const SignUpAtom = atom<{
  isLogin: boolean;
}>({
  key: 'SignUpAtom',
  default: {
    isLogin: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const PlayListAtom = atom<Record<string, any>>({
  key: 'PlayListAtom',
  default: {},
});

export const userInfoAtom = atom<UserInfo | null>({
  key: 'userInfoAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const isLoginAtom = atom<boolean>({
  key: 'isLoginAtom',
  default: localStorage.getItem('token') ? true : false,
});

export const backAnimationAtom = atom<boolean>({
  key: 'backAnimationAtom',
  default: false,
});

export const commentEditIdAtom = atom<number | null>({
  key: 'commentEditIdAtom',
  default: null,
});

export const commentAtom = atom<string>({
  key: 'commentAtom',
  default: '',
});

export const toastAtom = atom<Toast | null>({
  key: 'toastAtom',
  default: null,
});
