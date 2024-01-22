export interface Playlist {
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

export interface WriterProfile {
  id: number;
  name: string;
  image: string;
  about: string;
  genre: string;
  email: string;
  rep_playlist: number;
}

export interface Comment {
  is_active: boolean;
  playlist: number;
  id: number;
  content: string;
  writer: number;
  parent: number | null;
  writer_profile: WriterProfile;
  created_at: string;
  updated_at: string;
}

export interface Reply {
  [key: string]: Comment[];
}

export interface Music {
  id: number;
  information: string;
  singer: string;
  song: string;
  thumbnail: string;
  created_at: string;
}
