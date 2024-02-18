import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  clusterApiUrl,
  Keypair,
  TransactionInstruction,
} from '@solana/web3.js';
import 'dotenv/config';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';

const payer = getKeypairFromEnvironment('SECRET_KEY');
const connection = new Connection(clusterApiUrl('devnet'));

console.log('Before airdrop');
console.log(await connection.getBalance(payer.publicKey));

// await connection.requestAirdrop(payer.publicKey, 2 * LAMPORTS_PER_SOL);

console.log('After airdrop');
console.log(await connection.getBalance(payer.publicKey));

await pingProgram(connection, payer);

//  3. Ping Program
// Now create an async function called `pingProgram()` with two parameters requiring a connection and payer’s keypair as arguments:

async function pingProgram(connection: Connection, payer: Keypair) {
  console.log(payer.publicKey.toBase58());

  const transaction = new Transaction();

  const PING_PROGRAM_ADDRESS = new PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa');
  const PING_PROGRAM_DATA_ADDRESS = new PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod');

  const programId = new PublicKey(PING_PROGRAM_ADDRESS);
  const programDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);

  console.log('System program ID', SystemProgram.programId);

  const instructons = new TransactionInstruction({
    keys: [
      {
        pubkey: programDataId,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
  });

  // const sendSolInstructions = SystemProgram.transfer({
  //   fromPubkey: payer.publicKey,
  //   toPubkey: PING_PROGRAM_ADDRESS,
  //   lamports: 0.1 * LAMPORTS_PER_SOL,
  // });

  transaction.add(instructons);

  const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);
  console.log(signature);
}
