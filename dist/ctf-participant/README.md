# Butler Hard — Participant bundle

This bundle contains the Solidity sources and a minimal Hardhat setup to let participants run the challenge locally.

Quick start:
1) Install dependencies

```powershell
npm install
```

2) Start a local node and deploy

```powershell
npx hardhat node
node scripts/deploy.js
```

3) Inspect `contracts/` and craft an exploit to make `Setup.isSolved()` return true.

Notes for organizers: The participant bundle intentionally excludes operator-only files (server, secrets, validator) and any solution tests.
