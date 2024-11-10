import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
            <p className="text-lg mb-6">We can't find the page you're looking for.</p>
            <button 
                onClick={handleGoHome} 
                className="px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600"
            >
                Go to Home
            </button>
        </div>
    );
};

export default ErrorPage;