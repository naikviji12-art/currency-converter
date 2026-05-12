import React from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  height: '88px',
};

const coinWrapStyle = {
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  width: '56px',
  height: '56px',
};

const ringStyle = {
  position: 'absolute',
  inset: 0,
  border: '3px solid rgba(255, 255, 255, 0.24)',
  borderTopColor: '#4ade80',
  borderRightColor: '#60a5fa',
  borderRadius: '999px',
  boxShadow: '0 0 24px rgba(74, 222, 128, 0.28)',
  animation: 'spin 0.9s linear infinite',
};

const iconStyle = {
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  placeItems: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '999px',
  color: '#052e16',
  background: 'linear-gradient(135deg, #bbf7d0, #4ade80)',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.65), 0 12px 24px rgba(21, 128, 61, 0.3)',
  animation: 'money-pulse 1.2s ease-in-out infinite',
};

const dotBaseStyle = {
  position: 'absolute',
  width: '7px',
  height: '7px',
  borderRadius: '999px',
  background: '#fde68a',
  boxShadow: '0 0 12px rgba(253, 230, 138, 0.75)',
  animation: 'money-orbit 1.2s ease-in-out infinite',
};

const labelStyle = {
  color: 'rgba(255, 255, 255, 0.72)',
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.02em',
};

const Loader = () => (
  <div style={wrapperStyle}>
    <div style={coinWrapStyle} aria-hidden="true">
      <span style={ringStyle} />
      <span style={{ ...dotBaseStyle, top: '2px', right: '10px' }} />
      <span style={{ ...dotBaseStyle, bottom: '5px', left: '8px', animationDelay: '0.25s' }} />
      <span style={iconStyle}>
        <FaMoneyBillWave size={20} />
      </span>
    </div>
    <span style={labelStyle}>Converting money...</span>
  </div>
);

export default Loader;
