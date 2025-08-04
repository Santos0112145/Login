// src/components/PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}