'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LinksNavNotConnected = () => {
    const currentPath=usePathname();
  return (
    <>

    <li className="max-lg:border-b max-lg:py-3">
    <Link
      href="/"
      className={`${currentPath=='/'? 'text-yellow-500': 'text-white hover:text-yellow-500 '} text-[15px] block font-bold`}
    >
      Home
    </Link>
  </li>
  <li className="group max-lg:border-b max-lg:py-3 relative">
    <Link
      href="/about"
      className={`${currentPath=='/about'? 'text-yellow-500': 'text-white hover:text-yellow-500 '} text-[15px] block font-bold`}
    >
      About
    </Link>
  </li>
  <li className="group max-lg:border-b max-lg:py-3 relative">
    <Link
      href="/contact"
      className={`${currentPath=='/contact'? 'text-yellow-500': 'text-white hover:text-yellow-500 '} text-[15px] block font-bold`}
    >
      Contact
    </Link>
  </li> 
  <li className="group max-lg:border-b max-lg:py-3 relative">
    <Link
      href="/events"
      className={`${currentPath.startsWith('/events')? 'text-yellow-500': 'text-white hover:text-yellow-500 '} text-[15px] block font-bold`}
    >
      Events
    </Link>
  </li> 
  <li className="group max-lg:border-b max-lg:py-3 relative">
    <Link
      href="/players"
      className={`${currentPath.startsWith('/players') ? 'text-yellow-500': 'text-white hover:text-yellow-500 '} text-[15px] block font-bold`}
    >
      Players
    </Link>
  </li> 
  </> )
}

export default LinksNavNotConnected