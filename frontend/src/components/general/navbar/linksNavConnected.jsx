'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LinksNavConnected = () => {
    const currentPath=usePathname();
  return (
    <>

  <li className="group max-lg:border-b max-lg:py-3 relative">
    <Link
      href="/profile"
      className={`${currentPath.startsWith('/profile') || currentPath.startsWith('/myfriends') || 
        currentPath.startsWith('/messages')   ? 'text-yellow-500': 'text-white hover:text-yellow-500 '} text-[15px] block font-bold`}
    >
      Profile
    </Link>
  </li> 
  </> )
}

export default LinksNavConnected;