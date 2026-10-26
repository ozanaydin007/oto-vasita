// Yayın sırasında üretilen araç başına ayrıntı dosyaları (scripts/split-details.mjs).
// Vite her dosyayı ayrı, küçük bir parça olarak paketler; yalnızca gerektiğinde yüklenir.
export default import.meta.glob('./details/*.js');
