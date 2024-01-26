export interface IOtpResponse {
  message: string;
  otp: string;
}

export interface ISignup {
  email: string;
  password?: string;
  type: string;
}

export interface ILogin {
  user: {
    id: number;
    name: string;
    about: string;
    genre: string;
    email: string;
    image: string;
    rep_playlist: number | null;
  };
  message: string;
  token: {
    access: string;
    refresh: string;
  };
}
