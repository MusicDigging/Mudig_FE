import React from 'react';
import styled from 'styled-components';
import type { DroppableProvidedProps } from 'react-beautiful-dnd';

interface Props {
  children: React.ReactNode;
  innerRef?: (element: HTMLElement | null) => void;
  droppableProps?: DroppableProvidedProps;
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
