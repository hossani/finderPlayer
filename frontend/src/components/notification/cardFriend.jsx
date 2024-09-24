'use client';
import AuthContext from '@/contextAPI/authContext';
import api from '@/util/api';
import React, { useContext } from 'react'

const CardFriend = ({data}) => {

  const {setNotifications,setCircleRedNotif  }=useContext(AuthContext);

  const handleDecline = async () => {
    try {
      // Appel à l'API pour rejeter la demande d'ami
      await api.delete(`/api/players/reject/${data.id}`);

      setNotifications((prevNotifications) => {
        const updatedNotifications = prevNotifications.filter((notification) => notification.fromUserId != data.id);
        
        if (updatedNotifications.length === 0) {
          setCircleRedNotif(false); // Désactiver le cercle rouge si aucune notification n'existe
        }

        return updatedNotifications;
      });

    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  const handleAccept = async () => {
    try {
      // Appel à l'API pour accepter la demande d'ami
      await api.patch(`/api/players/accept/${data.id}`);
  
      setNotifications((prevNotifications) => {
        const updatedNotifications = prevNotifications.filter((notification) => notification.fromUserId != data.id);
        
        if (updatedNotifications.length === 0) {
          setCircleRedNotif(false); // Désactiver le cercle rouge si aucune notification n'existe
        }
  
        return updatedNotifications;
      });
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };


  return (
    <>
         <div className="flex justify-center items-center my-6">
        <div className="w-1/5">
          <img
            className="w-12 h-12 rounded-full border border-gray-100 shadow-sm"
            src={data.picture}
            alt="user image"
          />
        </div>
        <div className="w-4/5">
          <div>
            <span className="font-semibold text-gray-800">{data.fullName}</span>
            <span className="text-gray-400"> want to be ur friend</span>
          </div>
          <div className="font-semibold">
            <button onClick={handleAccept}
             className="text-blue-600 mr-2">
              Accept
            </button>
            <button onClick={handleDecline}  
            className="text-gray-400 cursor-pointer">
              Decline
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardFriend