import FriendRequest from '@/components/notification/friendRequest';
import React, { useState } from 'react'

const NotificationAndMessage = () => {

  const [notificationOpen, setNotificationOpen] = useState(false); // Ajouter un état pour la notification

  return (
<div className="flex items-center ml-auto space-x-8">
      {/* Notification Icon */}
      <span className="relative" onClick={() => setNotificationOpen(!notificationOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          className="cursor-pointer fill-[#fff] hover:fill-[#fbff00] inline-block"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2C8.69 2 6 4.69 6 8v5.59l-1.29 1.29A1 1 0 0 0 5 16v1h14v-1a1 1 0 0 0-.29-.71L18 13.59V8c0-3.31-2.69-6-6-6zm1 17h-2v1c0 1.1.9 2 2 2s2-.9 2-2v-1z"
          />
        </svg>
        <span className="absolute left-auto -ml-1 -top-1 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
          0
        </span>
      </span>

      {notificationOpen && (
          <FriendRequest />
      )}
      {/* Mail Icon */}
      <span className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          className="cursor-pointer fill-[#fff] hover:fill-[#fbff00] inline-block"
          viewBox="0 0 512 512"
        >
          <path
            d="M502.3 190.8l-230-160a48 48 0 0 0-52.6 0l-230 160A48 48 0 0 0 0 232.7V392c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V232.7c0-16.7-8.3-32.4-21.7-41.9zM464 392H48V232.7L256 95.1l208 137.6V392zm-208-208L53.3 217.3 256 329.9l202.7-112.6L256 184z"
          />
        </svg>
        <span className="absolute left-auto -ml-1 -top-1 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
          0
        </span>
      </span>

     
    </div>  )
}

export default NotificationAndMessage