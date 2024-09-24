'use client'
import React, { useEffect, useState } from 'react'
import CardFriend from './card'
import api from '@/util/api';

const FriendsComp = () => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await api.get('/api/players/myFriends');
        setFriends(res.data.friends); 
      } catch (error) {
        console.error("Error fetching friends:", error);
        setError(error.response?.data?.message);
      }
    };

    fetchFriends();
  }, []);

  const handleDelete = (friendId) => {
    setFriends(friends.filter((friend) => friend.id !== friendId)); // Met à jour la liste des amis
  };

  return (
    <div className="flex flex-col gap-3">
      {error && <p className="text-red-500">{error}</p>}
      {friends && friends.map((friend) => (
        <CardFriend key={friend.id} friend={friend} onDelete={handleDelete} /> 
      ))}
    </div>
  );
};

export default FriendsComp;
