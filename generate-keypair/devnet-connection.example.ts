import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';

// const connection = new Connection(clusterApiUrl('devnet'));

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error('Provide a public key to check the balance of!');
}

const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

const address = new PublicKey(suppliedPublicKey);
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(`The balance of the account at ${address} is ${balance} lamports`);
console.log(`Balance in sol ${balanceInSol}`);
