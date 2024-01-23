export interface IVideoData {
  id: string;
  information: string;
  song: string;
  singer: string;
}

export interface IVideoInfoProps {
  title: string;
  views: string;
  onAddButtonClick?: () => void;
}

export interface IVideoUrl {
  url: string;
}
