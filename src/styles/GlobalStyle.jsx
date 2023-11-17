import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`

 // ROOT
     :root{
   --font-color:#191919; 
   --sub-font--color:#767676;
   --border-color:#DBDBDB;   
   --btn-border-color:#724FFF;
   --btn-background-color:#724FFF;
   --error-color: #FF003E;
   --font-xl : 22px;
   --font-lg: 16px;
   --font-md: 14px; 
   --font-sm : 12px;
   letter-spacing: -0.02em;
     }

     :root {
    --font-bold: 700;
    --font-regular: 400;;
  }
    
 // Reset
	${reset}
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
	}

  html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
	a, dl, dt, dd, ol, ul, li, form, label, table, input,button {
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

    ol, ul{
            list-style: none;
        }
     
    `;

export default GlobalStyle;
