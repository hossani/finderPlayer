import { useRouter } from 'next/navigation'
import React from 'react'

const MessageNotiFriend = ({fullName,picture}) => {
  const router=useRouter();
  return (
    <>
    <div
     onClick={()=>router.push('/messages')}
    className="flex justify-center items-center my-6 cursor-pointer">
   <div className="w-1/5">
     <img
       className="w-12 h-12 rounded-full border border-gray-100 shadow-sm"
       src={picture}
       alt="user image"
     />
   </div>
   <div className="w-4/5">
     <div>
       <span className="font-semibold text-gray-800">{fullName}</span>
       <span className="text-gray-400"> sent you a message</span>
     </div>
     {/* <div className="font-semibold">
       <button   onClick={()=>router.push('/messages')}
        className="text-blue-600 mr-2">
         Check
       </button>
       <button
       className="text-gray-400 cursor-pointer">
         Remove
       </button>
     </div> */}
   </div>
 </div>
</>
  )
}

export default MessageNotiFriend