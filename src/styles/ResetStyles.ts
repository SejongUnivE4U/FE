import { createGlobalStyle } from 'styled-components';

export const ResetStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  text-decoration: none;
  color: inherit;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* input 기본 스타일 초기화 */
input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  border: none;
}

input:focus {
  outline: none;
}

/* IE10 이상에서 input box 에 추가된 지우기 버튼 제거 */
input::-ms-clear {
  display: none;
}

/* input type number 에서 화살표 제거 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

/* Select box 스타일 초기화 */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* IE 에서 Select box 화살표 제거 */
select::-ms-expand {
  display: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* IE에서 비밀번호 보이기/숨기기 눈 없애기 */

input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}

/* 버튼 초기화 */
button {
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
`;
