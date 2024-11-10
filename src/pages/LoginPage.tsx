import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const LoginPage = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const url = 'http://localhost:3001'

    const handleLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${url}/user/login`,
                {
                    email,
                    password
                },
                {
                    headers: {
                      Authorization: `Bearer ${process.env.JWT_SECRET_KEY}`,
                      "Content-Type": "application/json",
                    },
                })
            localStorage.setItem('token', response.data.token)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.message)
            } else {
                console.error('An unexpected error occurred')
            }
            setError('Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
  return (
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        );
    };
};

    export default LoginPage;