import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { GiftProvider } from './context/GiftContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

import { Home } from './pages/Home';
import { Gifts } from './pages/Gifts';
import { HowToGiftPage } from './pages/HowToGiftPage';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

// Helper component to scroll to top on route navigation
const ScrollToTopOnRoute = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App = () => {
  return (
    <ToastProvider>
      <GiftProvider>
        <BrowserRouter>
          <ScrollToTopOnRoute />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/presentes" element={<Gifts />} />
                <Route path="/como-presentear" element={<HowToGiftPage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <BackToTop />
          </div>
        </BrowserRouter>
      </GiftProvider>
    </ToastProvider>
  );
};

export default App;
