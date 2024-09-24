'use client'
import React from 'react';

const ProfileHeader = ({ userData, sport, handleOpenModal }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={userData?.picture}
        className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
        alt="User Profile"
      />
      <h1 className="text-xl font-bold">{userData?.fullName}</h1>
      <p className="text-gray-700">{sport ? sport : 'Loading sport...'}</p>
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <button
          onClick={handleOpenModal}
          className="bg-yellow-300 hover:bg-yellow-400 text-black py-2 px-4 rounded"
        >
          Edit profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
