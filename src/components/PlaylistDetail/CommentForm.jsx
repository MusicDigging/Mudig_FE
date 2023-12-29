import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  useWriteComment,
  useWriteReply,
  useEditComment,
} from '../../hooks/queries/useComment';
import { commentAtom, commentEditIdAtom, toastAtom } from '../../library/atom';

import { Button } from '../../components/common/Button/Button';

import CloseIcon from '../../img/close-icon.svg';

export default function CommentForm(props) {
  const { playlistId, parentId } = props;
  const { mutate: writeReply } = useWriteReply();
  const { mutate: editComment } = useEditComment();
  const { mutate: writeComment } = useWriteComment();
  const [toast, setToast] = useRecoilState(toastAtom);
  const [content, setContent] = useRecoilState(commentAtom);
  const [editId, setEditId] = useRecoilState(commentEditIdAtom);

  const onSubmit = (e) => {
    e.preventDefault();
    let data;

    if (editId) {
      // 댓글, 답글 수정
      data = { content, comment_id: editId };
      editComment(data);
      setEditId(null);
      if (parentId) {
        setToast({ content: '답글이 수정되었습니다. 💬', type: 'success' });
      } else
        setToast({ content: '댓글이 수정되었습니다. 💬', type: 'success' });
    } else {
      if (parentId) {
        // 답글
        data = { content, playlist_id: playlistId, parent_id: parentId };
        writeReply(data);
        setToast({ content: '답글이 등록되었습니다. 💬', type: 'success' });
      } else {
        // 댓글
        data = { content, playlist_id: playlistId };
        writeComment(data);
        setToast({ content: '댓글이 등록되었습니다. 💬', type: 'success' });
      }
    }
    setContent('');
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleCloseBtnClick = () => {
    setEditId(null);
    setContent('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(e);
    }
  };
  return (
    <CommentFormWrap onSubmit={onSubmit}>
      <label htmlFor='comment' className='a11y-hidden'>
        댓글 입력하기
      </label>
      <InputStyle
        value={content}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        type='text'
        id='comment'
        maxLength={50}
        placeholder={`${parentId ? '답글' : '댓글'}을 입력해 주세요.`}
      ></InputStyle>
      {editId && (
        <button onClick={handleCloseBtnClick}>
          <img src={CloseIcon} alt='답글 닫기' />
        </button>
      )}
      <Button
        text='등록'
        type='submit'
        disabled={content.trim() === ''}
        btnHeight='38px'
      />
    </CommentFormWrap>
  );
}

const CommentFormWrap = styled.form`
  padding: 16px 16px 24px;

  position: absolute;
  bottom: 0px;
  width: 100%;
  display: flex;
  gap: 8px;
  background-color: white;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.05);

  button:last-child {
    border: none;
    background-color: #e5dcff;
    color: var(--main-color);
    max-width: 56px;
  }
  button:last-child:disabled {
    background-color: #ededed;
    color: var(--sub-font-color);
  }
`;

const InputStyle = styled.input`
  width: 100%;
  height: 38px;
  padding: 9px 18px;
  border-radius: 8px;
  font-size: var(--font-md);
  background-color: var(--input-background-color);
`;
