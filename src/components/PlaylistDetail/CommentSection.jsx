import React, { useState } from 'react';
import styled from 'styled-components';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';
export default function CommentSection(props) {
  const [more, setMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const comments = props.comments.filter((comment) => comment.parent === null);
  const replies = props.comments.filter((comment) => comment.parent !== null);
  const repliesGroup = {};
  replies.forEach((data) => {
    const parent = data.parent;
    if (repliesGroup[parent]) {
      repliesGroup[parent].push(data);
    } else {
      repliesGroup[parent] = [data];
    }
  });

  function handleToggleBtnClick() {
    return isReplyOpen === true ? setIsReplyOpen(false) : setIsReplyOpen(true);
  }
  console.log(more);
  const handleMore = () => {
    if (!more) {
      if (visibleCount < comments.length) setVisibleCount(visibleCount + 5);
      if (visibleCount + 5 >= comments.length) {
        setVisibleCount(comments.length);
        setMore(!more);
      }
    } else {
      setVisibleCount(2);
      setMore(!more);
    }
  };

  return (
    <CommentSectionWrap>
      <h2>
        댓글 <span>13</span>
      </h2>
      <CommentForm />
      {comments.map((comment, index) => (
        <li key={comment.id}>
          <CommentItem comment={comment} isVisivle={index + 1 <= visibleCount}>
            {repliesGroup[comment.id] && (
              <>
                <button onClick={handleToggleBtnClick}>
                  답글 {repliesGroup[comment.id].length}
                </button>
                {isReplyOpen &&
                  repliesGroup[comment.id].map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))}
              </>
            )}
          </CommentItem>
        </li>
      ))}

      <ExtendBtn onClick={handleMore} more={more}>
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
