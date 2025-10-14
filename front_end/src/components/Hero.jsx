import React from 'react'
import Card from './Card'
const Hero = ({title, subtitle}) => {
  return (
    // hero
    <section className="bg-gray-600 py-20 mb-4">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <div className="text-center">
          <Card>
            <h1
            className="text-4xl font-extrabold text-gray-400 sm:text-5xl md:text-6xl"
          >
            {title}
          </h1>
          </Card>
          <p className="my-4 text-xl text-white">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero