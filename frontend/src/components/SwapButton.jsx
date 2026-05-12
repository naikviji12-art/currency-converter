import React, { useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const buttonBaseStyle = {
  position: 'relative',
  display: 'inline-flex',
  flex: '0 0 auto',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'end',
  width: '44px',
  height: '44px',
  border: '1px solid rgba(255, 255, 255, 0.28)',
  borderRadius: '999px',
  color: '#fff',
  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(168, 85, 247, 0.95))',
  boxShadow: '0 14px 28px rgba(59, 130, 246, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.28)',
  cursor: 'pointer',
  overflow: 'hidden',
  outline: 'none',
};

const hoverStyle = {
  boxShadow: '0 18px 34px rgba(168, 85, 247, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.36)',
  filter: 'brightness(1.08)',
};

const focusStyle = {
  boxShadow: '0 0 0 3px rgba(96, 165, 250, 0.45), 0 18px 34px rgba(168, 85, 247, 0.34)',
};

const shineStyle = {
  position: 'absolute',
  inset: '1px',
  borderRadius: 'inherit',
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0) 48%)',
  pointerEvents: 'none',
};

const iconWrapStyle = {
  position: 'relative',
  zIndex: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const SwapButton = ({ onClick, isSwapping }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9, rotate: 180 }}
      animate={isSwapping ? { rotate: 180 } : { rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      style={{
        ...buttonBaseStyle,
        ...(isHovered ? hoverStyle : {}),
        ...(isFocused ? focusStyle : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-label="Swap currencies"
    >
      <span style={shineStyle} />
      <span style={iconWrapStyle}>
        <FaExchangeAlt size={20} />
      </span>
    </motion.button>
  );
};

export default SwapButton;
