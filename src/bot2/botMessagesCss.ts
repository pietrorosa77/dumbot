import { IBotTheme } from "./definitions";

export const getBotCss = (theme: IBotTheme) => `


* {
  font-family: ${theme.global?.font?.family || "unset"};
    font-size: ${theme.global?.font?.size || "unset"};
    color: inherit;
}

h1 {
  font-size: 2.5em;
}

h2 {
  font-size: 2em;
}

h3 {
  font-size: 1.8em;
}

h3 {
  font-size: 1.5em;
}

a {
  opacity: 0.8;
  &:hover {
    opacity:1;
  }
}

.math-display {
  background-color: ${theme.global?.colors?.specialTagsBackground};
  padding: 1em;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: ${theme.global?.colors?.specialTagsBackground};
  th {
    font-weight: bold;
    font-size:1.2em;
  }
}

table, th, td {
  border: 1px solid;
  padding:0.5em;
}

blockquote {
  background: ${theme.global?.colors?.specialTagsBackground};
  border-left: 10px solid;
  margin: 1.5em 10px;
  padding: 0.5em 10px;
  quotes: '\\201C''\\201D''\\2018''\\2019';
}
blockquote:before {
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0em;
  vertical-align: -0.4em;
}
blockquote p {
  display: inline;
}

img,
video {
  max-width: 100%;
  height: auto;
}


code[class*="language-"],
pre[class*="language-"] {
  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  white-space: pre;
  white-space: pre-wrap;
  word-wrap: normal;
  font-family: Menlo, Monaco, "Courier New", monospace;
  font-size: 14px;
  color: #76d9e6;
  text-shadow: none;
}

pre > code[class*="language-"] {
  font-size: 1em;
}

pre[class*="language-"],
:not(pre) > code[class*="language-"] {
  background: ${theme.global?.colors?.specialTagsBackground};
}

pre[class*="language-"] {
  padding: 15px;
  overflow: auto;
  position: relative;
}

pre[class*="language-"] code {
  white-space: pre;
  display: block;
}

:not(pre) > code[class*="language-"] {
  padding: 0.15em 0.2em 0.05em;
  border-radius: 0.3em;
  border: 0.13em solid #7a6652;
  box-shadow: 1px 1px 0.3em -0.1em #000 inset;
}

.token.namespace {
  opacity: 0.7;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #6f705e;
}

.token.operator,
.token.boolean,
.token.number {
  color: #a77afe;
}

.token.attr-name,
.token.string {
  color: #e6d06c;
}

.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #e6d06c;
}

.token.selector,
.token.inserted {
  color: #a6e22d;
}

.token.atrule,
.token.attr-value,
.token.keyword,
.token.important,
.token.deleted {
  color: #ef3b7d;
}

.token.regex,
.token.statement {
  color: #76d9e6;
}

.token.placeholder,
.token.variable {
  color: #fff;
}

.token.important,
.token.statement,
.token.bold {
  font-weight: bold;
}

.token.punctuation {
  color: #bebec5;
}

.token.entity {
  cursor: help;
}

.token.italic {
  font-style: italic;
}

code.language-markup {
  color: #f9f9f9;
}

code.language-markup .token.tag {
  color: #ef3b7d;
}

code.language-markup .token.attr-name {
  color: #a6e22d;
}

code.language-markup .token.attr-value {
  color: #e6d06c;
}

code.language-markup .token.style,
code.language-markup .token.script {
  color: #76d9e6;
}

code.language-markup .token.script .token.keyword {
  color: #76d9e6;
}

/* Line highlight plugin */
.line-highlight.line-highlight {
  padding: 0;
  background: rgba(255, 255, 255, 0.08);
}

.line-number::before {
  display: inline-block;
  width: 1rem;
  text-align: right;
  margin-right: 16px;
  margin-left: -8px;
  color: rgb(156, 163, 175); /* Line number color */
  content: attr(line);
}

.line-highlight.line-highlight:before,
.line-highlight.line-highlight[data-end]:after {
  padding: 0.2em 0.5em;
  background-color: rgba(255, 255, 255, 0.4);
  color: black;
  height: 1em;
  line-height: 1em;
  box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);
}
.dumbot-content-body {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  color: inherit;
  background-color: inherit;
  word-wrap: break-word;
}

.dumbot-content-body h1,
.dumbot-content-body h2,
.dumbot-content-body h3,
.dumbot-content-body h4,
.dumbot-content-body h5,
.dumbot-content-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  border-bottom: 1px solid ;
}

.dumbot-content-body .octicon {
  display: inline-block;
  fill: currentColor;
  vertical-align: text-bottom;
}

.dumbot-content-body details,
.dumbot-content-body figcaption,
.dumbot-content-body figure {
  display: block;
}

.dumbot-content-body summary {
  display: list-item;
}

.dumbot-content-body [hidden] {
  display: none !important;
}


.dumbot-content-body abbr[title] {
  border-bottom: none;
  text-decoration: underline dotted;
}

.dumbot-content-body b,
.dumbot-content-body strong {
  font-weight: 600;
}

.dumbot-content-body dfn {
  font-style: italic;
}

.dumbot-content-body mark {
  background-color: ${theme.global?.colors?.specialTagsBackground};
}

.dumbot-content-body small {
  font-size: 0.5em;
}

.dumbot-content-body sub,
.dumbot-content-body sup {
  font-size: 0.5em;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

.dumbot-content-body sub {
  bottom: -0.25em;
}

.dumbot-content-body sup {
  top: -0.5em;
}

.dumbot-content-body img {
  border-style: none;
  max-width: 100%;
  box-sizing: content-box;
}

.dumbot-content-body code,
.dumbot-content-body kbd,
.dumbot-content-body pre,
.dumbot-content-body samp {
  font-family: monospace,monospace;
}

.dumbot-content-body figure {
  margin: 1em 40px;
}

.dumbot-content-body input {
  font: inherit;
  margin: 0;
  overflow: visible;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.dumbot-content-body [type=button],
.dumbot-content-body [type=reset],
.dumbot-content-body [type=submit] {
  -webkit-appearance: button;
}

.dumbot-content-body [type=button]::-moz-focus-inner,
.dumbot-content-body [type=reset]::-moz-focus-inner,
.dumbot-content-body [type=submit]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

.dumbot-content-body [type=button]:-moz-focusring,
.dumbot-content-body [type=reset]:-moz-focusring,
.dumbot-content-body [type=submit]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

.dumbot-content-body [type=checkbox],
.dumbot-content-body [type=radio] {
  box-sizing: border-box;
  padding: 0;
}

.dumbot-content-body [type=number]::-webkit-inner-spin-button,
.dumbot-content-body [type=number]::-webkit-outer-spin-button {
  height: auto;
}


.dumbot-content-body a:hover {
  text-decoration: underline;
}

.dumbot-content-body hr::before {
  display: table;
  content: "";
}

.dumbot-content-body hr::after {
  display: table;
  clear: both;
  content: "";
}

.dumbot-content-body table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  overflow: auto;
}

.dumbot-content-body details summary {
  cursor: pointer;
}

.dumbot-content-body details:not([open])>*:not(summary) {
  display: none !important;
}

.dumbot-content-body kbd {
  display: inline-block;
  padding: 3px 5px;
  font: 11px ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
  line-height: 10px;
  vertical-align: middle;
  background-color: ${theme.global?.colors?.specialTagsBackground};
  border: solid 1px;
  border-radius: 6px;
}



.dumbot-content-body ul,
.dumbot-content-body ol {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 2em;
}

.dumbot-content-body ol ol,
.dumbot-content-body ul ol {
  list-style-type: lower-roman;
}

.dumbot-content-body ul ul ol,
.dumbot-content-body ul ol ol,
.dumbot-content-body ol ul ol,
.dumbot-content-body ol ol ol {
  list-style-type: lower-alpha;
}

.dumbot-content-body dd {
  margin-left: 0;
}

.dumbot-content-body tt,
.dumbot-content-body code {
  font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
  font-size: 12px;
}

.dumbot-content-body pre {
  margin-top: 0;
  margin-bottom: 0;
  font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
  word-wrap: normal;
}

.dumbot-content-body .octicon {
  display: inline-block;
  overflow: visible !important;
  vertical-align: text-bottom;
  fill: currentColor;
}

.dumbot-content-body input::-webkit-outer-spin-button,
.dumbot-content-body input::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
}

.dumbot-content-body [data-catalyst] {
  display: block;
}

.dumbot-content-body g-emoji {
  font-family: "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 1em;
  font-style: normal !important;
  font-weight: 400;
  line-height: 1;
  vertical-align: -0.075em;
}

.dumbot-content-body g-emoji img {
  width: 1em;
  height: 1em;
}

.dumbot-content-body::before {
  display: table;
  content: "";
}

.dumbot-content-body::after {
  display: table;
  clear: both;
  content: "";
}

.dumbot-content-body>*:first-child {
  margin-top: 0 !important;
}

.dumbot-content-body>*:last-child {
  margin-bottom: 0 !important;
}

.dumbot-content-body a:not([href]) {
  color: inherit;
  text-decoration: none;
}

.dumbot-content-body .absent {
  color: #f85149;
}

.dumbot-content-body .anchor {
  float: left;
  padding-right: 4px;
  margin-left: -20px;
  line-height: 1;
}

.dumbot-content-body .anchor:focus {
  outline: none;
}

.dumbot-content-body blockquote>:first-child {
  margin-top: 0;
}

.dumbot-content-body blockquote>:last-child {
  margin-bottom: 0;
}

.dumbot-content-body sup>a::before {
  content: "[";
}

.dumbot-content-body sup>a::after {
  content: "]";
}


.dumbot-content-body h1:hover .anchor,
.dumbot-content-body h2:hover .anchor,
.dumbot-content-body h3:hover .anchor,
.dumbot-content-body h4:hover .anchor,
.dumbot-content-body h5:hover .anchor,
.dumbot-content-body h6:hover .anchor {
  text-decoration: none;
}

.dumbot-content-body h1:hover .anchor .octicon-link,
.dumbot-content-body h2:hover .anchor .octicon-link,
.dumbot-content-body h3:hover .anchor .octicon-link,
.dumbot-content-body h4:hover .anchor .octicon-link,
.dumbot-content-body h5:hover .anchor .octicon-link,
.dumbot-content-body h6:hover .anchor .octicon-link {
  visibility: visible;
}

.dumbot-content-body ul.no-list,
.dumbot-content-body ol.no-list {
  padding: 0;
  list-style-type: none;
}

.dumbot-content-body ol[type="1"] {
  list-style-type: decimal;
}

.dumbot-content-body ol[type=a] {
  list-style-type: lower-alpha;
}

.dumbot-content-body ol[type=i] {
  list-style-type: lower-roman;
}

.dumbot-content-body div>ol:not([type]) {
  list-style-type: decimal;
}

.dumbot-content-body ul ul,
.dumbot-content-body ul ol,
.dumbot-content-body ol ol,
.dumbot-content-body ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

.dumbot-content-body li+li {
  margin-top: .25em;
}

.dumbot-content-body dl {
  padding: 0;
}

.dumbot-content-body dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: 600;
}

.dumbot-content-body dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}


.dumbot-content-body table img {
  background-color: transparent;
}

.dumbot-content-body img[align=right] {
  padding-left: 20px;
}

.dumbot-content-body img[align=left] {
  padding-right: 20px;
}

.dumbot-content-body .emoji {
  max-width: none;
  vertical-align: text-top;
  background-color: transparent;
}

.dumbot-content-body span.frame {
  display: block;
  overflow: hidden;
}

.dumbot-content-body span.align-center {
  display: block;
  overflow: hidden;
  clear: both;
}

.dumbot-content-body span.align-center>span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: center;
}

.dumbot-content-body span.align-center span img {
  margin: 0 auto;
  text-align: center;
}

.dumbot-content-body span.align-right {
  display: block;
  overflow: hidden;
  clear: both;
}

.dumbot-content-body span.align-right>span {
  display: block;
  margin: 13px 0 0;
  overflow: hidden;
  text-align: right;
}

.dumbot-content-body span.align-right span img {
  margin: 0;
  text-align: right;
}

.dumbot-content-body span.float-left {
  display: block;
  float: left;
  margin-right: 13px;
  overflow: hidden;
}

.dumbot-content-body span.float-left span {
  margin: 13px 0 0;
}

.dumbot-content-body span.float-right {
  display: block;
  float: right;
  margin-left: 13px;
  overflow: hidden;
}

.dumbot-content-body span.float-right>span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: right;
}

.dumbot-content-body code br,
.dumbot-content-body tt br {
  display: none;
}

.dumbot-content-body del code {
  text-decoration: inherit;
}


.dumbot-content-body .footnotes {
  font-size: 0.8em;
  border-top: 1px solid;
}

.dumbot-content-body .footnotes ol {
  padding-left: 16px;
}

.dumbot-content-body .footnotes li {
  position: relative;
}

.dumbot-content-body .footnotes li:target::before {
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -24px;
  pointer-events: none;
  content: "";
  border: 2px solid;
  border-radius: 6px;
}

.dumbot-content-body .footnotes .data-footnote-backref g-emoji {
  font-family: monospace;
}

.dumbot-content-body .task-list-item {
  list-style-type: none;
}

.dumbot-content-body .task-list-item label {
  font-weight: 400;
}

.dumbot-content-body .task-list-item.enabled label {
  cursor: pointer;
}

.dumbot-content-body .task-list-item+.task-list-item {
  margin-top: 3px;
}

.dumbot-content-body .task-list-item .handle {
  display: none;
}

.dumbot-content-body .task-list-item-checkbox {
  margin: 0 .2em .25em -1.6em;
  vertical-align: middle;
}

.dumbot-content-body .contains-task-list:dir(rtl) .task-list-item-checkbox {
  margin: 0 -1.6em .25em .2em;
}

.bytemd-mermaid {
  background-color: #ffff;
  border-radius:10px;
  margin: 10px;
}
`;
