import React from 'react';

const Card = ({ children, bg = 'bg-white', className = '', padding = 'p-6', shadow = 'shadow-lg' }) => {
  return (
    <div className={`${bg} ${padding} rounded-xl ${shadow} transition-all duration-300 hover:shadow-xl ${className}`}>
      {children}
    </div>
  );
};

export default Card;