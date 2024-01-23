export interface User {
  id: number;
  email: string;
  name: string;
  image: string;
  genre: string | string[];
  about: string;
  rep_playlist: number | null;
  token: {
    access: string;
    refresh: string;
  };
}
