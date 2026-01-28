import React from 'react';
import Card from './Card';

const Hero = ({ title, subtitle, onGetUpdates }) => {
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      
      <div className="container relative mx-auto px-4 py-16 text-center">

        <Card className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
          <h1 className="text-4xl md:text-6xl font-black text-white">
            {title}
          </h1>
        </Card>

        <p className="text-xl text-white/90 mb-10">
          {subtitle}
        </p>

        {/* CTA BUTTONS */}
        <div className="flex justify-center gap-4">
          <a
            href="#events"
            className="px-8 py-3 bg-white text-blue-900 font-bold rounded-xl"
          >
            Explore Events
          </a>

          {/* 🔥 THIS IS THE IMPORTANT PART */}
          <button
            onClick={onGetUpdates}
            className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10"
          >
            Get Updates
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;
