import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from './ToastProvider';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const toast = useToast();

  // Decode JWT to get user info
  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // console.log('Payload:', payload);
      // Check if the token is expired
      const now = Math.floor(Date.now() / 1000);
      // console.log('now', now);
      // console.log('payload.exp', payload.exp);
      if (payload.exp < now) {
        // Token is expired
        toast.error('Session expired. Please log in again.');
        // alert('Session expired. Please log in again.');
        setToken(null);
        localStorage.removeItem('token');
        setUser(null);
        return;
      } else {
        // Token is valid, set user state
        // console.log('Token is valid, setting user state');

        setUser({
          name: payload.name,
          email: payload.email,
          role: payload.role,
          user_id: payload.user_id,
        });
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch('http://localhost/acmarket/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      toast.success('Login Successfully');
      return true;
    } else {
      toast.success(data.message || 'Login failed');
      // alert(data.message || 'Login failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    toast.success('Logout Successfully');
  };

  const authFetch = async (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    };

    return fetch(url, { ...options, headers });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
