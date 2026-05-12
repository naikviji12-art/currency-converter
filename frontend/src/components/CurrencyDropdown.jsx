import React, { useState } from 'react';

const wrapperStyle = {
  width: '100%',
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  color: 'rgba(255, 255, 255, 0.82)',
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.01em',
};

const selectBaseStyle = {
  width: '100%',
  minHeight: '42px',
  padding: '9px 40px 9px 14px',
  border: '1px solid rgba(255, 255, 255, 0.26)',
  borderRadius: '10px',
  color: 'rgba(255, 255, 255, 0.94)',
  backgroundColor: 'rgba(255, 255, 255, 0.16)',
  backgroundImage:
    'linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.8) 50%), linear-gradient(135deg, rgba(255, 255, 255, 0.8) 50%, transparent 50%)',
  backgroundPosition: 'calc(100% - 18px) 18px, calc(100% - 12px) 18px',
  backgroundSize: '6px 6px, 6px 6px',
  backgroundRepeat: 'no-repeat',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 10px 22px rgba(0, 0, 0, 0.12)',
  appearance: 'none',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
};

const selectFocusStyle = {
  borderColor: '#60a5fa',
  backgroundColor: 'rgba(255, 255, 255, 0.22)',
  boxShadow: '0 0 0 3px rgba(96, 165, 250, 0.35), 0 14px 26px rgba(0, 0, 0, 0.18)',
  outline: 'none',
};

const selectHoverStyle = {
  borderColor: 'rgba(255, 255, 255, 0.42)',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
};

const optionStyle = {
  color: '#111827',
  backgroundColor: '#fff',
};

const CurrencyDropdown = ({ label, value, onChange, options, name }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={wrapperStyle}>
      <label style={labelStyle} htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          ...selectBaseStyle,
          ...(isHovered ? selectHoverStyle : {}),
          ...(isFocused ? selectFocusStyle : {}),
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} style={optionStyle}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
