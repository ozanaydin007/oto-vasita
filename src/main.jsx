import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Sayfa yayın öncesi HTML olarak üretildiyse (prerender) mevcut HTML'e bağlan;
// aksi hâlde (ör. filtreli adres veya bilinmeyen sayfa) sıfırdan oluştur.
const path = window.location.pathname.replace(/\/+$/, '') || '/';
const prerendered = window.__PRERENDER_PATH__;
if (prerendered && prerendered === path && !window.location.search && container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  container.textContent = '';
  createRoot(container).render(app);
}
