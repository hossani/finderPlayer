import React from 'react'

const ProfileAbout = ({userData,sport,location}) => {

  return (
    <>
      <h2 className="text-xl font-bold mb-4">About Me</h2>
      <p className="text-gray-700 mb-8">
       {userData.bio}
      </p>
     
      <h2 className="text-xl font-bold mt-6 mb-4">Personal Information</h2>
<div className="mb-6">
<div className="flex justify-between flex-wrap gap-2 w-full mb-4">
<span className="text-gray-700 font-bold">Full name:</span>
<p className="text-gray-700">{userData.fullName}</p>
</div>
<div className="flex justify-between flex-wrap gap-2 w-full mb-4">
<span className="text-gray-700 font-bold">Date of Birth:</span>
<p className="text-gray-700">{userData.birthDate.slice(0,10)}</p>
</div>
<div className="flex justify-between flex-wrap gap-2 w-full mb-4">
<span className="text-gray-700 font-bold">Location:</span>
<p className="text-gray-700">{location ? `${location}, Morocco` : 'Loading location...'}</p>
</div>
<div className="flex justify-between flex-wrap gap-2 w-full mb-4">
<span className="text-gray-700 font-bold">Main Sport:</span>
<p className="text-gray-700">{sport ? sport : 'Loading sport...'}</p>
</div>
<div className="flex justify-between flex-wrap gap-2 w-full">
<span className="text-gray-700 font-bold">Date of registration:</span>
<p className="text-gray-700">{userData.dateRegistered.slice(0,10)}</p>
</div>
</div>

    </>
  )
}

export default ProfileAbout