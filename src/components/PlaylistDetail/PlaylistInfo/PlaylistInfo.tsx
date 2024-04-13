import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { PlayListAtom } from '../../../library/atom';
import Thumbnail from './Thumbnail';
import { DefaultTitle, SummaryTitle } from './Title';
import Writer from './Writer';
import Desc from './Desc';
import PrivateIndicator from './PrivateIndicator';
import InfoBox from './InfoBox';
import ModifyBtn from './ModifyBtn';
import MoreInfo from './MoreInfo';

interface Props {
  children: React.ReactNode;
}

function PlaylistInfo({ children }: Props) {
  const { playlist } = useRecoilValue(PlayListAtom);

  return (
    <PlayListInfoWrap
      backgroundUrl={`https://mudigbucket.s3.ap-northeast-2.amazonaws.com/${playlist.thumbnail}`}
    >
      {children}
    </PlayListInfoWrap>
  );
}

const Information = Object.assign(PlaylistInfo, {
  InfoBox: InfoBox,
  Title: DefaultTitle,
  SummaryTitle: SummaryTitle,
  Thumbnail: Thumbnail,
  Desc: Desc,
  PrivateIndicator: PrivateIndicator,
  Writer: Writer,
  MoreInfoBtn: MoreInfo,
  ModifyBtn: ModifyBtn,
});

export default Information;

const PlayListInfoWrap = styled.section<{
  backgroundUrl: string;
}>`
  position: relative;
  padding-top: 43px;
  line-height: normal;

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${(props) => props.backgroundUrl}) lightgray 50% / cover
      no-repeat;
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
    transform: scale(1.05);
    z-index: -1;
  }
`;
