<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card has-border-radius">
      <section v-if="keypair" class="modal-card-body">
        <h3 class="title is-4">Succesfully generated a keypair</h3>
        <p>
          You'll find your keypair down below. We also airdropped some (devnet)
          $SOL so you can get started right away!
        </p>
        <br />
        <p>
          Before you continue make sure you saved your private key, you will
          need it to access your funds later.
        </p>
        <div class="notification mt-3">
          <span class="is-size-7">Public key</span> <br />
          <code class="px-4 py-3">{{ keypair?.publicKey.toString() }}</code
          ><br />
          <span class="is-size-7">Private key</span> <br />
          <code class="px-4 py-3">{{ bs58.encode(keypair.secretKey) }}</code>
        </div>
      </section>
      <footer class="modal-card-foot is-flex is-justify-content-flex-end">
        <button
          class="button is-primary px-6"
          @click.prevent="$emit('login', keypair?.secretKey)"
        >
          I understand
        </button>
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
import bs58 from 'bs58';
import { Keypair } from '@solana/web3.js';

defineProps({
  keypair: {
    type: Keypair,
    default: null,
  },
});
</script>
<style lang="scss" scoped>
.modal-card-body {
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}

.modal-card-foot {
  padding: 1.5rem 2rem;
}
.modal-card-body {
  padding: 2rem;
}
</style>
