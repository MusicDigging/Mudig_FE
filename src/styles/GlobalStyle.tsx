import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { fonts } from './fonts';

const GlobalStyle = createGlobalStyle`

 // ROOT
     :root{
   --main-color:#724FFF;
   --font-color:#191919; 
   --sub-font-color:#767676;
   --extra-font-color: #909090;
   --tertiary-font-color: #575757;
   --border-color:#DBDBDB;
   --modal-border-color: #EDEDED;
   --input-background-color:#F1F1F5;
   --btn-border-color:#724FFF;
   --btn-background-color:#724FFF;
   --btn-point-color: #7D4FFF;
   --playlist-info-bg-color: #8969FF;
   --playlist-info-sub-color: #DBDBDB;
   --error-color: #FF003E;
   --font-xl : 22px;
   --font-l: 18px;
   --font-lg: 16px;
   --font-md: 14px; 
   --font-sm : 12px;
   letter-spacing: -0.02em;
     }

     :root {
       --font-bold: 700;
       --font-regular: 400;
       --font-semi-bold: 500;
  }
    
 // Reset
	${reset}
  ${fonts} // font

  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
  
  *,*::before, *::after{
		box-sizing: border-box;
    font-family: 'Noto Sans KR'; 

	}

  main{
     height: 100%;
     padding-bottom: 88px;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display:none;
      } 
  }// 메인 화면 overflow scroll 처리



  html, body, div, span, h1, h2, h3, h4, h5, h6, p, strong,
	a, dl, dt, dd, ol, ul, li, form, label, table, input, button, textarea {
    font-family: 'Noto Sans KR', sans-serif; 
		margin: 0;
		padding: 0;
    }

    button {
    cursor: pointer;
    color: inherit;
    border:none;
    background-color: transparent;
    }
    
  a{
    
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }
    
    input,textarea{
         -ms-user-select: auto;
         -webkit-appearance: none;
         -moz-appearance: none;
         user-select: auto;
    }

    input,textarea{
         appearance: none;
         box-shadow: none;
         border: none;
         border-radius: 0;
         padding: 0;
        box-sizing: border-box;
        &:focus {
		outline: none;
            }
}

    ol, ul, li{
            list-style: none;
        }
     
    `;

export default GlobalStyle;
