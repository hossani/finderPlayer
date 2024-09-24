'use client'
import React from 'react'
const Cardmessage = ({content,fullName,picture,onClick, conversationId, otherUserId, onDelete }) => {
  
  const handleDeleteMessages = async () => {
    try {
      // Appel API pour supprimer les messages
      await api.delete(`/api/messages/deleteMessagesBetweenUsers/${otherUserId}`);
      // Appel d'une fonction pour actualiser la liste des conversations
      onDelete(conversationId);
    } catch (error) {
      console.error('Erreur lors de la suppression des messages:', error);
    }
  };


  return (
    <>
    <div  onClick={onClick}
     className="relative border border-gray-200 hover:bg-yellow-300 rounded-lg shadow-lg cursor-pointer">
    <button
    onClick={(e)=>{
      e.stopPropagation();
      handleDeleteMessages();
    }}
      className="absolute p-1 bg-gray-100 border hover:bg-red-400  border-gray-300 rounded-full -top-1 -right-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
    <div className="flex items-center p-4">
      <img
        className="object-cover w-12 h-12 rounded-lg"
        src={picture}
        alt=""
      />
      <div className="ml-3 overflow-hidden">
        <p className="font-medium text-gray-900">{fullName}</p>
        <p className="max-w-xs text-sm text-gray-500 truncate">
          Message: {content}
        </p>
      </div>
    </div>
  </div>
</>
  )
}

export default Cardmessage;