export interface User {
  id: number;
  name: string;
  image: string;
  about: string;
  genre: string;
  email: string;
  rep_playlist: number | null;
}
