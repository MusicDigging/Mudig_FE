import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import CommentItem from './CommentItem';

import { ReactComponent as CommentIcon } from '../../img/comment-icon.svg';

export default function CommentList(props) {
  const { comments, replies, playlistId, playlistWriter, visibleCount } = props;
  const [modalId, setModalId] = useState(null); // 모달창 활성화된 comment id

  const [opendReply, setOpendReply] = useState({});

  const handleReplyBtnClick = (id) => {
    setOpendReply((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <CommentListWrap>
      {comments.length === 0 ? (
        <EmptyComment>
          <p>아직 댓글이 없어요.</p>
          <span>대화를 시작해보세요!</span>
        </EmptyComment>
      ) : (
        <ul>
          {/* visibleCount만큼 리턴, visibleCount값이 없을 땐 전체 리턴 */}
          {comments
            .slice(0, visibleCount + 1 || comments.length)
            .map((comment, index) =>
              comment.is_active || replies[comment.id] ? (
                <li key={comment.id}>
                  <CommentItem
                    playlistId={playlistId}
                    comment={comment}
                    replies={replies[comment.id]}
                    modalId={modalId}
                    setModalId={setModalId}
                    playlistWriter={playlistWriter}
                  >
                    {replies[comment.id] && (
                      <>
                        <div>
                          <ReplyBtn
                            onClick={() => handleReplyBtnClick(comment.id)}
                          >
                            <CommentIcon alt='답글' />
                            {replies[comment.id].length}
                          </ReplyBtn>
                        </div>
                        {opendReply[comment.id] &&
                          replies[comment.id].map((reply) => (
                            <CommentItem
                              key={reply.id}
                              writer={reply.writer}
                              comment={reply}
                              modalId={modalId}
                              setModalId={setModalId}
                              isActive={reply.is_active}
                              parentId={comment.id}
                              parentWriter={comment.writer}
                              playlistWriter={playlistWriter}
                            />
                          ))}
                      </>
                    )}
                  </CommentItem>
                </li>
              ) : null,
            )}
        </ul>
      )}
    </CommentListWrap>
  );
}

const CommentListWrap = styled.div`
  li {
    border-bottom: 1px solid #f6f6f6;
  }
`;

const EmptyComment = styled.div`
  height: 100%;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  p {
    font-size: var(--font-md);
    font-weight: var(--font-semi-bold);
  }
  span {
    font-size: var(--font-sm);
  }
`;

const ReplyBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: var(--font-sm);
  color: var(--sub-font-color);
`;
