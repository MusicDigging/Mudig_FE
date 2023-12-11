import React from 'react';
import styled from 'styled-components';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';
export default function CommentSection() {
  // const handleMore = () => {
  //   if (!more) {
  //     if (visibleCount < music.length) setVisibleCount(visibleCount + 10);
  //     if (visibleCount + 10 >= music.length) {
  //       setVisibleCount(music.length);
  //       setMore(!more);
  //     }
  //   } else {
  //     setVisibleCount(2);
  //     setMore(!more);
  //   }
  // };

  return (
    <CommentSectionWrap>
      <h2>
        댓글 <span>13</span>
      </h2>
      <CommentForm />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <ExtendBtn>
        <ArrowIcon fill='black' />
      </ExtendBtn>
    </CommentSectionWrap>
  );
}

const CommentSectionWrap = styled.section`
  display: flex;
  flex-direction: column;
  border-top: 6px solid var(--input-background-color);
  padding: 16px;
  h2 {
    padding: 10px 0 16px;
    font-weight: var(--font-semi-bold);
    font-size: var(--font-lg);
    span {
      color: var(--main-color);
    }
  }
`;
const ExtendBtn = styled.button`
  svg {
    transform: rotate(${({ more }) => (more ? '270deg' : '90deg')});
  }
`;
