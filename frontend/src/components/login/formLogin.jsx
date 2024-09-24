'use client';

import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '@/contextAPI/authContext';
import axios from 'axios';

const FormLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useContext(AuthContext);

  // Load saved credentials if available
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      // Send the data to the backend
      const response = await axios.post('http://localhost:3002/api/auth/login', { email, password });
      // Handle successful response
      if (response.data.token) {
        setSuccess('Successful login! Redirecting...');
        localStorage.setItem('userId',response.data.userId)
        login(response.data.token,response.data.userId);
        router.push('/');

        // Save credentials if "Remember me" is checked
        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
      }  
    } catch (err) {  
      // Error handling
      setError(err.response?.data?.message || 'Something went wrong, please try logging in again.');
    }
  };

  // Reset error on input change
  const handleEmailChange = (e) => {
    setError('');
    setSuccess('');
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setError('');
    setSuccess('');
    setPassword(e.target.value);
  };

  return (
    <section
      className="bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: 'url("stadium.jpg")',
        minHeight: 'calc(100vh - 42px)'
      }}
    >
      <div className="flex flex-col items-center justify-center px-6 mx-auto w-full max-w-md">
        <div className="w-full bg-black rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="placeholder-gray-500 bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="placeholder-gray-500 bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              {success && <p className="text-green-500 mt-4">{success}</p>}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      checked={rememberMe}
                      onChange={() => setRememberMe((prevState)=>!prevState)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-white dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                {/* <a
                  className="text-sm font-medium text-yellow-500 hover:underline dark:text-white"
                >
                  Forgot password?
                </a> */}
              </div>
              <button
                type="submit"
                className="w-full text-black bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-white dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-medium text-yellow-500 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormLogin;
