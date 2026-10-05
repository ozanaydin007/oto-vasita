import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CookieConsent from './components/CookieConsent.jsx';
import SeoSync from './components/SeoSync.jsx';
import Home from './pages/Home.jsx';
import AllCarsPage from './pages/AllCarsPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import Methodology from './pages/Methodology.jsx';
import About from './pages/About.jsx';
import ComparePage from './pages/ComparePage.jsx';
import CompareTray from './components/CompareTray.jsx';
import GuidesPage from './pages/GuidesPage.jsx';
import GuidePage from './pages/GuidePage.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import CookiePolicy from './pages/CookiePolicy.jsx';
import NotFound from './pages/NotFound.jsx';

// Sayfa değişince başa kaydır. Tüm araçlar sayfasında filtre değiştirmek
// yalnızca adres parametrelerini değiştirdiği için orada kaydırma yapılmaz.
function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    if (pathname !== '/araclar') window.scrollTo(0, 0);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <SeoSync />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/araclar" element={<AllCarsPage />} />
          <Route path="/kategori/:slug" element={<CategoryPage />} />
          <Route path="/inceleme/:slug" element={<ReviewPage />} />
          <Route path="/ara" element={<SearchPage />} />
          <Route path="/puanlama" element={<Methodology />} />
          <Route path="/karsilastir" element={<ComparePage />} />
          <Route path="/karsilastir/:pair" element={<ComparePage />} />
          <Route path="/rehber" element={<GuidesPage />} />
          <Route path="/rehber/:slug" element={<GuidePage />} />
          <Route path="/hakkinda" element={<About />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/gizlilik" element={<Privacy />} />
          <Route path="/cerez-politikasi" element={<CookiePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CompareTray />
      <CookieConsent />
    </div>
  );
}
