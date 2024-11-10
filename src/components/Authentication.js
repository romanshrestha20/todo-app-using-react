import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Corrected import

const Authentication = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Correct usage of useAuth hook
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001"; // Using env variable for base URL

      if (mode === "register") {
        response = await axios.post(`${apiUrl}/user/register`, {
          email,
          password,
        });
        alert("Registration successful!");
        navigate("/signin");
      } else if (mode === "login") {
        response = await axios.post(`${apiUrl}/user/login`, {
          email,
          password,
        });
        login(response.data.token, { email });
        navigate(`/`);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">
          {mode === "register" ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {mode === "register" ? "Register" : "Login"}
          </button>
          {mode === "register" ? (
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Click here to login
              </a>
            </p>
          ) : (
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Click here to register
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Authentication;
