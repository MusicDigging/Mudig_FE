import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { PlayListAtom } from '../../../library/atom';
import { Image } from '../../common/Image/Image';

interface Props {
  playing?: boolean;
}

export default function Thumbnail({ playing }: Props) {
  const { playlist } = useRecoilValue(PlayListAtom);

  return (
    <>
      <ThumbnailBox playing={playing}>
        {!playing && <Image src={playlist.thumbnail} alt='썸네일' />}
      </ThumbnailBox>
    </>
  );
}

const ThumbnailBox = styled.div<{ playing: boolean | undefined }>`
  width: 180px;
  height: ${(props) => (props.playing ? '4px' : null)};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: ${(props) => (props.playing ? '176px' : null)};
  transform: translate(70%, 20px);
  img {
    height: 180px;
  }
`;
