import { useEffect, useState } from 'react';
import api from "../api.js";
import Card from './Card.jsx';
import EventsList from './EventsList.jsx';


/*
 useState for data inside the functinal body and does not interact with the outside
 useEffect for a data/state that intercate to outside entities 

 not sure i understand them yet but i have a vague idea but its beacasue may be
 i have seen them in action properly and know thier diffrence
 
 for more info visit:
https://www.geeksforgeeks.org/reactjs/difference-between-usestate-and-useeffect-hook-in-reactjs/
 */

 const Events = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Convert your object into a list to map over
  const eventArray = Object.values(events);
  const recentEventArray = eventArray.slice(0,6);
  return (
    <>
    <div style={{ padding: '1rem' }}>
        <Card bg='bg-gray-100'>
        <h2 className='text-5xl font-bold text-gray-400' >Events</h2>
      </Card>
      </div>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {recentEventArray.map((event, index) => (
          <EventsList event={event} key={event.database_id}  />
        ))}
      </div>
    
    </>
  );
};

export default Events;

/**
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">

      {eventArray.map((event, index) => (

        <div 
      key={index} 
      className="bg-white rounded-xl shadow-md relative p-4 break-words"
    >
      <div className="text-gray-600 my-2">ALX</div>
      <h3 className="text-xl font-bold mb-3">Hackathon Event</h3>

      <p className="mb-5 whitespace-pre-wrap text-wrap break-words">
        {event.post_info}
      </p>


      <div className="border border-gray-100 mb-5"></div>

      <div className="flex flex-col lg:flex-row justify-between mb-4">
        <div className="text-orange-700 mb-3 flex items-center gap-2">
          <i className="fa-solid fa-location-dot text-lg"></i>
          Telegram
        </div>

        <a
          target="_blank"
          href={event.source_link}
          className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          View Source
        </a>
      </div>
    </div>
      ))}

    </div>
 */















    
/*

<div
          key={index}
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: '#f9f9f9'
          }}
        >
          <p style={{ whiteSpace: 'pre-wrap' }}>{event.post_info}</p>

          <a
            href={event.source_link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '8px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '5px',
              textDecoration: 'none'
            }}
          >
            🔗 View Source
          </a>
        </div>
*/