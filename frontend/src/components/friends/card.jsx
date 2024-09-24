import React from 'react'
import api from '@/util/api';
import { useRouter } from 'next/navigation';

const CardFriend = ({friend, onDelete}) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/players/${friend.id}`); // Redirige vers la page du joueur
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/players/deleteRelation/${friend.id}`);
      onDelete(friend.id); // Met à jour la liste des amis après la suppression
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className="hover:bg-yellow-200 flex flex-wrap items-center cursor-pointer shadow-[0_2px_6px_-1px_rgba(0,0,0,0.3)] rounded-lg w-full p-4"
    >
      <img src={friend.picture} className="w-10 h-10 rounded-full" />
      <div className="ml-4 flex-1">
        <p className="text-sm text-gray-800 font-semibold">{friend.fullName}</p>
        <p className="text-xs text-gray-500 mt-0.5">Sport : {friend.sport.title}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Empêche la redirection lorsqu'on clique sur Delete
          handleDelete();
        }}
        className="bg-red-400 hover:bg-red-500 text-black py-2 px-4 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default CardFriend;
