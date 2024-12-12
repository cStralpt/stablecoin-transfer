## Getting Started

This project mainly setup and tested using pnpm.
to install pnpm:
```bash
npm i -g pnpm
```

And, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev 👈pnpm
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tools & Approaches

I use BiomeJS as a linter and formatter to maintain consistent coding styles across the team and ensure good code quality. For the frontend, I work with Next.js, making use of its server-side rendering (SSR) features to create SEO-friendly websites. To speed up development, I use ShadCN-UI to build user-friendly applications. I also use TypeScript to make the code more robust and maintainable, along with Wagmi and viem.js to interact with smart contracts. Additionally, I take the time to understand challenges and plan the best solutions before starting to code.

## Summary:
- ShadCN-UI - UI Component
- NextJS - Frontend
- BiomeJS - Linter & Formatter
- Wagmi and ViemJS - Smart Contract Interactions
- PNPM - package manager

## Faucets
since this project interact with USDC deployed on Avalanche Fuji Testnet, testnet Avax are required in order to use this app.

Avax:
https://faucets.chain.link/fuji

USDC faucets, make sure to choose network Avalanche Fuji:
https://faucet.circle.com/
