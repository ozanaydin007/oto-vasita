import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import { DETAILS } from './data/carDetails.js';
import { primeDetails } from './lib/details.js';

// Sunucu tarafında tüm inceleme metinleri baştan hazır (hazır HTML’de yer alsın)
primeDetails(DETAILS);

// Yayın öncesi HTML üretimi (scripts/prerender.mjs) bu fonksiyonu kullanır.
export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
