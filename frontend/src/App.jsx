import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaMoon, FaSun } from 'react-icons/fa';
import Card from './components/Card';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import SwapButton from './components/SwapButton';
import CurrencyDropdown from './components/CurrencyDropdown';
import Result from './components/Result';
import RecentConversions from './components/RecentConversions';

const CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'INR', 'CAD', 'AUD', 'CHF', 'CNY', 'SGD', 'ZAR', 'BRL', 'RUB', 'KRW', 'MXN', 'HKD', 'SEK', 'NZD', 'TRY', 'PLN'
];

const shellBaseStyle = {
  position: 'relative',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  padding: '32px 16px',
  transition: 'background 0.5s ease',
};

const lightShellStyle = {
  background: 'radial-gradient(circle at top left, rgba(96, 165, 250, 0.36), transparent 34%), linear-gradient(135deg, #1e3a8a, #581c87 52%, #312e81)',
};

const darkShellStyle = {
  background: 'radial-gradient(circle at top left, rgba(74, 222, 128, 0.18), transparent 34%), linear-gradient(135deg, #020617, #111827 52%, #1e1b4b)',
};

const backgroundStyle = {
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.32), rgba(168, 85, 247, 0.24), rgba(74, 222, 128, 0.16))',
  backgroundSize: '220% 220%',
  animation: 'gradient-move 8s ease infinite',
};

const textureStyle = {
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  opacity: 0.32,
  backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
  backgroundSize: '44px 44px',
  maskImage: 'radial-gradient(circle at center, black, transparent 72%)',
  pointerEvents: 'none',
};

const themeButtonBaseStyle = {
  position: 'absolute',
  top: '24px',
  right: '24px',
  zIndex: 2,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '42px',
  height: '42px',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  borderRadius: '999px',
  color: '#facc15',
  background: 'rgba(255, 255, 255, 0.16)',
  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.26)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
};

const themeButtonHoverStyle = {
  transform: 'translateY(-1px)',
  background: 'rgba(255, 255, 255, 0.28)',
  boxShadow: '0 16px 34px rgba(0, 0, 0, 0.32)',
};

const headerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '24px',
  textAlign: 'center',
};

const iconBadgeStyle = {
  display: 'grid',
  placeItems: 'center',
  width: '58px',
  height: '58px',
  borderRadius: '18px',
  color: '#052e16',
  background: 'linear-gradient(135deg, #bbf7d0, #4ade80)',
  boxShadow: '0 18px 35px rgba(21, 128, 61, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.58)',
  animation: 'bounce 1.8s infinite',
};

const titleStyle = {
  margin: '4px 0 0',
  color: '#fff',
  fontSize: 'clamp(28px, 7vw, 34px)',
  fontWeight: 850,
  lineHeight: 1.05,
};

const subtitleStyle = {
  margin: 0,
  maxWidth: '320px',
  color: 'rgba(255, 255, 255, 0.72)',
  fontSize: '14px',
  lineHeight: 1.55,
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const amountBaseStyle = {
  width: '100%',
  minHeight: '48px',
  padding: '10px 16px',
  border: '1px solid rgba(255, 255, 255, 0.26)',
  borderRadius: '12px',
  color: 'rgba(255, 255, 255, 0.95)',
  background: 'rgba(255, 255, 255, 0.16)',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 10px 22px rgba(0, 0, 0, 0.12)',
  fontSize: '18px',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
};

const inputActiveStyle = {
  borderColor: '#60a5fa',
  background: 'rgba(255, 255, 255, 0.22)',
  boxShadow: '0 0 0 3px rgba(96, 165, 250, 0.35), 0 14px 26px rgba(0, 0, 0, 0.18)',
};

const convertButtonBaseStyle = {
  position: 'relative',
  width: '100%',
  marginTop: '8px',
  padding: '12px 18px',
  border: '1px solid rgba(255, 255, 255, 0.24)',
  borderRadius: '12px',
  color: '#fff',
  background: 'linear-gradient(135deg, #2563eb, #9333ea)',
  boxShadow: '0 16px 32px rgba(37, 99, 235, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.28)',
  fontSize: '18px',
  fontWeight: 800,
  overflow: 'hidden',
  cursor: 'pointer',
  outline: 'none',
  transition: 'filter 0.2s ease, box-shadow 0.2s ease',
};

const convertButtonActiveStyle = {
  filter: 'brightness(1.08)',
  boxShadow: '0 20px 38px rgba(147, 51, 234, 0.34), 0 0 0 3px rgba(96, 165, 250, 0.28)',
};

const buttonShineStyle = {
  position: 'absolute',
  inset: '1px',
  borderRadius: 'inherit',
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.28), transparent 44%)',
  pointerEvents: 'none',
};

