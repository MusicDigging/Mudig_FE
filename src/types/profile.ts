import { Playlist } from './playlist';

export interface FormDataType {
  nickName: string;
  about: string;
  genre: string;
  rep_playlist: string | null;
  image: File | null;
}

export interface Profile {
  id: number;
  name: string;
  about: string;
  genre: string;
  email: string;
  rep_playlist: number;
  is_following: boolean | null;
  image: string;
}

export interface IUserProfileData {
  email?: string;
  password?: string;
  nickName: string;
  about: string;
  genre: string;
  rep_playlist?: string | null;
  image?: File | null;
}

export interface Follow {
  id: number;
  profile_image: string;
  nickname: string;
  is_following: boolean;
}

export interface ProfileData {
  profile: Profile;
  playlist: Playlist;
  liked_playlists?: Playlist;
  following: Follow[];
  follower: Follow[];
  UserId: number;
}
