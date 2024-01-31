import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../../../img/arrow-icon.svg';
type Props = {};

export default function TopButton({}: Props) {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    console.log('clicked!');
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    console.log(window.scrollY);
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    <TopButtonWrap>
      {showButton && (
        <button onClick={scrollToTop} type='button' aria-label='맨위로가기'>
          <ArrowIcon fill='black' />
        </button>
      )}
    </TopButtonWrap>
  );
}
const TopButtonWrap = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 100;
  button {
    width: 38px;
    height: 38px;
    background-color: #fff;
    border-radius: 50%;
    transform: translate(-21px, -105px);
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  }
  svg {
    transform: rotate(-90deg);
  }
`;
