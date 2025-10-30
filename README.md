# Solana Token Creation

A simple JavaScript implementation for creating SPL tokens on Solana blockchain.

## Features

- Create/Load wallet
- Request SOL airdrop on devnet
- Create token mint
- View token on Solana Explorer

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

Clone the repository:
```bash
git clone <your-repo-url>
cd solana-token-creation
```

Install dependencies:
```bash
npm install
```

## Usage

Run the script:
```bash
node index.js
```

## Output

The script will:
1. Create a new wallet (or load existing one from wallet.json)
2. Request SOL airdrop on devnet if balance is low
3. Create a token mint with 9 decimals
4. Display the mint address and explorer link

## Tech Stack

- @solana/web3.js
- @solana/spl-token
- Node.js

## Learning Journey

Part of my Web3 learning journey with Harkirat's cohort.

## License

MIT
