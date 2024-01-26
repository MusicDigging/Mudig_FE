import { IPlaylist, IMusic } from './playlist';
import { IUser } from './user';

export interface ISearchResult {
  recent_users: IUser[];
  recent_playlists: {
    playlist: IPlaylist;
    writer: IUser | '유저 정보 없음';
  }[];
  users: IUser[];
  playlists: {
    playlist: IPlaylist;
    writer: IUser | '유저 정보 없음';
  }[];
  search_music: Array<{ music_count: number; music: IMusic[] }>;
}

export interface IStoredKeyword {
  id: number;
  keyword: string;
}

export interface ISearchNav {
  all: boolean;
  playlist: boolean;
  music: boolean;
  user: boolean;
}
