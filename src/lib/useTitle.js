import { useEffect } from 'react';

export default function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Oto Vasıta` : 'Oto Vasıta — Otomobil İncelemeleri ve Sıralamaları';
  }, [title]);
}
