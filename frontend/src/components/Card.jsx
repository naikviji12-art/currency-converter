import React, { useState } from 'react';

const cardBaseStyle = {
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: '448px',
  margin: '0 auto',
  padding: 'clamp(24px, 5vw, 32px)',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  borderRadius: '16px',
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.08))',
  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.28)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  overflow: 'hidden',
  animation: 'fade-in 0.5s ease both',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
};

const cardHoverStyle = {
  transform: 'translateY(-2px)',
  borderColor: 'rgba(255, 255, 255, 0.34)',
  boxShadow: '0 26px 60px rgba(0, 0, 0, 0.34)',
};

const accentStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '3px',
  background: 'linear-gradient(90deg, #60a5fa, #a855f7, #4ade80)',
};

const Card = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ ...cardBaseStyle, ...(isHovered ? cardHoverStyle : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={accentStyle} />
      {children}
    </div>
  );
};

export default Card;
