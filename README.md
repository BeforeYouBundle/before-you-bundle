# Before You Bundle

A privacy-first Web3 analytics tool to check if wallets are connected before bundling tokens.

![Before You Bundle](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## Features

- **Multi-wallet analysis** - Paste multiple Solana or EVM addresses
- **Connection visualization** - See wallet relationships as a bubble map
- **Privacy-first** - No wallet connect required, runs client-side
- **Clean UI** - Professional dark theme with subtle animations

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/before-you-bundle.git

# Navigate to project
cd before-you-bundle

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion

## Project Structure

```
before-you-bundle/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
├── components/
│   ├── Navbar.tsx      # Navigation bar
│   ├── Hero.tsx        # Hero section
│   ├── WalletInputCard.tsx  # Wallet input
│   ├── Chip.tsx        # Address chips
│   ├── GraphPanel.tsx  # Bubble map visualization
│   ├── PrivacySection.tsx
│   └── Footer.tsx
└── ...config files
```

## Privacy

- We do not display internal system wallets
- Analysis runs entirely client-side
- No data is sent to any server
- No wallet connection required

## License

MIT
