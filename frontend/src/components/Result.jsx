import React from 'react';
import { motion } from 'framer-motion';

const resultPanelStyle = {
  marginTop: '24px',
  padding: '16px',
  borderRadius: '12px',
  color: '#fff',
  textAlign: 'center',
  background: 'linear-gradient(45deg, rgba(37, 99, 235, 0.8), rgba(147, 51, 234, 0.8))',
  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.25)',
};

const equationStyle = {
  fontSize: '18px',
  fontWeight: 600,
};

const valueStyle = {
  marginTop: '4px',
  fontSize: '30px',
  fontWeight: 700,
};

const Result = ({ result, from, to, amount }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={resultPanelStyle}
  >
    <div style={equationStyle}>{amount} {from} =</div>
    <div style={valueStyle}>{result} {to}</div>
  </motion.div>
);

export default Result;
