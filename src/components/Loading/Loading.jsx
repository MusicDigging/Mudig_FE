import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import LoadingMudig from '../../img/loading-mudig.svg';
import LoadingCircle from '../../img/loading-circle.svg';

export default function Loading(props) {
  const { isLoading } = props;
  const [active, setActive] = useState('LoadingBox1');

  useEffect(() => {
    let timeout;
    if (isLoading) {
      if (active === '' || active === 'LoadingBox3')
        timeout = setTimeout(() => setActive('LoadingBox1'), 700);
      else if (active === 'LoadingBox1')
        timeout = setTimeout(() => setActive('LoadingBox2'), 700);
      else if (active === 'LoadingBox2')
        timeout = setTimeout(() => setActive('LoadingBox3'), 700);
    } else {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout); // 컴포넌트가 unmount될 때 타이머를 깨끗이 정리
  }, [isLoading, active]);

  return (
    <>
      {isLoading && (
        <LoadingWrap>
          <LoadingBox className={active === 'LoadingBox1' ? 'active' : ''} />
          <LoadingBox className={active === 'LoadingBox2' ? 'active' : ''} />
          <LoadingBox className={active === 'LoadingBox3' ? 'active' : ''} />
        </LoadingWrap>
      )}
    </>
  );
}

const LoadingWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;

  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;

const LoadingBox = styled.div`
  width: 45px;
  height: 42px;
  background-image: url(${LoadingCircle});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 10px 10px;

  &.active {
    width: 45px;
    height: 42px;
    background-image: url(${LoadingMudig});
    background-size: 45px 42px;
  }
`;
