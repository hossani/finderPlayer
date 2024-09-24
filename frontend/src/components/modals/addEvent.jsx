'use client';

import React, { useEffect, useState } from 'react';
import api from '@/util/api'; // Assurez-vous que ce chemin est correct pour l'instance Axios ou votre fichier de configuration API

const AddEvent = ({ onClose }) => {
  const [locations, setLocations] = useState([]);
  const [sports, setSports] = useState([]);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [sportId, setSportId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [description, setDescription] = useState('');
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

    setError('');
    setSuccess('');

    try {
      const response = await api.post('/api/announcements', {
        title,
        deadline,
        sportId:parseInt(sportId),
        locationId:parseInt(locationId),
        description,
      });

      if (response.data) {
        setSuccess('Event added successfully!');
        // Call onClose to close the modal
         onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="wrapper flex justify-center items-center min-h-screen p-4">
      <div
        id="crud-modal"
        tabIndex={-1}
        className="w-full flex justify-center items-center"
      >
        <div className="py-4 w-full max-w-lg h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-2 md:p-4">
            <div className="flex items-center justify-between border-b pb-3 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Event
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="mt-4 p-2 max-h-[75vh] overflow-y-auto" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Besoin d'un joueur attaquant pour match foot"
                    value={title}
                    onChange={(e) => { setError(''); setSuccess(''); setTitle(e.target.value);}}
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="deadline"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="20/12/2024"
                    value={deadline}
                    onChange={(e) => { setError(''); setSuccess(''); setDeadline(e.target.value)}}
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="sport"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sport
                  </label>
                  <select
                    id="sport"
                    name="sport"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={sportId}
                    onChange={(e) => { setError(''); setSuccess('');setSportId(e.target.value)}}
                    required
                  >
                    <option value="">Select a sport</option>
                    {sports.map(sport => (
                      <option key={sport.id} value={sport.id}>{sport.title}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={locationId}
                    onChange={(e) => { setError(''); setSuccess('');setLocationId(e.target.value)}}
                    required
                  >
                    <option value="">Select a location</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>{location.city}</option>
                    ))}
                  </select>
                </div>
           
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write about the event here"
                    value={description}
                    onChange={(e) => { setError(''); setSuccess('');setDescription(e.target.value)}}
                    required
                  />
                </div>
              </div>
              {error && <p className="text-red-500 my-4">{error}</p>}
              {success && <p className="text-green-500 my-4">{success}</p>}
              <button
                type="submit"
                className="text-black inline-flex items-center bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
