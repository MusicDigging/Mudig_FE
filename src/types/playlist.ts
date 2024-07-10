export interface IPlaylist {
  id: number;
  like_count: number;
  like_playlist: boolean;
  title: string;
  content: string;
  thumbnail: string;
  genre: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  writer: number;
  music: number[];
}

export interface IWriterProfile {
  id: number;
  name: string;
  image: string;
  about: string;
  genre: string;
  email: string;
  rep_playlist: number;
}

export interface IComment {
  is_active: boolean;
  playlist: number;
  id: number;
  content: string;
  writer: number;
  parent: number | null;
  writer_profile: IWriterProfile;
  created_at: string;
  updated_at: string;
}

export interface IReply {
  [key: string]: IComment[];
}

export interface IMusic {
  id: number;
  information: string;
  singer: string;
  song: string;
  thumbnail: string;
  created_at: string;
}

export interface IPlaylistDesc {
  title: string;
  content: string;
  is_public: boolean;
}

export interface ICreatePlaylist {
  situations?: string;
  genre?: string;
  year?: string;
  backAnimation?: boolean;
}

export type IPlaylistType = 'recommend' | 'hot' | 'new' | 'my';
