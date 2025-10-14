import { useState } from "react"

/*

two types of state according to the video 
component state and 
app state


memoize // might have to research about it
import React, { memo } from 'react';

const EventsList = memo(({ event }) => { ... });

use a react link tag instead of the normal a tag
(because the a tag does a complete page refresh but the link tags does some thing else
  )

*/

const EventsList = ({event}) => {
  const [ShowFullDescription, setShowFullDescription] = useState(false);

  let eventDiscription = event.post_info;

  if(!ShowFullDescription){
    eventDiscription = eventDiscription.substring(0,90) + '...'
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-md relative p-4 break-words"
    >
      <div className="text-gray-600 my-2">ALX</div>
      <h3 className="text-xl font-bold mb-3">Hackathon Event</h3>

      <p className="mb-5 whitespace-pre-wrap text-wrap break-words">
        {eventDiscription}
      </p>

      <button onClick={() => setShowFullDescription(!ShowFullDescription)} className="text-indigo-500 mb-5 hover:text-indigo-600"> 
        {ShowFullDescription ? 'Less' : 'More'} 
        </button>


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
  )
}

export default EventsList