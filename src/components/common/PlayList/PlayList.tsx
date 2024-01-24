import React from 'react';
import styled from 'styled-components';

import PlayListItem from './PlayListItem';

interface Props {
  children: React.ReactNode;
  innerRef?: any;
  droppableProps?: any;
}

export default function PlayList(props: Props) {
  const { children, innerRef, droppableProps } = props;
  return (
    <PlayListWrap ref={innerRef} {...droppableProps}>
      {children}
    </PlayListWrap>
  );
}

const PlayListWrap = styled.ul`
  width: 100%;
`;
