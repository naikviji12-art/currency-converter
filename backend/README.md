# Currency Converter Backend

Express API for the currency converter frontend.

## Setup

```bash
npm install
npm run dev
```

The API runs on `http://localhost:5000` by default.

## Endpoints

- `GET /health`
- `GET /convert?amount=100&from=USD&to=EUR`

Example response:

```json
{
  "amount": 100,
  "from": "USD",
  "to": "EUR",
  "rate": 0.92,
  "result": 92
}
```
