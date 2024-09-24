'use client'
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/util/api';
import { useRouter } from 'next/navigation'
import AuthContext from '@/contextAPI/authContext';

const FormRegister = () => {
  const { login } = useContext(AuthContext); 
  const router = useRouter()
  const [locations, setLocations] = useState([]);
  const [sports, setSports] = useState([]);
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sportId, setSportId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Retrieve locations
    const fetchLocations = async () => {
      try {
        const response = await api.get('/api/locations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    // Retrieve sports
    const fetchSports = async () => {
      try {
        const response = await api.get('/api/sports');
        setSports(response.data);
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    };

    fetchLocations();
    fetchSports();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      // Send the data to the backend
      const response = await api.post('/api/auth/register', {
        fullName,
        birthDate,
        email,
        password,
        sportId: parseInt(sportId),
        locationId: parseInt(locationId),
      });
      console.log('response',response.data);
      // Handle successful response
    if(response.data) { 
      setSuccess('Successful registration! You will be authenticated in a moment, please wait a second.');
      login(response.data.token,response.data.userId); 
      localStorage.setItem('userId',response.data.userId)
      router.push('/players')
    };
    } catch (err) {
      // Error handling
      setError(err.response?.data?.message || 'Something went wrong, please try registering again.');
    }
  };

  return (
    <>
      <section
        className="bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: 'url("stadium.jpg")',
          minHeight: 'calc(100vh - 42px)',
        }}
      >
        <div className="grid md:grid-cols-2 items-center gap-y-8 bg-white max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md overflow-hidden">
          <div className="max-md:order-1 flex flex-col justify-center sm:p-8 p-4 bg-gradient-to-r from-black to-yellow-600 w-full h-full">
            <div className="max-w-md space-y-12 mx-auto">
              <div>
                <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
                <p className="text-[13px] text-white mt-2">
                  Welcome to our registration page! Get started by creating your account.
                </p>
              </div>
              <div>
                <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
                <p className="text-[13px] text-white mt-2">
                  Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.
                </p>
              </div>
              <div>
                <h4 className="text-white text-lg font-semibold">Terms and Conditions Agreement</h4>
                <p className="text-[13px] text-white mt-2">
                  Require users to accept the terms and conditions of your service during registration.
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="sm:p-8 p-4 w-full bg-black">
            <div className="mb-12">
              <h3 className="text-white text-3xl font-extrabold max-md:text-center">Register</h3>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <label className="text-white text-sm mb-2 block">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => {setError('');    setSuccess('');
                    setFullName(e.target.value); }}
                  className="placeholder-gray-500 bg-gray-50 border border-gray-300 text-black w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Date of birth</label>
                <input
                  name="birthDate"
                  type="date" // Utiliser type="date" pour une meilleure expérience utilisateur
                  value={birthDate}
                  onChange={(e) => {setError('');    setSuccess('');
                    setBirthDate(e.target.value);}}
                  className="placeholder-gray-500 bg-gray-50 border border-gray-300 text-black w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Birth: 15/12/2000"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Email</label>
                <input
                  name="email"
                  type="email" // Utiliser type="email" pour la validation native
                  value={email}
                  onChange={(e) => {setError('');    setSuccess('');
                    setEmail(e.target.value);}}
                  className="placeholder-gray-500 bg-gray-50 border border-gray-300 text-black w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Password</label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => {setError('');    setSuccess('');
                    setPassword(e.target.value);}}
                  className="placeholder-gray-500 bg-gray-50 border border-gray-300 text-black w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Sport</label>
                <select
                  name="sportId"
                  value={sportId}
                  onChange={(e) => {setError('');    setSuccess('');
                    setSportId(e.target.value);}}
                  className="placeholder-gray-500 bg-gray-50 border border-gray-300 text-black w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                >
                  <option value="">Select your sport</option>
                  {sports.map((sport) => (
                    <option key={sport.id} value={sport.id}>{sport.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Location</label>
                <select
                  name="locationId"
                  value={locationId}
                  onChange={(e) => {setError('');    setSuccess('');
                    setLocationId(e.target.value);}}
                  className="placeholder-gray-500 bg-gray-50 border border-gray-300 text-black w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                >
                  <option value="">Select your location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>{location.city}</option>
                  ))}
                </select>
              </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
            <div className="flex items-center mt-6">
              <p className="text-sm text-white">
                I have already an account.
                <span className="text-yellow-500 font-semibold hover:underline ml-1">
                  <Link href='/login' >Sign In</Link>
                </span>
              </p>
            </div>
            <div className="mt-6">
              <button
                type="submit" 
                className="py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none transition-all"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default FormRegister;
