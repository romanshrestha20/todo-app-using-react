import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext({
  auth: { token: null, user: null, isAuthenticated: false },
  login: (token, user) => {},
  register: async (email, password) => {},
  logout: () => {},
});

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
  });

  // Set user on login using token stored in localStorage
  useEffect(() => {
    if (auth.token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((response) => {
          setAuth({
            token: auth.token,
            user: response.data,
            isAuthenticated: true,
          });
        })
        .catch(() => {
          setAuth({
            token: null,
            user: null,
            isAuthenticated: false,
          });
        });
    }
  }, [auth.token]);

  // Login function
  const login = (token, user) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      setAuth({ token, user, isAuthenticated: true });
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  // Registration function
  const register = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, {
        email,
        password,
      });
      alert('Registration successful!');
      return response.data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
