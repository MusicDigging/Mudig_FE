import React, { useState } from 'react';
import styled from 'styled-components';

import {
  useWriteComment,
  useWriteReply,
  useEditComment,
} from '../../hooks/queries/useComment';
import { Button } from '../../components/common/Button/Button';

import CloseIcon from '../../img/close-icon.svg';

export default function CommentForm(props) {
  const { mutate: writeReply } = useWriteReply();
  const { mutate: editComment } = useEditComment();
  const { mutate: writeComment } = useWriteComment();
  const {
    content,
    setContent,
    playlistId,
    parentId,
    setParentId,
    editId,
    setEditId,
  } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    let data;

    if (editId) {
      // 댓글, 답글 수정
      data = { content, comment_id: editId };
      editComment(data);
      setEditId(null);
    } else {
      if (parentId) {
        // 답글
        data = { content, playlist_id: playlistId, parent_id: parentId };
        writeReply(data);
        setParentId(null);
      } else {
        // 댓글
        data = { content, playlist_id: playlistId };
        writeComment(data);
      }
    }
    setContent('');
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleCloseBtnClick = () => {
    setEditId(null);
    setParentId(null);
  };

  return (
    <CommentFormWrap onSubmit={onSubmit}>
      <label htmlFor='comment' className='a11y-hidden'>
        댓글 입력하기
      </label>
      <InputStyle
        value={content}
        onChange={handleInputChange}
        type='text'
        id='comment'
        placeholder={`${parentId ? '답글' : '댓글'}을 입력해 주세요.`}
      ></InputStyle>
      {(parentId || editId) && (
        <button onClick={handleCloseBtnClick}>
          <img src={CloseIcon} alt='답글 닫기' />
        </button>
      )}
      <Button text='확인' type='submit' disabled={content.trim() === ''} />
    </CommentFormWrap>
  );
}

const CommentFormWrap = styled.form`
  background-color: white;
  margin-bottom: 8px;
  display: flex;
  width: 100%;
  gap: 8px;

  bottom: 0px;

  button {
    max-width: 56px;
  }
`;

const InputStyle = styled.input`
  width: 100%;
  padding: 14px 18px;
  border-radius: 8px;
  font-size: var(--font-md);
  background-color: var(--input-background-color);
`;
