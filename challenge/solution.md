# Butler Hard Challenge Solution

This solution is **for admins only**.

1. Obtain a valid flash loan via Merkle proof.
2. Call `Butler.swap()` to initiate a swap.
3. During `tokensReceived` hook of TokenWithHook, call `addLiquidity()` to manipulate reserves.
4. Drain each pool iteratively:
   - Token1/Token2
   - Token1/Token3
   - Token2/Token3
5. Repay flash loan.
6. The final address that executed the exploit is the flag.
