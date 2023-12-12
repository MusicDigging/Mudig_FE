import React, { useState } from 'react';
import styled from 'styled-components';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';
export default function CommentSection(props) {
  const { playlistId } = props;
  const [more, setMore] = useState(false);
  const [parentId, setParentId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(2);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  console.log(props.comments);
  const comments = props.comments
    .filter((comment) => comment.parent === null)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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

  function handleReplyBtnClick() {
    return isReplyOpen === true ? setIsReplyOpen(false) : setIsReplyOpen(true);
  }

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
        댓글 <span>{comments.length}</span>
      </h2>
      <CommentForm
        playlistId={playlistId}
        parentId={parentId}
        setParentId={setParentId}
      />
      {comments.map((comment, index) => (
        <li key={comment.id}>
          <CommentItem
            comment={comment}
            isVisible={index + 1 <= visibleCount}
            setParentId={setParentId}
          >
            {repliesGroup[comment.id] && (
              <>
                <ReplyBtn onClick={handleReplyBtnClick}>
                  답글 {repliesGroup[comment.id].length}
                </ReplyBtn>
                {isReplyOpen &&
                  repliesGroup[comment.id].map((comment) => (
                    <CommentItem
                      key={comment.id}
                      parentId={comment.id}
                      comment={comment}
                      setParentId={parentId}
                    />
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
const ReplyBtn = styled.button`
  font-size: var(--font-sm);
  color: var(--sub-font-color);
`;
