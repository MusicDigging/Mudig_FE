import { atom, RecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IMusic, IPlaylist } from '../types/playlist';

import { ISignup, IUser } from '../types/user';

const { persistAtom } = recoilPersist();
export interface IToast {
  content: string;
  type: 'success' | 'error' | 'warning';
}

interface PlaylistTypes {
  playlist: IPlaylist;
  music: IMusic[];
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

export const PlayListAtom = atom<PlaylistTypes>({
  key: 'PlayListAtom',
  default: {
    playlist: {
      id: 0,
      like_count: 0,
      like_playlist: false,
      title: '',
      content: '',
      thumbnail: '',
      genre: '',
      is_active: false,
      created_at: '',
      updated_at: '',
      is_public: true,
      writer: 0,
      music: [],
    },
    music: [],
  },
});

export const userInfoAtom = atom<IUser>({
  key: 'userInfoAtom',
  default: {
    id: 0,
    email: '',
    name: '',
    image: '',
    genre: '',
    about: '',
    rep_playlist: null,
    token: {
      access: '',
      refresh: '',
    },
  },
  effects_UNSTABLE: [persistAtom],
});

export const signUpInfoAtom = atom<ISignup>({
  key: 'signUpInfoAtom',
  default: {
    email: '',
    password: '',
    type: '',
  },
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

export const toastAtom = atom<IToast | null>({
  key: 'toastAtom',
  default: null,
});
