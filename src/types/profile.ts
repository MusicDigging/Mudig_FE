import { IPlaylist } from './playlist';

export interface IFormData {
  nickName: string;
  about: string;
  genre: string;
  rep_playlist: string | null;
  image: File | null;
}

export interface IProfile {
  id: number;
  name: string;
  about: string;
  genre: string;
  email: string;
  rep_playlist: number;
  is_following: boolean | null;
  image: string;
}

export interface IUserProfile {
  email?: string;
  password?: string;
  nickName: string;
  about: string;
  genre: string;
  rep_playlist?: string | null;
  image?: File | null;
}

export interface IFollow {
  id: number;
  profile_image: string;
  nickname: string;
  is_following: boolean;
}

export interface ProfileData {
  profile: IProfile;
  playlist: IPlaylist;
  liked_playlists?: IPlaylist;
  following: IFollow[];
  follower: IFollow[];
  UserId: number;
}
