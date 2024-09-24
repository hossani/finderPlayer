'use client'
import FriendRequest from '@/components/notification/friendRequest';
import AuthContext from '@/contextAPI/authContext';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { initSocket } from '@/util/socket';
import CircleRed from './circleRed';
import api from '@/util/api';
import MessageRequest from '@/components/notification/messageRequest';

const NavProfile = ({isMenuOpen,logout,auth}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false); // Ajouter un état pour la notification
  const [notificationOpenMessage, setNotificationOpenMessage] = useState(false);
  const {userId,setNotifications,notifications, circleRedNotif,setCircleRedNotif,
     circleRedMessage,setCircleRedMessage, notificationMessage, setNotificationMessage}
     = useContext(AuthContext);

  useEffect(() => {
    
    // Initialisation de la connexion Socket.IO uniquement lorsque le composant est monté
    const socket = initSocket();
        socket.emit('user_connected', userId);
       // Recevoir les notifications de demande d'amitié
        socket.on('receive_friend_request', ({fromUserId,sender}) => {  // id de fromUser
            setNotifications((prevState)=>[{fromUserId,sender},...prevState]);
            setCircleRedNotif(true);
        });
        socket.on('receive_message_notification',({senderId,fullName,picture})=>{

          setNotificationMessage((prevState) => {
            // Filtrer les anciennes notifications pour supprimer celles ayant le même senderId
            const filteredNotifications = prevState.filter(
              (notification) => notification.senderId != senderId
            );
            return [{ senderId, fullName, picture }, ...filteredNotifications];
          });
          setCircleRedMessage(true);
        });
 // Récupérer les demandes d'amis en attente via getFriendsPending
 const fetchPendingRequests = async () => {
  try {
    const requests = await api.get('/api/players/pendingRequest'); // Appelle la fonction pour récupérer les demandes
    if (requests.data.pendingRequests.length > 0) {
      setNotifications(requests.data.pendingRequests) // {id}
      setCircleRedNotif(true); // Activer le cercle rouge si des demandes sont présentes
    } else{
      setNotifications([]);
      setCircleRedNotif(false)
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes en attente', error);
  }
};

// Fetch unread messages
const fetchUnreadMessages = async () => {
  try {
    const response = await api.get('/api/messages/unread'); 
    console.log(response)
    if (response.data.length > 0) {
      // Filtrer pour éviter les répétitions
      const uniqueMessages = response.data.reduce((acc, item) => {
        if (!acc.some(msg => msg.senderId === item.senderId)) {
          acc.push({
            senderId: item.senderId,
            fullName: item.sender.fullName,
            picture: item.sender.picture
          });
        }
        return acc;
      }, []);      
      setNotificationMessage(uniqueMessages);
      setCircleRedMessage(true);
    } else {
      setNotificationMessage([]);
      setCircleRedMessage(false);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des messages non vus', error);
  }
};


fetchUnreadMessages();
fetchPendingRequests(); // Appelle la fonction de récupération des demandes
    return () => {
       socket.disconnect();
    };
 }, []);

 useEffect(()=>{
  const hideRedCircleMsg=()=>{
    if(!notificationMessage.length>0) setCircleRedMessage(false)
  }
hideRedCircleMsg();
 },[notificationMessage])

  return (
    <div className={`flex items-center ml-auto space-x-8 ${isMenuOpen ? 'hidden' : 'block'}`}>
      {/* Notification Icon */}
      <span className="relative" onClick={() => setNotificationOpen(!notificationOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          className="cursor-pointer fill-[#fff] hover:fill-[#fbff00] inline-block"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2C8.69 2 6 4.69 6 8v5.59l-1.29 1.29A1 1 0 0 0 5 16v1h14v-1a1 1 0 0 0-.29-.71L18 13.59V8c0-3.31-2.69-6-6-6zm1 17h-2v1c0 1.1.9 2 2 2s2-.9 2-2v-1z"
          />
        </svg>
      {circleRedNotif? <CircleRed/>:''}
      </span>

      {notificationOpen && (
          <FriendRequest notifications={notifications} />
      )}

      {/* Mail Icon */}
      <span className="relative" onClick={() => setNotificationOpenMessage(!notificationOpenMessage)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          className="cursor-pointer fill-[#fff] hover:fill-[#fbff00] inline-block"
          viewBox="0 0 512 512"
        >
          <path
            d="M502.3 190.8l-230-160a48 48 0 0 0-52.6 0l-230 160A48 48 0 0 0 0 232.7V392c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V232.7c0-16.7-8.3-32.4-21.7-41.9zM464 392H48V232.7L256 95.1l208 137.6V392zm-208-208L53.3 217.3 256 329.9l202.7-112.6L256 184z"
          />
        </svg>
        {circleRedMessage? <CircleRed/>:''}

      </span>
      {notificationOpenMessage && (
          <MessageRequest  notifications={notificationMessage}/>
      )}
      {/* Profile and Dropdown */}
      <div className="relative">
        <a
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className="h-12 w-12 rounded-full">
            <img src={auth?'https://res.cloudinary.com/dhtqzlo9k/image/upload/v1726241479/tz9tfvyl1izkegro4jca.png'
              :''
            } alt="User" />
          </span>
          <svg
            className="hidden fill-current text-white sm:block"
            width={12}
            height={8}
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            />
          </svg>
        </a>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
            <Link
              href="/settings"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
            <a
              onClick={logout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavProfile;
