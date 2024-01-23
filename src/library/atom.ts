import { atom, RecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { Music, Playlist } from '../types/playlist';

import { User } from '../types/user';

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

interface PlaylistTypes {
  playlist: Playlist;
  music: Music[];
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
    // music: {
    //   id: 0,
    //   information: '',
    //   singer: '',
    //   song: '',
    //   thumbnail: '',
    //   created_at: '',
    // },
    music: [],
  },
});

export const userInfoAtom = atom<User | null>({
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
