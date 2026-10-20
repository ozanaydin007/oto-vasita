import { useEffect, useRef } from 'react';

// Araç bulucu durumunu tarayıcı oturumunda saklar: kullanıcı sonuçlardan bir
// araca gidip geri döndüğünde kaldığı yerden devam eder. Sekme kapanınca silinir.
export function useSessionState(key, state, restore) {
  const restored = useRef(false);
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(key);
      if (raw) restore(JSON.parse(raw));
    } catch {
      // depolama kapalıysa sessizce devam et
    }
    restored.current = true;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!restored.current) return;
    try {
      window.sessionStorage.setItem(key, JSON.stringify(state));
    } catch {
      // yok say
    }
  }, [key, JSON.stringify(state)]); // eslint-disable-line react-hooks/exhaustive-deps
}

export function clearSessionState(key) {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // yok say
  }
}
