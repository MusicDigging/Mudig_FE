import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import CommentList from './CommentList';
import { backAnimationAtom } from '../../library/atom';
import { filterComments, filterReplies } from '../../library/CommentUtils';

import { ReactComponent as PenIcon } from '../../img/pen-icon.svg';
import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';

export default function CommentSection(props) {
  const { comments, playlistId, playlistWriter } = props;
  const navigate = useNavigate();
  const [more, setMore] = useState(false);
  const [backAnimation, setBackAnimation] = useRecoilState(backAnimationAtom);
  const [visibleCount, setVisibleCount] = useState(2);

  const replies = filterReplies(comments);
  const filteredComments =
    comments.length > 1 ? filterComments(comments, replies) : comments;

  const handleMore = () => {
    if (!more) {
      if (visibleCount < filteredComments.length)
        setVisibleCount(visibleCount + 5);
      if (visibleCount + 5 >= filteredComments.length) {
        setVisibleCount(filteredComments.length);
        setMore(!more);
      }
    } else {
      setVisibleCount(2);
      setMore(!more);
    }
  };

  const handleMoveBtn = () => {
    setBackAnimation(false);
    navigate(`/playlist/detail/${playlistId}/comment`, {
      state: {
        mode: 'comment',
        comments: filteredComments,
        replies,
        playlistId,
        playlistWriter,
      },
    });
  };

  return (
    <CommentSectionWrap>
      <CommentTop>
        <h2>
          댓글 <span>{filteredComments.length}</span>
        </h2>
        <button onClick={handleMoveBtn}>
          <PenIcon />
          댓글 쓰기
        </button>
      </CommentTop>
      <CommentList
        comments={filteredComments}
        replies={replies}
        playlistId={playlistId}
        playlistWriter={playlistWriter}
        visibleCount={visibleCount}
      />
      {filteredComments.length > 2 && (
        <ExtendBtn onClick={handleMore} more={more}>
          <ArrowIcon fill='black' />
        </ExtendBtn>
      )}
    </CommentSectionWrap>
  );
}

const CommentSectionWrap = styled.section`
  flex: 1 0 auto;

  padding: 16px;
  display: flex;
  flex-direction: column;
  border-top: 6px solid var(--input-background-color);
  background-color: #fff;
  ul {
    margin-top: 16px;
  }
  li:not(li:last-child) {
    border-bottom: 1px solid #f6f6f6;
  }
`;

const CommentTop = styled.div`
  justify-content: space-between;
  &,
  button {
    display: flex;
    align-items: center;
  }
  h2 {
    font-weight: var(--font-semi-bold);
    font-size: var(--font-lg);
    span {
      color: var(--main-color);
    }
  }
  button {
    font-size: var(--font-md);
  }
`;

const ExtendBtn = styled.button`
  svg {
    transform: rotate(${({ more }) => (more ? '270deg' : '90deg')});
  }
`;
