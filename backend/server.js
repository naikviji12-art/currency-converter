import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;
const API_BASE_URL = process.env.EXCHANGE_API_BASE_URL || 'https://open.er-api.com/v6/latest';
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/convert', async (req, res) => {
  const amount = Number(req.query.amount);
  const from = String(req.query.from || '').trim().toUpperCase();
  const to = String(req.query.to || '').trim().toUpperCase();

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number.' });
  }

  if (!isCurrencyCode(from) || !isCurrencyCode(to)) {
    return res.status(400).json({ error: 'Currency codes must be 3 letters.' });
  }

  if (from === to) {
    return res.json({
      amount,
      from,
      to,
      rate: 1,
      result: roundCurrency(amount),
    });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${from}`);

    if (!response.ok) {
      return res.status(502).json({ error: 'Exchange rate service is unavailable.' });
    }

    const data = await response.json();
    const rate = data?.rates?.[to];

    if (typeof rate !== 'number') {
      return res.status(400).json({ error: `Unsupported currency pair: ${from} to ${to}.` });
    }

    res.json({
      amount,
      from,
      to,
      rate,
      result: roundCurrency(amount * rate),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to convert currency.' });
  }
});

app.listen(PORT, () => {
  console.log(`Currency converter API running on http://localhost:${PORT}`);
});

function isCurrencyCode(value) {
  return /^[A-Z]{3}$/.test(value);
}

function roundCurrency(value) {
  return Number(value.toFixed(2));
}
