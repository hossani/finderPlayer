'use client'
import React, { useContext, useEffect, useState } from 'react'
import Tabs from '../general/tabs'
import ProfileAbout from '../general/profileAbout'
import EditProfile from '../modals/editProfile'
import api from '@/util/api'
import AuthContext from '@/contextAPI/authContext'
import ProfileHeader from '../general/profileHeader/profileHeader'

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {userData,setUserData,location,setLocation,sport,setSport}=useContext(AuthContext);
 
useEffect(()=>{
  const fetchUserData = async () => {
    try {
      // Récupère l'ID de l'utilisateur depuis localStorage
      const token = localStorage.getItem('token');
      if (token) {
        const res = await api.get(`/api/profile/`);
        setUserData({
          fullName: res.data.fullName,
          sportId: res.data.sport.id,
          locationId: res.data.location.id,
          birthDate: res.data.birthDate,
          bio: res.data.bio,
          dateRegistered: res.data.dateRegistered,
          picture:res.data.picture
        });
        fetchSport(res.data.sport.id);
        fetchLocation(res.data.location.id);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }};

    const fetchSport = async (sportId) => {
      try {
        const sportRes = await api.get(`/api/sports/${sportId}`);
        setSport(sportRes.data.title); // Met à jour l'état avec les détails du sport
      } catch (error) {
        console.error('Error fetching sport data:', error);
      }
    };

    const fetchLocation = async (locationId) => {
      try {
        
        const locationRes = await api.get(`/api/locations/${locationId}`);
        setLocation(locationRes.data.city); // Met à jour l'état avec les détails de la location
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchUserData();
},[userData.sportId,userData.locationId,userData.picture])


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

   // Fonction pour mettre à jour les données de profil
   const updateProfile = (updatedData) => {
    setUserData(updatedData); // Met à jour l'état local avec les nouvelles données
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-66px)]">
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        <div className="col-span-4 sm:col-span-3">
          <div className="bg-white shadow rounded-lg p-6">
          <ProfileHeader
                userData={userData}
                sport={sport}
                handleOpenModal={handleOpenModal}
              />
          </div>
        </div>
        <div className="col-span-4 sm:col-span-9">
          <div className="bg-white shadow rounded-lg p-6">
            <Tabs/>
            <div className='mt-3'>
            <ProfileAbout userData={userData} sport={sport} location={location}/>

            </div>

          </div>
        </div>
      </div>
    </div>
    {isModalOpen && <EditProfile onClose={handleCloseModal} userData={userData} onUpdate={updateProfile}/>}

  </div>
  )
}

export default Profile