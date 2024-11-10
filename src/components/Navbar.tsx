import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../App.css';

const Navbar: React.FC = () => {
  const { auth, logout } = useAuth();
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
   
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-white hover:text-gray-300">
          Home
        </Link>

        {auth.isAuthenticated ? (
          <button
            onClick={logout}
            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
