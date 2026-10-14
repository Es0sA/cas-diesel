import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { api } from './api';
import Header from './components/Header';
import Landing from './components/Landing';
import Marketplace from './components/Marketplace';
import LoginPage from './components/LoginPage';
import SupplierPortal from './components/SupplierPortal';
import DriverCockpit from './components/DriverCockpit';
import OrderDetail from './components/OrderDetail';
import ProfileSettings from './components/ProfileSettings';
import AdminDashboard from './components/AdminDashboard';
import BottomNav from './components/BottomNav';
import OrderCheckoutModal from './components/OrderCheckoutModal';
import LegalModals from './components/LegalModals';
import CookieBanner from './components/CookieBanner';
import Footer from './components/Footer';
import Rfqs from './components/Rfqs';

function HomePage({ user, handleOpenRegistration }) {
  const [checkoutSupplier, setCheckoutSupplier] = useState(null);
  const navigate = useNavigate();

  const handleCheckoutSuccess = (orderId) => {
    setCheckoutSupplier(null);
    navigate(`/orders/${orderId}`);
  };
  const marketplaceEl = (
    <Marketplace
      onSelectSupplierForEscrow={(supplier) => setCheckoutSupplier(supplier)}
    />
  );
  return (
    <>
      {user && <h1 className="sr-only">Fuel marketplace</h1>}
      {user ? marketplaceEl : <Landing onRegister={handleOpenRegistration} marketplace={marketplaceEl} />}

      {checkoutSupplier && (
        <OrderCheckoutModal
          supplier={checkoutSupplier}
          onClose={() => setCheckoutSupplier(null)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const [registerInitialRole, setRegisterInitialRole] = useState('buyer');
  const loginInitialRole = 'buyer';
  const navigate = useNavigate();
  const location = useLocation();

  // Restore the logged-in state after a refresh (the session lives in an HttpOnly cookie)
  useEffect(() => {
    api.auth.me()
      .then((session) => { if (session.role) setUser({ role: session.role }); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleOpenRegistration = (role = 'buyer') => {
    setRegisterInitialRole(role);
    navigate('/register');
  };



  const handleRegistrationSuccess = (role) => {
    setUser({ role });
    const normalizedRole = (role || '').toUpperCase();
    if (normalizedRole === 'SUPPLIER') {
      navigate('/marketer');
    } else if (normalizedRole === 'DRIVER') {
      navigate('/driver');
    } else {
      navigate('/');
    }
  };

  const handleLoginSuccess = (role) => {
    setUser({ role });
    const normalizedRole = (role || '').toUpperCase();
    if (normalizedRole === 'ADMIN') {
      navigate('/admin');
    } else if (normalizedRole === 'SUPPLIER') {
      navigate('/marketer');
    } else if (normalizedRole === 'DRIVER') {
      navigate('/driver');
    } else {
      navigate('/');
    }
  };

  const handleLogout = async () => {
    try {
      await api.auth.logout();
    } catch (e) {
      console.error('Logout failed:', e);
    }
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-cas-canvas text-cas-slate">
      {/* Top Header */}
      <Header user={user} onLogout={handleLogout} onOpenLegalModal={(modal) => setActiveLegalModal(modal)} />

      {/* Main Body */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage user={user} handleOpenRegistration={handleOpenRegistration} />} />
          <Route path="/register" element={<LoginPage initialRole={registerInitialRole} initialMode="register" onBackToHome={() => navigate('/')} onLoginSuccess={handleLoginSuccess} onRegistrationSuccess={handleRegistrationSuccess} />} />
          <Route path="/login" element={<LoginPage initialRole={loginInitialRole} initialMode="signin" onBackToHome={() => navigate('/')} onLoginSuccess={handleLoginSuccess} onRegistrationSuccess={handleRegistrationSuccess} />} />
          <Route path="/marketer" element={<SupplierPortal />} />
          <Route path="/driver" element={<DriverCockpit onNavigateToRegister={() => handleOpenRegistration('driver')} />} />
          <Route path="/rfqs" element={<Rfqs user={user} />} />
          <Route path="/rfqs/:id" element={<Rfqs user={user} />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/profile" element={<ProfileSettings user={user} />} />
          <Route path="/admin" element={<AdminDashboard user={user} />} />
        </Routes>
      </main>

      {/* Compliance Modals */}
      <LegalModals 
        activeModal={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />

      {/* Cookie Banner */}
      <CookieBanner onOpenPolicy={(modal) => setActiveLegalModal(modal)} />

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Footer */}
      <div className="pb-20 md:pb-0 bg-slate-950">
        <Footer onOpenLegalModal={(modal) => setActiveLegalModal(modal)} />
      </div>
    </div>
  );
}
