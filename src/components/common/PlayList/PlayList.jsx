import React from 'react';
import styled from 'styled-components';

import PlayListItem from './PlayListItem';

export default function PlayList(props) {
  const { children } = props;
  return <PlayListWrap>{children}</PlayListWrap>;
}

const PlayListWrap = styled.ul``;
