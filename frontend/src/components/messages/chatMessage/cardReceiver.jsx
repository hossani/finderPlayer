import React from 'react'

const CardReceiver = ( {message}) => {
  return (
    <div className="mb-2">
    <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
    {message}
    </p>
  </div>
  )
}

export default CardReceiver