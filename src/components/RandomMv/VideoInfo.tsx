// VideoInfo.js
import styled from 'styled-components';
import addIcon from '../../img/add-video-icon.svg';

export interface Props {
  title: string;
  views: string;
  onAddButtonClick?: () => void;
}

const VideoInfo = ({ title, views, onAddButtonClick }: Props) => {
  const handleAddButtonClick = () => {
    //플리추가 콜백
    if (onAddButtonClick) {
      onAddButtonClick();
    }
  };

  return (
    <InfoWrap>
      <InfoBox>
        <p>{title}</p>
        <span>{views}</span>
      </InfoBox>
      <img onClick={handleAddButtonClick} src={addIcon} alt='뮤비 추가 버튼' />
    </InfoWrap>
  );
};

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;

  img {
    cursor: pointer;
    width: 25px;
    height: 31px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  gap: 3px;
  flex-direction: column;

  p {
    font-weight: var(--font-bold);
  }

  span {
    color: #575757;
  }
`;

export default VideoInfo;
