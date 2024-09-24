'use client'
import api from '@/util/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EditProfile = ({onClose,userData,onUpdate}) => {
  const [locations, setLocations] = useState([]);
  const [sports, setSports] = useState([]);
  const [updatedData, setUpdatedData] = useState(userData);
  const [image, setImage] = useState(null);
  const [error,setError]=useState('');
  const [waiting,setWaiting]=useState('');

  const handleChange = (e) => {
    setError('');
    setWaiting('');
    const { name, value } = e.target;
    
      setUpdatedData({ ...updatedData, [name]: value });
    
  };


  useEffect(() => {
    // Fetch locations and sports dynamically
    const fetchLocations = async () => {
      try {
        const res = await api.get("/api/locations"); 
        setLocations(res.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const fetchSports = async () => {
      try {
        const res = await api.get("/api/sports"); 
        setSports(res.data);
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };

    fetchLocations();
    fetchSports();
  }, []);

  useEffect(() => {
    if (userData.birthDate) {
      const date = new Date(userData.birthDate);
      setUpdatedData({
        ...userData,
        birthDate: date.toISOString().split('T')[0] // Format YYYY-MM-DD
      });
    }
  }, [userData]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setWaiting('Wait a second ...')
      // Si une image a été téléchargée
      if (image) {
        const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dhtqzlo9k/image/upload';
        const uploadPreset = 'cloudinarytutorial';
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', uploadPreset);
        
        const responseImage = await axios.post(cloudinaryUrl, formData);
        
        if (responseImage.data.secure_url) {
          // Mettre à jour updatedData avec l'URL de l'image
          const newUpdatedData = {
            ...updatedData,
            picture: responseImage.data.secure_url
          };
  
          // Mettre à jour le profil avec la nouvelle URL de l'image
          const res = await api.patch(`/api/profile`, newUpdatedData);
          if (res.data) {
            onUpdate(newUpdatedData); // Renvoie les nouvelles données au parent, y compris l'image
            onClose(); // Ferme le modal
          }
        }
      } else {
        // Si aucune image n'est téléchargée, mettez à jour directement avec les autres données
        const res = await api.patch(`/api/profile`, updatedData);
  
        if (res.data) {
          onUpdate(updatedData); // Renvoie les données mises à jour au parent
          onClose(); // Ferme le modal
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setWaiting('')
      setError(error.response?.data?.message || 'Something went wrong.');
    }
  };



  return (
    
<>
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
              Update Profile
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
          <form onSubmit={handleSubmit} className="mt-4 p-2 max-h-[75vh] overflow-y-auto">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Photo profile
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])} 
                  name="image"
                  id="image"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
               />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full name
                </label>
                <input
                name="fullName"
                value={updatedData.fullName}
                onChange={handleChange}
                  type="text"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="hamza hossani"
                  required=""
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="sport"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Main sport
                </label>
                <select
                  id="sportId"
                  name="sportId"
                  value={updatedData.sportId}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                   {sports.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.title}
                    </option>
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
                  id="locationId"
                  name="locationId"
                  value={updatedData.locationId}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                      {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="birthDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of birth
                </label>
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  value={updatedData.birthDate}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required=""
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  About
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={updatedData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write about yourself here"
                  defaultValue={""}
                />
              </div>
            </div>
            {error && <p className="text-red-500 my-4">{error}</p>}
            {waiting && <p className="text-yellow-600 my-4">{waiting}</p>}

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
</>
  )
}

export default EditProfile;

