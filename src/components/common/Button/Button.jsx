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
      }}
      disabled={disabled}
    >
      {text}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button`
  width: 328px;
  border-radius: 8px;
  height: 44px;
  cursor: pointer;
  &:not(:disabled) {
    cursor: pointer;
    opacity: 1;
  }
  &:disabled {
    cursor: initial;
    opacity: 0.5;
  }
`;

export function miniButton() {
  return <MiniButtonStlye></MiniButtonStlye>;
}

const MiniButtonStlye = styled.button`
  width: 103px;
  height: 120px;
  font-size: 14px;
  border: 1px solid #9747ff;
  border-radius: 16px;
  background-color: #f6f6f6;

  padding: 8px, 16px, 8px, 16px;
  cursor: pointer;
`;
