'use client'
import React, { useContext, useEffect, useState } from 'react'
import Tabs from '../general/tabs'
import ListeMessages from './listeMessage'
import EditProfile from '../modals/editProfile';
import AuthContext from '@/contextAPI/authContext';
import ProfileHeader from '../general/profileHeader/profileHeader';
import api from '@/util/api';
import ChatMessage from './chatMessage/chatMessage';

const PageOfListMessage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [error, setError] = useState('');
    const [activePlayer, setActivePlayer] = useState(null); // Etat pour joueur actif

    const {userData,setUserData,location,setLocation,sport,setSport}=useContext(AuthContext);
    
    const handleChat = (player) => {
      setActivePlayer(player);
  };

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };


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

            const resConversation = await api.get(`/api/messages/getUserConversations`); // Fetch unique conversations
           if(resConversation.data.uniqueConversations) {
            setConversations(resConversation.data.uniqueConversations);
           }
        
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError(error.response?.data?.message||'Something went wrong.');
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
            <ListeMessages
             conversations={conversations}
             onChat={handleChat}
             setConversations={setConversations}
            />
      {error && <p className="text-red-500">{error}</p>}
      </div>

          </div>
        </div>
      </div>
    </div>
    {isModalOpen && <EditProfile onClose={handleCloseModal} userData={userData} onUpdate={updateProfile}/>}
    {activePlayer && <ChatMessage player={activePlayer} handleChat={() => setActivePlayer(null)} />}
       {/* Passer activePlayer au ChatMessage */}
  </div>
  )
}

export default PageOfListMessage;