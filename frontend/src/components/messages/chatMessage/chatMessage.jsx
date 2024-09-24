'use client'
import React, { useContext, useEffect, useState } from 'react'
import CardSender from './cardSender'
import CardReceiver from './cardReceiver'
import { initSocket } from '@/util/socket'
import AuthContext from '@/contextAPI/authContext'
import api from '@/util/api'
const ChatMessage = ({ player,handleChat }) => {
  // État pour suivre si la barre est ouverte ou fermée
  const [isOpen, setIsOpen] = useState(true);
  const [socket,setSocket]=useState('');
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const {userId, notificationMessage, setNotificationMessage}=useContext(AuthContext);
  const [messageId,setMessageId]=useState('');
  // Fonction pour basculer l'état
  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const socketInstance=initSocket();
    setSocket(socketInstance)
    // Lors de la connexion, on indique que cet utilisateur est en ligne
    socketInstance.emit('open_chat', {userId:localStorage.getItem('userId'),playerId:player.id});

    socketInstance.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setMessageId(data.id);
    });

    const fetchMessages = async () => {
      try {
        const response = await api.get(`/api/messages/${player.id}`); // Requête pour récupérer l'historique et faire mise à jour de seen
        if(response.data.messages)  {
          setMessages(response.data.messages);
          if(notificationMessage.length>0) removeMessageNotification(player.id);
         }
      } catch (error) {
        console.error('Error fetching message history:', error);
      }
    };

    const removeMessageNotification = (senderId) => {
      setNotificationMessage((prevMessages) =>
        prevMessages.filter((notification) => notification.senderId != senderId)
      );
    };
    
     fetchMessages();
    return () => {
      socketInstance.disconnect();
    };
  }, [userId,player]);

  useEffect(()=>{
    const updateSeenMessage = async () => {
      if (messageId) {
        try {
          await api.patch(`/api/messages/checkSeen/${messageId}`);
          setMessageId('');
        } catch (error) {
          console.error('Error updating seen message:', error);
        }
      }
    };
    updateSeenMessage();

  },[messageId])

  const handleSendMessage =async () => {
    if (messageInput.trim() === "") return;

    let newMessage = {
      id:'',
      senderId: userId,
      receiverId: player.id,
      content: messageInput,
      fullName:'',
      picture:''
    };
    const response=await api.post('/api/messages',newMessage);
    if(response.data.message && response.data.sender){
      newMessage.fullName=response.data.sender;
      newMessage.picture=response.data.picture;
      newMessage.id=response.data.message.id;
// Envoyer le message au backend
socket.emit('send_message', newMessage);

// Mettre à jour l'interface utilisateur
setMessages((prevMessages) => [...prevMessages, newMessage]);
setMessageInput("");
    }
  };

  return (
    <>
      <div id="chat-container" className={`fixed bottom-0 right-4 w-96 transition-all duration-300 ${isOpen ? 'h-auto' : ''}`}>
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          {/* En-tête du chat */}
          <div
            onClick={toggleChat} // Bascule l'état du chat lorsque tu cliques sur l'en-tête
            className="px-4 py-1 border-b bg-black text-white rounded-t-lg flex justify-between items-center cursor-pointer"
          >
            {/* Profil Image et Nom d'utilisateur */}
            <div className="flex items-center">
              {/* Image circulaire */}
              <img
                src={player.picture} // Remplace par l'URL de ton image
                alt="User Avatar"
                className="w-12 h-12 rounded-full mr-4"  // Taille de l'image et arrondie
              />
              <p className="text-lg font-semibold">{player.fullName}</p> {/* Nom de l'utilisateur */}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation() // Empêche l'événement de se propager au parent
                handleChat()        // Appelle la fonction de fermeture/gestion du chat
              }}
              id="close-chat"
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Contenu du chat, affiché ou caché selon l'état */}
          {isOpen && (
            <>
              <div id="chatbox" className="p-4 h-80 overflow-y-auto">
                {/* Chat messages */}
               
                {messages.map((msg, index) =>
                  msg.senderId == userId ? (
                    <CardSender key={index} message={msg.content} />
                  ) : (
                    <CardReceiver key={index} message={msg.content} />
                  )
                )}

              </div>

              <div className="p-4 border-t flex">
                <input
                  id="user-input"
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message"
                  className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  id="send-button"
                  onClick={handleSendMessage}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-r-md hover:bg-yellow-500 transition duration-300"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatMessage;
