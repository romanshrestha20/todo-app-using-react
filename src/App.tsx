import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Authentication from "./components/Authentication";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        
        <Routes>
          <Route path="/login" element={<Authentication mode="login" />} />
          <Route
            path="/register"
            element={<Authentication mode="register" />}
          />
          <Route
            path="/"
            element={
              // <ProtectedRoute>
                <Home />
              // </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
