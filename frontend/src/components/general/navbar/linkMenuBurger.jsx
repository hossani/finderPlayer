'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const LinkMenuBurger = ({isMenuOpen}) => {
    const currentPath=usePathname();
  return (
    <>
    <li className={`group max-lg:border-b max-lg:py-3 relative lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
    <Link
      href="/settings"
      className={`${currentPath.startsWith('/settings')? 'text-yellow-500': 'text-white hover:text-yellow-500 '} text-[15px] block font-bold`}
    >
      Settings
    </Link>
  </li> 
  <li className={`group max-lg:border-b max-lg:py-3 relative lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
  <Link
      href="/"
      className= 'text-red-600 hover:text-red-700 text-[15px] block font-bold'
    >
      LogOut
    </Link>
  </li> 
  </>

  )
}

export default LinkMenuBurger