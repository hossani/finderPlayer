import React from 'react'
import Cardmessage from './cards'

const ListeMessages = ({ onChat,conversations,setConversations  }) => {
  const handleDeleteConversation = (conversationId) => {
    // Mettre à jour l'état pour supprimer la conversation de la liste
    setConversations((prevConversations) =>
      prevConversations.filter((conversation) => conversation.id != conversationId)
    );
  };
  return (
    <div className="flex flex-col gap-3">
   {conversations.map(conversation => (
        <Cardmessage
          key={conversation.id} // Unique key based on user ID
          content={conversation.content}
          fullName={conversation.fullName}
          picture={conversation.picture}
          onClick={() => onChat(conversation)} // Gérer le clic pour ouvrir le chat
          conversationId={conversation.id}
          otherUserId={conversation.id} // Assurez-vous que cet ID est celui de l'autre utilisateur
          onDelete={handleDeleteConversation} // Gérer la suppression
        />
      ))}

</div>

  )
}

export default ListeMessages