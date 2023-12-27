import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  useWriteComment,
  useWriteReply,
  useEditComment,
} from '../../hooks/queries/useComment';
import { commentEditInfoAtom } from '../../library/atom';

import { Button } from '../../components/common/Button/Button';

export default function CommentForm(props) {
  const { playlistId, parentId } = props;
  const { mutate: writeReply } = useWriteReply();
  const { mutate: editComment } = useEditComment();
  const { mutate: writeComment } = useWriteComment();
  const [editInfo, setEditInfo] = useRecoilState(commentEditInfoAtom);
  const [content, setContent] = useState(
    editInfo?.editContent ? editInfo?.editContent : '',
  );

  const onSubmit = (e) => {
    e.preventDefault();
    let data;

    if (editInfo?.editId) {
      // 댓글, 답글 수정
      data = { content, comment_id: editInfo?.editId };
      editComment(data);
      setEditInfo(null);
      setContent('');
      e.target.defaultValue = '';
    } else {
      if (parentId) {
        // 답글
        data = { content, playlist_id: playlistId, parent_id: parentId };
        writeReply(data);
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

  return (
    <CommentFormWrap onSubmit={onSubmit}>
      <label htmlFor='comment' className='a11y-hidden'>
        댓글 입력하기
      </label>
      <InputStyle
        defaultValue={editInfo?.editContent ? editInfo?.editContent : ''}
        onChange={handleInputChange}
        type='text'
        id='comment'
        placeholder={`${parentId ? '답글' : '댓글'}을 입력해 주세요.`}
      ></InputStyle>
      <Button text='확인' type='submit' />
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

  button {
    border: none;
    background-color: #e5dcff;
    color: var(--main-color);
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
