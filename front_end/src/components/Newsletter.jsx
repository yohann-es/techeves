import { useState } from 'react';
import Card from './Card';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing:', email);
    setSubscribed(true);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto text-center p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-8">
          Get weekly updates about tech events, hackathons, and meetups happening across Ethiopia.
        </p>
        
        {subscribed ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            <p className="font-medium">Thank you for subscribing! 🎉</p>
            <p className="text-sm">You'll receive our next newsletter.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
        
        <p className="text-sm text-gray-500 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </Card>
  );
};

export default Newsletter;