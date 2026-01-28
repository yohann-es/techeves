import { useEffect, useState, useCallback } from 'react';
import api from "../api.js";
import Card from './Card.jsx';
import EventsList from './EventsList.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

const Events = ({ refreshKey }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [channel, setChannel] = useState('all');

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/events');
      setEvents(response.data.events || []);
    } catch (err) {
      console.error("Error fetching events", err);
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔁 Fetch on load AND when "Get Updates" is clicked
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, refreshKey]);

  // Local filtering
  const filteredEvents =
    channel === 'all'
      ? events
      : events.filter(event => event.channel_username === channel);

  return (
    <section id="events" className="container mx-auto px-4 py-8">

      {/* Loading */}
      {loading && (
        <div className="min-h-[400px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {/* Error */}
      {error && (
        <Card bg="bg-red-50">
          <div className="text-center p-8">
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Error Loading Events
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchEvents}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        </Card>
      )}

      {/* Events */}
      {!loading && !error && (
        <>
          {/* Header */}
          <Card bg="bg-gradient-to-r from-blue-50 to-indigo-50" className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  Tech Events
                </h2>
                <p className="text-gray-600">
                  Curated from top Telegram tech channels
                </p>
              </div>

              {/* Channel Filter */}
              <div className="flex items-center space-x-4">
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="all">All Channels</option>
                  <option value="TechsAfrica">Techs Africa</option>
                  <option value="AlxEthiopiaOfficial">ALX Ethiopia</option>
                  <option value="EthioTechnollogy">Ethio Technology</option>
                  <option value="ethiotech_discussion">EthioTech Discussion</option>
                </select>

                <span className="text-sm text-gray-500">
                  {filteredEvents.length} event
                  {filteredEvents.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </Card>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <Card className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No Events Found</h3>
              <p className="text-gray-500">Try another channel.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventsList key={event.message_id} event={event} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Events;
