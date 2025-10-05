# Butler Hard CTF Challenge

Welcome to **Butler**, a multi-stage Web3 challenge. Your goal is to **drain all liquidity** from the Butler DEX.

## Scenario

- Butler DEX is deployed with three liquidity pools using:
  1. Token1 (plain ERC20)
  2. Token2 (fee-on-transfer)
  3. Token3 (ERC777-like with tokensReceived hook)

- There is a Merkle-gated flash loan provider supplying Token1.
- Some privileged functions require a **permit signature**, hidden as a puzzle.
- Exploit requires **chaining vulnerabilities**:
  - Reentrancy through TokenWithHook
  - DEX invariant manipulation
  - Flash loan access bypass
  - Optional permit signature abuse

## Objective

Drain all tokens from Butler so that `Setup.isSolved()` returns `true`.

## Flag

The flag is in the format:
## CTFd Publishing Instructions

To publish this challenge on CTFd, follow these steps:
1. Log in to your CTFd admin panel.
2. Navigate to the 'Challenges' section.
3. Click on 'Add Challenge'.
4. Fill in the challenge details:
  - Name: Butler Hard CTF Challenge
  - Description: Drain all tokens from Butler.
  - Category: Web3
5. Set the 'Value' and 'Solves' fields as appropriate.
6. Upload any necessary files or provide hints.
7. Save the challenge.

Make sure to test the challenge before the event starts!

