import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // While we don't create index.css explicitly, build tools usually expect an import or we rely on the Tailwind CDN in index.html, but keeping this for standard structure if a bundler was used. Since we use CDN, this might be a no-op or handled by build.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);