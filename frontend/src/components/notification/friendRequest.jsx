'use client'
import React from 'react'
import CardFriend from './cardFriend'

const FriendRequest = ({notifications}) => {
    
  return (
    <>
  {/* component */}
  <div className="flex items-center justify-center bg-gray-100
  absolute top-16 right-0 z-50 rounded-lg 
  ">
    <div className="bg-white rounded-lg shadow-xl border px-8 w-3xl">
 {
    notifications.length>0?
     notifications.map((item)=> <CardFriend key={item.fromUserId} data={item.sender}/>) :
     <div className="p-4 text-center text-gray-500">
     Pas de demandes
   </div>
 }
    </div>
  </div>
</>

  )
}

export default FriendRequest