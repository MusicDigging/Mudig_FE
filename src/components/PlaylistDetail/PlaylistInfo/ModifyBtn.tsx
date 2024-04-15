import styled from 'styled-components';
import PenIcon from '../../../img/pen-icon.svg';

interface Props {
  isOpenModifyModal: () => void;
  openButtonRef: React.RefObject<HTMLButtonElement>;
}

export default function ModifyBtn({ isOpenModifyModal, openButtonRef }: Props) {
  return (
    <ModifyButton
      onClick={isOpenModifyModal}
      aria-haspopup='dialog'
      ref={openButtonRef}
    >
      <img src={PenIcon} alt='수정' />
    </ModifyButton>
  );
}
const ModifyButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 24px;
  transform: translate(-15px, -67px);
`;
