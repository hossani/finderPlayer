'use client'
import api from '@/util/api';
import React, { useContext, useEffect, useState } from 'react'
import LoadingBall from '../general/loading/loadingBall';
import Error from '../general/error/error';
import AuthContext from '@/contextAPI/authContext';
import { initSocket } from '@/util/socket';
const DetailsEvent = ({eventID,ownerID}) => {

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {auth}=useContext(AuthContext);
  const [messageError,setMessageError]=useState(false);
  const [messageSuccess,setMessageSuccess]=useState(false);
const [socket,setSocket]=useState('');

  useEffect(() => {
    const socketInstance=initSocket();
    socketInstance.emit('open_chat', {userId:localStorage.getItem('userId'),playerId:ownerID});
    setSocket(socketInstance);
    if (eventID) {
      const fetchEvent = async () => {
        try {
          const response = await api.get(`/api/announcements/${eventID}`);
          setEvent(response.data.announce);
          setLoading(false);
        } catch (err) {
          setError(err.response?.data?.message||'Something went wrong.');
          setLoading(false);
        }
      };
      fetchEvent();
    }
    return () => {
      socketInstance.disconnect();
    };
  }, [eventID]);

const joinUs=async()=>{
  try{
    const responseAnnounce =await api.post(`/api/response/${eventID}`,
      {content:"I am interested in the event titled: "+event.title});

      let newMessage = {
        id:'',
        senderId: localStorage.getItem('userId'),
        receiverId: ownerID,
        content: responseAnnounce.data.response.content,
        fullName:'',
        picture:''
      };

    if(responseAnnounce.data.message){
      const response=await api.post('/api/messages',newMessage);
      if(response.data.message && response.data.sender){
        newMessage.fullName=response.data.sender;
        newMessage.picture=response.data.picture;
        newMessage.id=response.data.message.id;
        socket.emit('send_message', newMessage);
        setMessageSuccess('Your request has been sent successfully.')
      }
    }
  }catch(error){
    console.log('Afficher error:',error);
    setMessageError(error.response?.data?.message||"Something went wrong.")
  }
};

  if (loading) return <LoadingBall/>;
  if (error) return <Error error={error}/>;
  if (!event) return <Error error={error}/>;

  return (
<div className="bg-gray-100 min-h-[calc(100vh-66px)]">
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-wrap -mx-4">
      {/* Product Images */}
      <div className="w-full md:w-1/2 px-4 mb-8">
        <img
              src={event.sport.imageUrl}
                        alt="image"
          className="w-full h-auto rounded-lg shadow-md mb-4"
          id="mainImage"
        />

      </div>
      {/* Product Details */}
      <div className="w-full md:w-1/2 px-4 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-2 mt-2">{event.title}</h2>
        <p className="text-green-600 bg-green-300 w-fit px-2 font-bold rounded-md mb-4 text-sm"></p>
        <div className="mb-3">
          <span className="text-lg font-bold mr-2">Publish :</span>
          <span className="  text-gray-700  ">{new Date(event.datePosted).toLocaleDateString()}</span>
        </div>  
        <div className="mb-3">
          <span className="text-lg font-bold mr-2">Deadline :</span>
          <span className=" text-gray-700  ">{new Date(event.deadline).toLocaleDateString()}</span>
        </div>
        <div className="mb-4">
          <span className="text-lg font-bold mr-2">City :</span>
          <span className=" text-gray-700  ">{event.location.city}</span>
        </div>
        <div className="flex items-center mb-4">
         
          <span className="text-lg font-bold">Description</span>
        </div>
        <p className="text-gray-700 mb-6">
        {event.description}
        </p>
    
        <div className="flex space-x-4 mb-3">
          
          <button
          disabled={ownerID==localStorage.getItem('userId')?true:auth?false:true} 
          onClick={ownerID==localStorage.getItem('userId')?'':joinUs}
          className="bg-yellow-300 flex gap-2 items-center text-black px-6 py-2 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          {ownerID==localStorage.getItem('userId')?"Your event":"Join us"} 
          </button>
  
        </div>
                {messageError && <p className="text-red-500 my-4">{messageError}</p>}
                {messageSuccess && <p className="text-green-500 my-4">{messageSuccess}</p>}

      </div>
    </div>
  </div>
</div>
  )
}

export default DetailsEvent;