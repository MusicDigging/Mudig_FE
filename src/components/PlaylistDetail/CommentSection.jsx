import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';
import { ReactComponent as CommentIcon } from '../../img/comment-icon.svg';
import { ReactComponent as PenIcon } from '../../img/pen-icon.svg';

export default function CommentSection(props) {
  const { playlistId, playlistWriter } = props;
  const [more, setMore] = useState(false);
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null); // 수정 진행 중인 comment id
  const [parentId, setParentId] = useState(null); // 대상 부모 댓글 comment id
  const [modalId, setModalId] = useState(null); // 모달창 활성화된 comment id
  const [visibleCount, setVisibleCount] = useState(2);
  const [opendReply, setOpendReply] = useState({});

  const filterAndSortComments = (comments) =>
    comments
      .filter(
        ({ parent, is_active, id }) =>
          !parent && (is_active || repliesGroup[id]),
      )
      .sort(
        ({ created_at: a }, { created_at: b }) => new Date(b) - new Date(a),
      );

  const groupReplies = (comments) =>
    comments.reduce((repliesGroup, data) => {
      const { parent } = data;
      repliesGroup[parent] = [...(repliesGroup[parent] || []), data];
      return repliesGroup;
    }, {});

  const replies = props.comments.filter(
    ({ parent, is_active }) => parent !== null && is_active,
  );
  const repliesGroup = groupReplies(replies);
  const comments = filterAndSortComments(props.comments);

  const handleReplyBtnClick = (id) => {
    setOpendReply((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
      <CommentTop>
        <h2>
          댓글 <span>{comments.length}</span>
        </h2>
        <Link to='/'>
          <PenIcon />
          댓글 쓰기
        </Link>
      </CommentTop>
      {/* <CommentForm
        content={content}
        setContent={setContent}
        playlistId={playlistId}
        parentId={parentId}
        setParentId={setParentId}
        editId={editId}
        setEditId={setEditId}
      /> */}
      {comments.length === 0 && (
        <EmptyComment>
          <p>아직 댓글이 없어요.</p>
          <span>대화를 시작해보세요!</span>
        </EmptyComment>
      )}
      {comments.length !== 0 && (
        <ul>
          {comments.map((comment, index) => {
            if (comment.is_active || repliesGroup[comment.id]) {
              return (
                <li key={comment.id}>
                  <CommentItem
                    comment={comment}
                    isVisible={index + 1 <= visibleCount}
                    parentId={parentId}
                    setParentId={setParentId}
                    setContent={setContent}
                    editId={editId}
                    setEditId={setEditId}
                    modalId={modalId}
                    setModalId={setModalId}
                    playlistWriter={playlistWriter}
                  >
                    {repliesGroup[comment.id] && (
                      <>
                        <div>
                          <ReplyBtn
                            onClick={() => handleReplyBtnClick(comment.id)}
                          >
                            <CommentIcon alt='답글' />
                            {repliesGroup[comment.id].length}
                          </ReplyBtn>
                        </div>
                        {opendReply[comment.id] &&
                          repliesGroup[comment.id].map((replyComment) => (
                            <CommentItem
                              key={replyComment.id}
                              writer={replyComment.writer}
                              comment={replyComment}
                              parentId={comment.id}
                              setParentId={setParentId}
                              setContent={setContent}
                              editId={editId}
                              setEditId={setEditId}
                              modalId={modalId}
                              setModalId={setModalId}
                              isActive={replyComment.is_active}
                              parentWriter={comment.writer}
                              playlistWriter={playlistWriter}
                            />
                          ))}
                      </>
                    )}
                  </CommentItem>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      )}
      {comments.length > 2 && (
        <ExtendBtn onClick={handleMore} more={more}>
          <ArrowIcon fill='black' />
        </ExtendBtn>
      )}
    </CommentSectionWrap>
  );
}

const CommentSectionWrap = styled.section`
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-top: 6px solid var(--input-background-color);
  background-color: #fff;

  li {
    border-bottom: 1px solid #f6f6f6;
  }
`;

const CommentTop = styled.div`
  justify-content: space-between;
  &,
  a {
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
  a {
    font-size: var(--font-md);
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

const ExtendBtn = styled.button`
  svg {
    transform: rotate(${({ more }) => (more ? '270deg' : '90deg')});
  }
`;

const ReplyBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: var(--font-sm);
  color: var(--sub-font-color);
`;
