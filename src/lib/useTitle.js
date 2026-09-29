import { useEffect } from 'react';

export default function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | OtoVaro` : 'OtoVaro — Otomobil İncelemeleri ve Sıralamaları';
  }, [title]);
}
