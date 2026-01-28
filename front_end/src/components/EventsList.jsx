import { useState, useMemo, useEffect } from "react";
import Card from "./Card.jsx";

const EventsList = ({ event }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Debug: log the event data on mount
  useEffect(() => {
    console.log("Event received:", event);
    console.log("Event image string (first 100 chars):", event.message_image?.substring(0, 100));
  }, [event]);

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Truncate description
  const truncatedDescription = useMemo(() => {
    if (!event.message_info) return '';
    if (showFullDescription) return event.message_info;
    return event.message_info.length > 150 
      ? event.message_info.substring(0, 150) + '...'
      : event.message_info;
  }, [event.message_info, showFullDescription]);

  // Event type colors
  const getEventTypeColor = (type) => {
    const colors = {
      hackathon: 'bg-purple-100 text-purple-800',
      meetup: 'bg-green-100 text-green-800',
      conference: 'bg-blue-100 text-blue-800',
      workshop: 'bg-yellow-100 text-yellow-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colors[type?.toLowerCase()] || colors.default;
  };

  return (
    <Card className="h-full flex flex-col hover:transform hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      {event.message_image && !imageError ? (
        <div className="w-full h-48 mb-4 rounded-xl overflow-hidden">
          <img
            src={`data:image/jpeg;base64,${event.message_image}`}
            alt={event.message_info?.split('\n')[0] || "Event image"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={() => {
              console.warn("Image failed to load for event:", event.message_info?.split('\n')[0]);
              setImageError(true);
            }}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
      )}

      {/* Event Type & Date */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEventTypeColor(event.event_type)}`}>
          {event.event_type || 'Tech Event'}
        </span>
        <span className="text-sm text-gray-500">
          <i className="far fa-calendar-alt mr-1"></i>
          {formatDate(event.message_date)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
        {event.message_info?.split('\n')[0] || 'Untitled Event'}
      </h3>

      {/* Description */}
      <div className="flex-grow mb-4">
        <p className="text-gray-600 whitespace-pre-wrap line-clamp-4">
          {truncatedDescription}
        </p>
        {event.message_info && event.message_info.length > 150 && (
          <button 
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm mt-2 flex items-center gap-1"
          >
            {showFullDescription ? (
              <>Show Less <i className="fas fa-chevron-up text-xs"></i></>
            ) : (
              <>Read More <i className="fas fa-chevron-down text-xs"></i></>
            )}
          </button>
        )}
      </div>

      <div className="border-t border-gray-100 my-4"></div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
        <div className="flex items-center text-gray-700">
          <i className="fas fa-map-marker-alt mr-2 text-blue-500"></i>
          <span className="text-sm">{event.source_channel || 'Online'}</span>
        </div>
        
        <div className="flex items-center space-x-3">
          {event.source_link && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={event.source_link}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium text-sm flex items-center gap-2"
            >
              <i className="fas fa-external-link-alt"></i>
              Join Event
            </a>
          )}
          
          {event.register_link && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={event.register_link}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
            >
              Register
            </a>
          )}
        </div>
      </div>

      {/* Tags */}
      {event.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          {event.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
};

export default EventsList;
