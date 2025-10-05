Publishing Butler Hard on CTFd

1) Deploy the challenge contract to a public RPC (or your CTF network)

- Use the provided `scripts/deploy.js` to deploy the `Setup` contract.
- Example (Hardhat local node):

  # start a local node in another terminal
  npx hardhat node

  # deploy to that node
  npm run deploy

- The deploy script prints the `Setup` address and the Gentleman address.

2) Start the validator service

- The validator endpoints are in `scripts/ctfd_validator.js`.
- Install dependencies if required:

  npm install express body-parser yargs ethers

- Run the validator (example):

  node scripts/ctfd_validator.js --rpc http://127.0.0.1:8545 --setup <SETUP_ADDRESS> --port 3001

- The validator exposes POST /validate that accepts JSON { "flag": "flag{0x...}" }.

3) Add a dynamic challenge in CTFd

- In CTFd Admin -> Challenges -> Add Challenge:
  - Type: Dynamic
  - Name: Butler Hard Challenge
  - Category: Web3
  - Description: Provide a brief description and the hint files (or add them as attachments)
  - Flags: dynamic; format `flag{0x...}`
  - (Optional) Use a custom grader integration: point the grader to your validator service or set up an internal webhook to call the validator endpoint.

4) Testing

- Solve the challenge locally (run exploit/test to confirm) and submit flag to validator to verify it returns valid.

If you want, I can help:
- Create a Dockerfile to run the validator easily
- Create a small CTFd plugin to call the validator automatically
- Produce a clean 'challenge package' zip with only the files you want to publish
