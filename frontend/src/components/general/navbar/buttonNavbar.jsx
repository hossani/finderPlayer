import Link from 'next/link'
import React from 'react'

const ButtonNavbar = () => {
  return (
    <div className="flex items-center ml-auto space-x-5">

    <Link href='/login'
        className="px-5 py-2.5 rounded-full text-black text-sm tracking-wider font-bold border border-current outline-none bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600">Sign In</Link>
 
 <Link href='/register'
        className="px-5 py-2.5 rounded-full text-black text-sm tracking-wider font-bold border border-current outline-none bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600">Sign Up</Link>
    </div>
  )
}

export default ButtonNavbar