import { PublicKey } from '@solana/web3.js';

export const validateSolWalletAddress = (address: string): boolean => {
  try {
    const publicKey = new PublicKey(address);
    const isValid = PublicKey.isOnCurve(publicKey.toBytes());

    return isValid;
  } catch (error) {
    return false;
  }
};
