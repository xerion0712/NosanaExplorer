import { Client } from '@nosana/sdk';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
const wallet: Ref<Keypair | null> = ref(null);
const secretKey: Ref<string | null> = useLocalStorage('secretKey', null);
const config = useRuntimeConfig();

export function setWallet(keypair: Keypair): void {
  wallet.value = keypair;
  secretKey.value = bs58.encode(keypair.secretKey);
}

const nosana = computed(() => {
  return new Client({
    solana: {
      network:
        'https://rpc-devnet.hellomoon.io/853e30f5-383d-4cc6-a5ee-b5fb4c7a7178',
      jobs_address: 'nosJTmGQxvwXy23vng5UjkTbfv91Bzf9jEuro78dAGR',
      wallet: wallet.value ? wallet.value : null,
    },
    ipfs: {
      jwt: config.public.ipfsJwt as string,
    },
  });
});
export const useSDK = () => {
  return { nosana, setWallet, wallet, secretKey };
};
