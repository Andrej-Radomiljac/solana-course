import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { validateSolWalletAddress } from './validate-sol-wallet-address';

// const connection = new Connection(clusterApiUrl('devnet'));

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error('Provide a public key to check the balance of!');
}

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

if (validateSolWalletAddress(suppliedPublicKey)) {
  const address = new PublicKey(suppliedPublicKey);
  const balance = await connection.getBalance(address);
  const balanceInSol = balance / LAMPORTS_PER_SOL;

  console.log(`The balance of the account at ${address} is ${balance} lamports`);
  console.log(`Balance in sol ${balanceInSol}`);
}

console.log(`Wallet address is not valid`);
