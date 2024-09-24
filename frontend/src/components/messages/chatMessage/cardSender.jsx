import React from 'react'

const CardSender = ( {message}) => {
  return (
    <div className="mb-2 text-right">
          <p className="bg-yellow-300 text-black rounded-lg py-2 px-4 inline-block">
            {message}
          </p>
        </div>
  )
}

export default CardSender