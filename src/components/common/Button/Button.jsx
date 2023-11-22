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
    btnHeigth,
    imgSrc,
  } = props;

  return (
    <ButtonStyle
      type={type ? type : 'button'}
      onClick={onClick}
      style={{
        background: imgSrc ? `url(${imgSrc}) no-repeat 16px 50%` : 'none',
        backgroundColor: btnBgColor || 'var(--btn-background-color)',
        border: btnBorder || '1px solid var(--btn-border-color)',
        margin: btnMargin || '0px',

        color: btnColor || 'white',
        width: btnWidth || '328px',
        height: btnHeigth || '44px',
      }}
      disabled={disabled}
    >
      {text}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button`
  width: ${(props) => props.width || '328px'};
  height: ${(props) => props.height || '44px'};
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};

  &:not(:disabled) {
    cursor: pointer;
    opacity: 1;
  }
`;

// 예시로 miniButton에도 props를 사용하는 코드를 추가하였습니다.
export function MiniButton(props) {
  return <MiniButtonStyle {...props}></MiniButtonStyle>;
}

const MiniButtonStyle = styled.button`
  width: ${(props) => props.width || '103px'};
  height: ${(props) => props.height || '120px'};
  font-size: 14px;
  border: 1px solid #9747ff;
  border-radius: 16px;
  background-color: #f6f6f6;

  padding: ${(props) => props.padding || '8px 16px'};
  cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;
