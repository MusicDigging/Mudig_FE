import React from 'react';
import styled from 'styled-components';

import PlayListItem from './PlayListItem';

export default function PlayList(props) {
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
