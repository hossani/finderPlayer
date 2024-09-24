'use client'
import React, { createContext, useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [circleRedNotif,setCircleRedNotif]=useState(false); // It s for notification 
  const [circleRedMessage,setCircleRedMessage]=useState(false); // It s for notification 
  const [location, setLocation] = useState(null);
  const [userId, setUserId] = useState('');
  const [sport, setSport] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);  // Nouvel état pour gérer le chargement
  const router = useRouter();
  const [userData, setUserData] = useState({
    fullName: '',
    sportId: '',
    locationId: '',
    birthDate: '',
    bio: '',
    picture: '',
    dateRegistered: '',
  });
  const [notifications, setNotifications] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState([]);

  useLayoutEffect(() => {
    // Check the token and userId on each page load
    const token = localStorage.getItem('token');
    const userId=localStorage.getItem('userId');
    if (token) {
      setAuth(true);
      setUserId(userId);

    } else {
      setAuth(false);
      setUserId('');
    }
    setLoadingAuth(false);  // Fin du chargement une fois la vérification faite
  }, []);

  const login = (token,userId) => {
    localStorage.setItem('token', token);
    setUserId(userId);
    setAuth(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUserId('');
    setAuth(false);
    setUserData({
      fullName: '',
      sportId: '',
      locationId: '',
      birthDate: '',
      bio: '',
      picture: '',
      dateRegistered: '',
    });
    router.push('/'); // Redirect the user to the login page
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, userData,
     setUserData,loadingAuth,location,setLocation,sport,setSport,
     userId,
     notifications, setNotifications,
     circleRedNotif,setCircleRedNotif,
          circleRedMessage,setCircleRedMessage,
          notificationMessage, setNotificationMessage
     }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
