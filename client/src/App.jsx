import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Client from './components/Client';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import Logout from './components/Logout';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ClientNavbar from './components/ClientNavbar';
import AdminNavbar from './components/AdminNavbar';
import Admin from './components/Admin';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import UserContext from './context/UserContext';

const App = () => {
  const location = useLocation();
  const { user } = React.useContext(UserContext);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isClientRoute = location.pathname.startsWith('/client');

  return (
    <>
      {isClientRoute ? (
        <ClientNavbar />
      ) : isAdminRoute ? (
        <AdminNavbar />
      ) : (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/*"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <ClientRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const ClientRoutes = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Client />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
