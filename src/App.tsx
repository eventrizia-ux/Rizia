import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router';
import { LocationModal } from './components/LocationModal';
import { useDarkMode } from './hooks/useDarkMode';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Competitions from './pages/Competitions';
import CompetitionDetails from './pages/CompetitionDetails';
import RegistrationConfirmation from './pages/RegistrationConfirmation';
import Submission from './pages/Submission';
import SubmissionSuccess from './pages/SubmissionSuccess';
import MySubmissions from './pages/MySubmissions';
import AccountSettings from './pages/AccountSettings';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCompetitions from './pages/admin/ManageCompetitions';
import ReviewSubmissions from './pages/admin/ReviewSubmissions';
import AllBookings from './pages/admin/AllBookings';
import Analytics from './pages/admin/Analytics';
import UsersManagement from './pages/admin/UsersManagement';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Help from './pages/Help';
import Checkout from './pages/Checkout';

function AppContent({ user, isAdmin, selectedCity, showLocationModal, setShowLocationModal, handleLogin, handleLogout, handleLocationSelect }: any) {
  const navigate = useNavigate();

  const handleLogoutWithRedirect = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <>
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelectLocation={handleLocationSelect}
      />
      
      <Routes>
        <Route path="/" element={<Home user={user} selectedCity={selectedCity} onChangeCity={() => setShowLocationModal(true)} />} />
        <Route path="/signup" element={user ? <Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} /> : <Signup onSignup={handleLogin} />} />
        <Route path="/login" element={user ? <Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} /> : <Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={user && !isAdmin ? <Dashboard user={user} onLogout={handleLogoutWithRedirect} /> : <Navigate to="/login" />} />
        <Route path="/competitions" element={<Competitions user={user} selectedCity={selectedCity} onChangeCity={() => setShowLocationModal(true)} />} />
        <Route path="/competition/:id" element={<CompetitionDetails user={user} />} />
        <Route path="/registration-confirmation/:id" element={user ? <RegistrationConfirmation user={user} /> : <Navigate to="/login" />} />
        <Route path="/submission/:id" element={user ? <Submission user={user} /> : <Navigate to="/login" />} />
        <Route path="/submission-success" element={user ? <SubmissionSuccess user={user} /> : <Navigate to="/login" />} />
        <Route path="/my-submissions" element={user ? <MySubmissions user={user} onLogout={handleLogoutWithRedirect} /> : <Navigate to="/login" />} />
        <Route path="/account-settings" element={user ? <AccountSettings user={user} onLogout={handleLogoutWithRedirect} onUpdateUser={handleLogin} /> : <Navigate to="/login" />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard onLogout={handleLogoutWithRedirect} /> : <Navigate to="/login" />} />
        <Route path="/admin/manage-competitions" element={isAdmin ? <ManageCompetitions onLogout={handleLogoutWithRedirect} /> : <Navigate to="/login" />} />
        <Route path="/admin/review-submissions/:id" element={isAdmin ? <ReviewSubmissions onLogout={handleLogoutWithRedirect} /> : <Navigate to="/login" />} />
        <Route path="/admin/all-bookings" element={isAdmin ? <AllBookings onLogout={handleLogoutWithRedirect} /> : <Navigate to="/login" />} />
        <Route path="/admin/bookings" element={isAdmin ? <AllBookings onLogout={handleLogoutWithRedirect} /> : <Navigate to="/login" />} />
        <Route path="/admin/analytics" element={isAdmin ? <Analytics onLogout={handleLogoutWithRedirect} /> : <Navigate to="/login" />} />
        <Route path="/admin/users-management" element={isAdmin ? <UsersManagement onLogout={handleLogoutWithRedirect} /> : <Navigate to="/login" />} />
        <Route path="/admin/users" element={isAdmin ? <UsersManagement onLogout={handleLogoutWithRedirect} /> : <Navigate to="/login" />} />
        
        {/* Additional Routes */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/help" element={<Help />} />
        <Route path="/checkout/:id" element={user ? <Checkout user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('user');
    const savedIsAdmin = localStorage.getItem('isAdmin');
    const savedCity = localStorage.getItem('selectedCity');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAdmin(savedIsAdmin === 'true');
    }

    if (savedCity) {
      setSelectedCity(savedCity);
    } else {
      // Show location modal on first visit
      setShowLocationModal(true);
    }
  }, []);

  const handleLogin = (userData, adminStatus = false) => {
    setUser(userData);
    setIsAdmin(adminStatus);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAdmin', adminStatus.toString());
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
  };

  const handleLocationSelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
    setShowLocationModal(false);
  };

  return (
    <Router>
      <AppContent 
        user={user}
        isAdmin={isAdmin}
        selectedCity={selectedCity}
        showLocationModal={showLocationModal}
        setShowLocationModal={setShowLocationModal}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        handleLocationSelect={handleLocationSelect}
      />
    </Router>
  );
}