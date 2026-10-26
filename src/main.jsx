import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { loadDetails } from './lib/details.js';
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
async function start() {
  // İnceleme sayfasında, hazır HTML ile birebir eşleşmesi için önce o aracın metinlerini yükle
  const m = path.match(/^\/inceleme\/([^/]+)$/);
  if (m) await loadDetails(decodeURIComponent(m[1]));
  if (prerendered && prerendered === path && !window.location.search && container.hasChildNodes()) {
    hydrateRoot(container, app);
  } else {
    container.textContent = '';
    createRoot(container).render(app);
  }
}
start();
