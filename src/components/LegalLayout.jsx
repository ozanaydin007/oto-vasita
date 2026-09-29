// Hakkında, İletişim ve yasal metin sayfaları için ortak düzen
export default function LegalLayout({ title, updated, children }) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">{title}</h1>
      {updated && <p className="text-sm text-muted mt-2">Son güncelleme: {updated}</p>}
      <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink-soft [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-1 [&_h3]:font-semibold [&_h3]:text-ink [&_h3]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_a]:text-link [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-ink">
        {children}
      </div>
    </article>
  );
}
