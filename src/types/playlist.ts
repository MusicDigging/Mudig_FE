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
  writer: boolean;
  music: number[];
}

export interface Music {
  id: number;
  information: string;
  singer: string;
  song: string;
  thumbnail: string;
  created_at: string;
}
