# Tic-Tac-Toe Frontend (Next.js)

A minimal Next.js app for a Tic-Tac-Toe UI with an Ocean Professional dark theme.

Features:
- App Router (Next.js 14)
- TailwindCSS styling
- Interactive 3x3 grid with PvP and PvC modes (simple AI placeholder)
- Current turn, winner/draw messages, and restart controls
- Scripts bind to 0.0.0.0 and respect the PORT environment variable

## Getting Started

1) Install dependencies
```
npm install
```

2) Run the development server (uses PORT if set, default 3000)
```
npm run dev
```

Open http://localhost:3000 (or your specified PORT)

3) Build and start
```
npm run build
npm start
```

## Acceptance Criteria Mapping

1) package.json exists with scripts that bind to 0.0.0.0 and read PORT.
2) Visiting `/` shows the described UI and a clickable 3x3 grid.
3) No new environment variables introduced.
4) `npm run build` succeeds.
