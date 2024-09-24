import React, { useEffect, useState, useContext } from 'react';
import DetailsPlayer from './detailsPlayer';
import LoadingBall from '../general/loading/loadingBall';
import Error from '../general/error/error';
import api from '@/util/api';
import ChatMessage from '../messages/chatMessage/chatMessage';
import { initSocket } from '@/util/socket';
import AuthContext from '@/contextAPI/authContext';

const ProfilePlayer = ({ playerID }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activePlayer, setActivePlayer] = useState(null); // État pour le chat
  const [friendStatus, setFriendStatus] = useState(false); // État pour le statut d'ami
  const [socket, setSocket] = useState(null);

  const { userId } = useContext(AuthContext); // Obtenir l'ID utilisateur du contexte

  useEffect(() => {
    if (playerID) {
      const fetchUser = async () => {
        try {
          const response = await api.get(`/api/profile/${playerID}`);
          setProfile(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.response?.data?.message || 'Something went wrong.');
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [playerID]);

  useEffect(() => {
    const socketInstance = initSocket();
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Vérifier le statut d'ami lors du chargement de la page
  useEffect(() => {
    const checkFriendStatus = async () => {
      try {
        const response = await api.get(`/api/players/checkFriendStatus/${playerID}`);
        if (response.data.status === 'ACCEPTED') {
          setFriendStatus('friend');
        } else if (response.data.requestSent === 'PENDING') {
          setFriendStatus('sent');
        } else {
          setFriendStatus(false);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du statut d\'amitié:', error);
      }
    };

    if (playerID) {
      checkFriendStatus();
    }
  }, [playerID]);

  // Gérer l'ouverture du chat
  const handleOpenChat = () => {
    setActivePlayer(profile); // Met le joueur actuel comme joueur actif pour le chat
  };

  const sendFriendRequest = (userId, friendId, senderUser) => {
    socket.emit('send_friend_request', {
      fromUserId: userId,
      toUserId: friendId,
      dataUser: senderUser,
    });
  };

  const handleAddFriend = async () => {
    try {
      const response = await api.post('/api/players/addFriend', {
        user2Id: profile.id,
      });
      if (response.data) {
        alert('Demande d\'ami envoyée avec succès !');
        sendFriendRequest(userId, String(profile.id), response.data.senderUser);
        setFriendStatus('sent');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande d\'ami:', error);
      alert('Erreur lors de l\'envoi de la demande d\'ami.');
    }
  };

  if (loading) return <LoadingBall />;
  if (error) return <Error error={error} />;
  if (!profile) return <Error error={error} />;

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-66px)]">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src={profile.picture}
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt="Player profile"
                />
                <h1 className="text-xl font-bold">{profile.fullName}</h1>
                <p className="text-gray-700">{profile.sport.title}</p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <button 
                    onClick={handleAddFriend}
                    disabled={friendStatus}
                    className={`bg-yellow-300 hover:bg-yellow-400 text-black py-2 px-4 rounded ${
                      friendStatus ? 'cursor-not-allowed' : ''
                    }`}>
                    {!friendStatus ? 'Add friend' : friendStatus === 'sent' ? 'Request sent' : 'Friend'}
                  </button>
                  <button
                    onClick={handleOpenChat} // Ouvrir le chat
                    className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <DetailsPlayer
                bio={profile.bio}
                dateRegisterd={profile.dateRegistered}
                birthDate={profile.birthDate}
                fullName={profile.fullName}
                sport={profile.sport.title}
                location={profile.location.city}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Afficher la fenêtre de chat si un joueur est actif */}
      {activePlayer && (
        <ChatMessage
          player={activePlayer}
          handleChat={() => setActivePlayer(null)} // Fermer le chat
        />
      )}
    </div>
  );
};

export default ProfilePlayer;
