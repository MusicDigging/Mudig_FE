import styled from 'styled-components';
import { useState } from 'react';
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
  width: ${(props) => props.btnWidth || '328px'};
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
  const { name } = props;
  //관심사 최대 3개까지 설정 이상 넘어갈 시 버튼 disabled 주기 & 백엔드로 관심사 보낼땐 문자열로 split해서 보낼 것
  const [chipClick, setChipClick] = useState(false);
  const [selectChip, setSelectChip] = useState([]);
  const handleClick = () => {
    setChipClick((prev) => !prev);
    selectChip.push(name);
    console.log(selectChip);
  };

  return (
    <ChipButtonStyle onClick={handleClick} clicked={chipClick}>
      {name}
    </ChipButtonStyle>
  );
}

const ChipButtonStyle = styled.button`
  font-size: 14px;
  border: 1px solid lightgray;
  border-radius: 20px;
  color: ${(props) => (props.clicked ? 'white' : 'black')};
  background-color: ${(props) =>
    props.clicked ? 'var(--btn-point-color)' : 'white'};
  padding: 8px 16px;
  transition:
    background-color 0.3s,
    color 0.3s;
  cursor: pointer;
`;
