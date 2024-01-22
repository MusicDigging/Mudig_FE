
export interface FormData {
  nickName: string;
  about: string;
  genre: string;
  rep_playlist: string;
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

