
# KE Import Radar

Predictive intelligence dashboard for Kenya's used car import market.

## Features

- Cloudflare Worker edge runtime
- Live simulated market engine
- Momentum scoring
- Dark-mode Bloomberg/NSE style dashboard
- API endpoint
- Responsive UI
- Real-time simulated updates

## Project Structure

```bash
ke-import-radar/
├── src/
│   └── index.js
├── public/
├── wrangler.toml
└── README.md
```

## Install

```bash
npm install -g wrangler
```

## Login to Cloudflare

```bash
wrangler login
```

## Run Locally

```bash
wrangler dev
```

## Deploy

```bash
wrangler deploy
```

## API Endpoint

```bash
/api/models
```

Returns simulated live import market data.

## Future Extensions

- Japanese auction scraper
- Shipping intelligence feeds
- Mombasa port tracking
- ML forecasting engine
- Dealer inventory ingestion
- Social demand NLP signals
- PostgreSQL / D1 persistence
- WebSocket live feeds
