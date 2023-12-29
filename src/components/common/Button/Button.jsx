import styled from 'styled-components';
import { InfoToast } from '../../../library/sweetAlert/sweetAlert';
import { toastAtom } from '../../../library/atom';
import { useSetRecoilState } from 'recoil';
export function Button(props) {
  const {
    type,
    text,
    onClick,
    disabled,
    btnBgColor,
    btnColor,
    btnMargin,
    btnBorder,
    btnWidth,
    btnHeight,
    imgSrc,
  } = props;

  return (
    <ButtonStyle
      type={type ? type : 'button'}
      onClick={onClick}
      btnBgColor={btnBgColor}
      btnBorder={btnBorder}
      btnMargin={btnMargin}
      btnColor={btnColor}
      btnWidth={btnWidth}
      btnHeight={btnHeight}
      disabled={disabled}
      imgSrc={imgSrc}
    >
      {text}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button`
  width: ${(props) => props.btnWidth || '100%'};
  height: ${(props) => props.btnHeight || '44px'};
  margin: ${(props) => props.btnMargin || '0px'};
  background: ${(props) =>
    props.imgSrc ? `url(${props.imgSrc}) no-repeat 16px 50%` : 'none'};
  background-color: ${(props) => props.btnBgColor || 'var( --btn-point-color)'};
  border: ${(props) => props.btnBorder || '1px solid var(--btn-border-color)'};
  color: ${(props) => props.btnColor || 'white'};
  cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  //변하지 않는 값
  border-radius: 10px;
  &:not(:disabled) {
    cursor: pointer;
    opacity: 1;
  }
`;

export function ChipButton(props) {
  const { name, onSelect, selectedChips } = props;
  const setToast = useSetRecoilState(toastAtom);
  const isChipSelected = selectedChips.includes(name);

  const handleClick = () => {
    if (isChipSelected) {
      // 이미 선택된 chip인지 확인
      onSelect(selectedChips.filter((chipName) => chipName !== name));
    } else {
      // 최대 chip 3개까지 설정
      if (selectedChips.length < 3) {
        onSelect([...selectedChips, name]);
      } else {
        setToast({
          content: '관심사는 최대 3개까지 선택 가능합니다.',
          type: 'warning',
        });
      }
    }
  };

  return (
    <ChipButtonStyle
      type='button'
      onClick={handleClick}
      clicked={isChipSelected}
    >
      {name}
    </ChipButtonStyle>
  );
}

const ChipButtonStyle = styled.button`
  height: 36px;
  font-size: 14px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.clicked ? 'var(--main-color)' : '#fff')};
  color: ${(props) =>
    props.clicked ? 'var(--main-color)' : 'var( --sub-font-color)'};
  background-color: ${(props) =>
    props.clicked ? '#E5DCFF' : 'rgba(255, 255, 255, 0.6)'};
  padding: 8px 16px;
  transition: 0.3s;
  cursor: pointer;
`;
