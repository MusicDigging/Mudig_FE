import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
export default function CommentSection() {
  return (
    <CommentSectionWrap>
      <h2>
        댓글 <span>13</span>
      </h2>
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </CommentSectionWrap>
  );
}

const CommentSectionWrap = styled.section`
  h2 {
    padding: 10px 0;
    font-weight: var(--font-semi-bold);
    font-size: var(--font-lg);
    span {
      color: var(--main-color);
    }
  }
`;
