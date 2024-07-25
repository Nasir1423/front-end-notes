import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
/* 每次 store 中状态更新时，会重新从根逐渐开始进行渲染。由于 React-Diffing，不会引起浏览器的大量重绘重排。 */
store.subscribe(
  () => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
)
