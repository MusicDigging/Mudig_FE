export interface IUser {
  id: number;
  email: string;
  name: string;
  image: string;
  genre: string | string[];
  about: string;
  rep_playlist: number | null;
}
export interface IMyData extends IUser {
  token: {
    access: string;
    refresh: string;
  };
}
