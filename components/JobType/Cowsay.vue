<template>
  <div>
    <div class="field">
      <label class="label">What does the cow say?</label>
      <div class="control">
        <textarea
          v-model="cowsayCommand"
          class="textarea"
          placeholder="Textarea"
        ></textarea>
      </div>
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-secondary" @click="submitJob">Submit</button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import getWAPMUrlForCommandName from '../../services/wapm.js';
const cowsayCommand: Ref<String | null> = ref(null);
const { nosana } = useSDK();
const emit = defineEmits(['submit-job']);

const submitJob = async () => {
  const command = 'cowsay ' + cowsayCommand.value;
  const wasmUrl = await getWAPMUrlForCommandName('cowsay');

  const jsonFlow = {
    state: {
      'nosana/type': 'wasm',
      'nosana/trigger': 'cli',
    },
    ops: [
      {
        op: 'wasm/run',
        id: 'run-from-cli',
        args: {
          cmds: [{ cmd: command }],
          wasm: wasmUrl,
        },
      },
    ],
  };
  const ipfsHash = await nosana.value.ipfs.pin(jsonFlow);
  console.log(`ipfs uploaded:\t${nosana.value.ipfs.config.gateway + ipfsHash}`);
  emit('submit-job', ipfsHash);
};
</script>
<style scoped lang="scss"></style>
