import { useState, useEffect } from 'react';
import Events from './components/Events.jsx';
import Hero from './components/Hero.jsx';
import ViewAllJobs from './components/ViewAllJobs.jsx';
import Newsletter from './components/Newsletter.jsx';
import Footer from './components/footer.jsx';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Initial splash loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Trigger events re-fetch
  const fetchEvents = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading TECHEVES...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">TECHEVES</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#events" className="text-gray-700 hover:text-blue-600">Events</a>
              <a href="#communities" className="text-gray-700 hover:text-blue-600">Communities</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Submit Event
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* ✅ SINGLE HERO */}
        <Hero
          title="Tech Events in Ethiopia"
          subtitle="Curated from top Telegram channels"
          onGetUpdates={fetchEvents}
        />

        {/* Events Section */}
        <div id="events">
          <Events refreshKey={refreshKey} />
        </div>

        {/* Newsletter */}
        <div id="subscribe" className="container mx-auto px-4 py-16">
          <Newsletter />
        </div>

        <ViewAllJobs />
      </main>

      <Footer />
    </div>
  );
};

export default App;
