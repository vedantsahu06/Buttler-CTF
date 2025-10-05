Butler Hard — Challenge brief

Goal
----
Drain all tokens from the on-chain target so that the `Setup.isSolved()` function returns `true`.

Quick start
-----------
1) Install dependencies

```powershell
npm install
```

2) Start a local Hardhat node and deploy

```powershell
npx hardhat node
node scripts/deploy.js
```

3) Use a local script or Hardhat console to craft and deploy exploit contracts. The `Setup` contract deploys three tokens and a Merkle-gated flash loan provider; you must craft an exploit that reduces the `Gentleman`'s three token balances to zero.

Notes
-----
- This package intentionally omits organizer-only artifacts (deploy-time secrets and operator servers). If you are running a CTF instance, the organizer will provide RPC and instance-specific details.
- Read the Solidity sources in `contracts/` for function semantics.

Good luck!
