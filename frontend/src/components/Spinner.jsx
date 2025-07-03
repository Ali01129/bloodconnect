import React from 'react';

const Spinner = () => {
  const polylinePoints = "0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24";

  return (
    <div className="flex justify-center items-center my-5">
      <svg width="64" height="48" viewBox="0 0 64 48">
        {/* Back Line - faded red */}
        <polyline
          points={polylinePoints}
          style={{
            fill: 'none',
            stroke: '#ff4d5033',
            strokeWidth: 3,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
        {/* Front Line - animated blood flow */}
        <polyline
          points={polylinePoints}
          style={{
            fill: 'none',
            stroke: '#ff4d4f',
            strokeWidth: 3,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeDasharray: '48, 144',
            strokeDashoffset: 192,
            animation: 'bloodFlow 1.4s linear infinite',
          }}
        />
        {/* Keyframes via <style> tag inside component */}
        <style>{`
          @keyframes bloodFlow {
            72.5% { opacity: 0; }
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
};

export default Spinner;