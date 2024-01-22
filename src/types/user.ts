export interface UserInfo {
  id: number;
  email: string;
  name: string;
  genre: string | string[];
  about: string;
  rep_playlist: number | null;
  token: {
    access: string;
    refresh: string;
  };
}
