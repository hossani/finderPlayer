'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const LinksTabs = () => {
    const currentPath=usePathname();
  return (
    <>
    <Link
    href='/profile'
    className={`${currentPath=='/profile'?'bg-yellow-400 visited:text-black' : 'bg-gray-200 text-gray-600'} tab  font-bold  text-center text-sm py-3 px-6 rounded-tl-2xl rounded-tr-2xl cursor-pointer`}
  >
    Profile
  </Link>
  <Link
    href='/myfriends'
    className={`${currentPath=='/myfriends'?'bg-yellow-400 visited:text-black' : 'bg-gray-200 text-gray-600'} tab  font-bold  text-center text-sm py-3 px-6 rounded-tl-2xl rounded-tr-2xl cursor-pointer`}
  >
    Friends
  </Link>
  <Link
    href='/messages'
    className={`${currentPath=='/messages'?'bg-yellow-400 visited:text-black' : 'bg-gray-200 text-gray-600'} tab  font-bold  text-center text-sm py-3 px-6 rounded-tl-2xl rounded-tr-2xl cursor-pointer`}
  >
    Messages
  </Link>
  </>
 
  )
}

export default LinksTabs