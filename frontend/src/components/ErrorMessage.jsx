import React from 'react';

const errorStyle = {
  position: 'relative',
  marginTop: '16px',
  padding: '13px 16px 13px 18px',
  border: '1px solid rgba(248, 113, 113, 0.45)',
  borderRadius: '10px',
  color: '#fee2e2',
  background: 'linear-gradient(135deg, rgba(127, 29, 29, 0.62), rgba(185, 28, 28, 0.36))',
  boxShadow: '0 12px 26px rgba(127, 29, 29, 0.22)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  animation: 'fade-in 0.5s ease both',
  overflow: 'hidden',
};

const accentStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  width: '4px',
  background: 'linear-gradient(180deg, #fb7185, #ef4444)',
};

const messageStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: 1.45,
};

const ErrorMessage = ({ message }) => (
  <div style={errorStyle}>
    <span style={accentStyle} />
    <span style={messageStyle}>{message}</span>
  </div>
);

export default ErrorMessage;
