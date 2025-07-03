import React from 'react';

const Card = (props) => {
  const { name, group, city, ph1, ph2, index } = props;

  const gowhat = () => {
    window.open(`https://wa.me/${ph1}`, '_blank');
  };

  return (
    <div
      key={index}
      className="relative bg-white shadow-lg rounded-md p-4 w-full max-w-md text-left"
    >
      {/* City in top-right corner */}
      <div className="absolute top-2 right-2 bg-black text-white text-md px-3 py-1 rounded">
        {city ? city : 'Unknown'}
      </div>

      {/* Name */}
      <div className={`font-bold ${name.length > 17 ? 'text-xl' : 'text-2xl'} mb-2`}>
        {name}
      </div>

      {/* Blood Group */}
      <div className="font-semibold mb-2">
        Blood Group: <span className="text-red-600 ml-2">{group}</span>
      </div>

      {/* Phone Numbers */}
      <div className="font-semibold whitespace-pre-line mb-4">
        Phone Numbers:
        {ph1 && `\n${ph1}`}
        {ph2 && `\n${ph2}`}
      </div>

      {/* WhatsApp Button */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
        onClick={gowhat}
      >
        WhatsApp
      </button>
    </div>
  );
};

export default Card;