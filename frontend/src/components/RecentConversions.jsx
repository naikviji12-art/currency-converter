import React from 'react';

const containerStyle = {
  marginTop: '24px',
};

const headingStyle = {
  margin: '0 0 8px',
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '18px',
  fontWeight: 600,
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '14px',
};

const resultStyle = {
  fontWeight: 700,
};

const RecentConversions = ({ conversions }) => (
  <div style={containerStyle}>
    <h3 style={headingStyle}>Recent Conversions</h3>
    <ul style={listStyle}>
      {conversions.map((item, idx) => (
        <li key={idx} style={itemStyle}>
          <span>{item.amount} {item.from} -&gt; {item.to}</span>
          <span style={resultStyle}>{item.result}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentConversions;
