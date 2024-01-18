import styled from 'styled-components';
import { toastAtom } from '../../../library/atom';
import { useSetRecoilState } from 'recoil';

interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  btnBgColor?: string;
  btnColor?: string;
  btnMargin?: string;
  btnBorder?: string;
  btnWidth?: string;
  btnHeight?: string;
  imgSrc?: string;
}

export function Button(props: IButtonProps) {
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

interface IButtonStyleProps {
  btnWidth?: string;
  btnHeight?: string;
  btnMargin?: string;
  btnBgColor?: string;
  btnBorder?: string;
  btnColor?: string;
  disabled?: boolean;
  imgSrc?: string;
}

const ButtonStyle = styled.button<IButtonStyleProps>`
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
  border-radius: 10px;
  &:not(:disabled) {
    cursor: pointer;
    opacity: 1;
  }
`;

interface ChipButtonProps {
  name: string;
  onSelect: (selectedChips: string[]) => void;
  selectedChips: string[];
}

interface IToast {
  content: string;
  type: string;
}

export function ChipButton(props: ChipButtonProps) {
  const { name, onSelect, selectedChips } = props;
  const setToast = useSetRecoilState<IToast | null>(toastAtom);

  const isChipSelected = selectedChips.includes(name);

  const handleClick = () => {
    if (isChipSelected) {
      onSelect(selectedChips.filter((chipName) => chipName !== name));
    } else {
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

interface ChipButtonStyleProps {
  clicked: boolean;
}

const ChipButtonStyle = styled.button<ChipButtonStyleProps>`
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
