'use client'
import React, { useEffect, useState } from 'react'
import Card from './card'
import api from '@/util/api';
import Skeleton from './sekeletton';

const AllEvent = ({ locationId,sportId,date }) => {
  const [events, setEvents] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(false);  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await api.get(`/api/announcements/filteredEvents?locationId=${locationId}&sportId=${sportId}&date=${date}`);      
        setEvents(response.data.announces); 
        setLoading(false);  
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces:', error);
        setError(error.response?.data?.message||'Something went wrong.');
        setLoading(false);
  
      }
    };

    fetchEvents();
  }, [locationId,sportId,date]);


  return (
    <>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {loading ? (
          [1, 2, 3, 4].map((item) => <Skeleton key={item} />)  
        ) : error ? (
          <div>{error}</div>
        ) : (
          events.map((event) => <Card key={event.id} event={event} />)
        )}
      </div>
    </>
  );
  

}

export default AllEvent;