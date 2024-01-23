import { Playlist, Music } from './playlist';
import { User } from './user';

export interface SearchResult {
  recent_users: User[];
  recent_playlists: {
    playlist: Playlist;
    writer: User | '유저 정보 없음';
  }[];
  users: User[];
  playlists: {
    playlist: Playlist;
    writer: User | '유저 정보 없음';
  }[];
  search_music: Array<{ music_count: number; music: Music[] }>;
}
