import styled from 'styled-components';

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
  background-color: ${(props) =>
    props.btnBgColor || 'var(--btn-background-color)'};
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

export function MiniButton() {
  return <MiniButtonStyle></MiniButtonStyle>;
}

const MiniButtonStyle = styled.button`
  width: 103px;
  height: 120px;
  font-size: 14px;
  border: 1px solid #9747ff;
  border-radius: 16px;
  background-color: #f6f6f6;
  padding: 8px 16px;
  cursor: pointer;
`;