const footerStyle = {
  position: 'relative',
  zIndex: 1,
  marginTop: '28px',
  color: 'rgba(255, 255, 255, 0.46)',
  fontSize: '12px',
  textAlign: 'center',
};

const App = () => {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recent, setRecent] = useState([]);
  const [isSwapping, setIsSwapping] = useState(false);
  const [dark, setDark] = useState(false);
  const [isNarrow, setIsNarrow] = useState(() => window.innerWidth <= 520);
  const [themeHovered, setThemeHovered] = useState(false);
  const [amountFocused, setAmountFocused] = useState(false);
  const [amountHovered, setAmountHovered] = useState(false);
  const [convertHovered, setConvertHovered] = useState(false);
  const [convertFocused, setConvertFocused] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsNarrow(window.innerWidth <= 520);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConvert = async () => {
    setError('');
    setResult(null);
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/convert', {
        params: { amount, from, to }
      });
      setResult(res.data.result);
      setRecent([{ amount, from, to, result: res.data.result }, ...recent.slice(0, 4)]);
    } catch (err) {
      setError('Failed to fetch conversion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setFrom(to);
      setTo(from);
      setIsSwapping(false);
    }, 350);
  };

  const currencyRowStyle = {
    display: 'grid',
    gridTemplateColumns: isNarrow ? '1fr' : 'minmax(0, 1fr) 44px minmax(0, 1fr)',
    alignItems: isNarrow ? 'stretch' : 'end',
    gap: isNarrow ? '12px' : '8px',
  };

  return (
    <div style={{ ...shellBaseStyle, ...(dark ? darkShellStyle : lightShellStyle) }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={backgroundStyle}
      />
      <div style={textureStyle} />
      <button
        style={{ ...themeButtonBaseStyle, ...(themeHovered ? themeButtonHoverStyle : {}) }}
        onClick={() => setDark((d) => !d)}
        onMouseEnter={() => setThemeHovered(true)}
        onMouseLeave={() => setThemeHovered(false)}
        aria-label="Toggle dark mode"
      >
        {dark ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
      <Card>
        <div style={headerStyle}>
          <span style={iconBadgeStyle}>
            <FaMoneyBillWave size={30} />
          </span>
          <h1 style={titleStyle}>Currency Converter</h1>
          <p style={subtitleStyle}>Convert currencies instantly with real-time rates</p>
        </div>
        <form
          style={formStyle}
          onSubmit={e => { e.preventDefault(); handleConvert(); }}
        >
          <input
            type="number"
            min="0"
            step="any"
            placeholder="Enter amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            onFocus={() => setAmountFocused(true)}
            onBlur={() => setAmountFocused(false)}
            onMouseEnter={() => setAmountHovered(true)}
            onMouseLeave={() => setAmountHovered(false)}
            style={{
              ...amountBaseStyle,
              ...((amountFocused || amountHovered) ? inputActiveStyle : {}),
            }}
          />
          <div style={currencyRowStyle}>
            <CurrencyDropdown
              label="From"
              value={from}
              onChange={e => setFrom(e.target.value)}
              options={CURRENCIES}
              name="from-currency"
            />
            <SwapButton onClick={handleSwap} isSwapping={isSwapping} />
            <CurrencyDropdown
              label="To"
              value={to}
              onChange={e => setTo(e.target.value)}
              options={CURRENCIES}
              name="to-currency"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            style={{
              ...convertButtonBaseStyle,
              ...((convertHovered || convertFocused) ? convertButtonActiveStyle : {}),
            }}
            onMouseEnter={() => setConvertHovered(true)}
            onMouseLeave={() => setConvertHovered(false)}
            onFocus={() => setConvertFocused(true)}
            onBlur={() => setConvertFocused(false)}
          >
            <span style={buttonShineStyle} />
            <span style={{ position: 'relative', zIndex: 1 }}>Convert</span>
          </motion.button>
        </form>
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {result && !loading && !error && (
          <Result result={result} from={from} to={to} amount={amount} />
        )}
        {recent.length > 0 && <RecentConversions conversions={recent} />}
      </Card>
      <footer style={footerStyle}>
        &copy; {new Date().getFullYear()} Currency Converter. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
