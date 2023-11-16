export function Button(props) {
  const {
    type,
    text,
    onClick,
    bgColor,
    btnwidth,
    btnpadding,
    btnradius,
    textColor,
  } = props;

  // const btnStyleChange = {
  //   width: btnwidth || ' 328px',
  //   borderRadius: btnradius || '8px',
  //   padding: btnpadding || '13px',
  // };

  return (
    <ButtonStyle
      type={type ? type : 'button'}
      onClick={onClick}
      bgColor={bgColor}
      textColor={textColor}
    >
      {text}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button`
  width: 328px;
  border-radius: 8px;
  color: ${(props) => props.textColor || 'white'};
  height: 44px;

  border: 1px solid lightgray;
  cursor: pointer;

  background-color: ${(props) => props.bgColor || 'transparent'};
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
