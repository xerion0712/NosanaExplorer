<template>
  <div>
    <div class="field">
      <label class="label">What does the cow say?</label>
      <div class="control">
        <textarea
          v-model="cowsayCommand"
          class="textarea"
          placeholder="Moo"
        ></textarea>
      </div>
    </div>
    <div class="field">
      <p class="control">
        <button
          class="button is-secondary"
          :class="{ 'is-disabled': loading }"
          @click="submitJob"
        >
          Submit
        </button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import getWAPMUrlForCommandName from '../../services/wapm.js';
const cowsayCommand: Ref<string | undefined> = ref(undefined);
const { nosana } = useSDK();
const emit = defineEmits(['submit-job']);

const props = defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
});

const submitJob = async () => {
  console.log('submit');
  if (!props.loading) {
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
    emit('submit-job', jsonFlow);
  }
};
</script>
<style scoped lang="scss"></style>
