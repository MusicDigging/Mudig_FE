import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import LoadingMudig from '../../img/loading-mudig.svg';
import LoadingCircle from '../../img/loading-circle.svg';

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const loadingBox1Ref = useRef(null);
  const loadingBox2Ref = useRef(null);
  const loadingBox3Ref = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoading) {
        const loadingBox1 = loadingBox1Ref.current;
        const loadingBox2 = loadingBox2Ref.current;
        const loadingBox3 = loadingBox3Ref.current;

        if (
          loadingBox1.style.backgroundImage ===
          'url("/static/media/loading-mudig.fe5a0a57d0b64d15b7c4e57618910c24.svg")'
        ) {
          loadingBox1.style.backgroundImage = `url(${LoadingCircle})`;
          loadingBox1.style.width = '10px';
          loadingBox1.style.height = '10px';
          loadingBox2.style.backgroundImage = `url(${LoadingMudig})`;
          loadingBox2.style.width = '45px';
          loadingBox2.style.height = '42px';
          loadingBox3.style.backgroundImage = `url(${LoadingCircle})`;
          loadingBox3.style.width = '10px';
          loadingBox3.style.height = '10px';
        } else if (
          loadingBox2.style.backgroundImage ===
          'url("/static/media/loading-mudig.fe5a0a57d0b64d15b7c4e57618910c24.svg")'
        ) {
          loadingBox1.style.backgroundImage = `url(${LoadingCircle})`;
          loadingBox1.style.width = '10px';
          loadingBox1.style.height = '10px';
          loadingBox2.style.backgroundImage = `url(${LoadingCircle})`;
          loadingBox2.style.width = '10px';
          loadingBox2.style.height = '10px';
          loadingBox3.style.backgroundImage = `url(${LoadingMudig})`;
          loadingBox3.style.width = '45px';
          loadingBox3.style.height = '42px';
        } else if (
          loadingBox3.style.backgroundImage ===
          'url("/static/media/loading-mudig.fe5a0a57d0b64d15b7c4e57618910c24.svg")'
        ) {
          loadingBox1.style.backgroundImage = `url(${LoadingMudig})`;
          loadingBox1.style.width = '45px';
          loadingBox1.style.height = '42px';
          loadingBox2.style.backgroundImage = `url(${LoadingCircle})`;
          loadingBox2.style.width = '10px';
          loadingBox2.style.height = '10px';
          loadingBox3.style.backgroundImage = `url(${LoadingCircle})`;
          loadingBox3.style.width = '10px';
          loadingBox3.style.height = '10px';
        } else if (loadingBox1.style.backgroundImage === '') {
          loadingBox1.style.backgroundImage = `url(${LoadingCircle})`;
          loadingBox1.style.width = '10px';
          loadingBox1.style.height = '10px';
          loadingBox2.style.backgroundImage = `url(${LoadingMudig})`;
          loadingBox2.style.width = '45px';
          loadingBox2.style.height = '42px';
          loadingBox3.style.backgroundImage = `url(${LoadingCircle})`;
          loadingBox3.style.width = '10px';
          loadingBox3.style.height = '10px';
        } else {
          console.log('나..?');
          clearInterval(interval);
        }
      }
    }, 700);

    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  // 7초 뒤에 isLoading이 false가 되어 로딩 컴포넌트가 사라지도록 임의로 설정
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <LoadingWrap>
          <LoadingBox1 ref={loadingBox1Ref} />
          <LoadingBox2 ref={loadingBox2Ref} />
          <LoadingBox3 ref={loadingBox3Ref} />
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
  gap: 17px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  div {
    width: 10px;
    height: 10px;
    background-image: url(${LoadingCircle});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    &:first-child {
      width: 45px;
      height: 42px;
      background-image: url(${LoadingMudig});
    }
  }
`;

const LoadingBox1 = styled.div``;
const LoadingBox2 = styled.div``;
const LoadingBox3 = styled.div``;
