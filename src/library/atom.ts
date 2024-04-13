import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IMusic, IPlaylist } from '../types/playlist';

import { IMyData, IUser } from '../types/user';
import { ISignup } from '../types/setUser';

const { persistAtom } = recoilPersist();
export interface IToast {
  content: string;
  type: 'success' | 'error' | 'warning';
}

interface PlaylistTypes {
  playlist: IPlaylist;
  music: IMusic[];
  user: IUser;
}

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
    user: {
      id: 0,
      email: '',
      name: '',
      image: '',
      genre: '',
      about: '',
      rep_playlist: null,
    },
  },
});

export const userInfoAtom = atom<IMyData>({
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
