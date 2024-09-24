'use client'
import Link from 'next/link';
import React from 'react'

const Card = ({event}) => {


  return (
<div className="bg-white grid md:grid-cols-2  items-center shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-2xl max-sm:max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
  <div className="min-h-[180px] h-full">
    <img
      src={event.sport.imageUrl} alt='event'
      className="w-full h-full object-cover"
      style={{ width: "100%", height: "180", objectFit: "cover" }}
    />
  </div>
  <div className="p-6">
    <h3 className="text-xl font-semibold mt-1.5">{event.title}</h3>
    <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
     {event.description}
    </p>
    
    <div className="flex flex-wrap items-center cursor-pointer border border-gray-300 rounded-lg w-full px-4 py-2 mt-5">
      <img
       src={event.user.picture} alt='user'
        className="w-9 h-9 rounded-full"
      />
      <div className="ml-4 flex-1">
        <p className="text-sm text-gray-800 font-semibold">{event.user.fullName}</p>
        <p className="text-xs text-gray-500 mt-0.5">Player of : {event.sport.title}</p>
      </div>
    </div>
    <button
    className='bg-yellow-400 hover:bg-yellow-500 rounded text-black mt-5 p-1.5 pt-0.5 pb-0.5 font-medium text-sm'>
<Link href={`/events/${event.id}/${event.user.id}`} >See more</Link>

    </button>

  </div>
</div>


  )
}

export default Card