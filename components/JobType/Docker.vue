<template>
  <div>
    <div class="field">
      <div class="field">
        <label class="label">Docker image</label>
        <div class="control">
          <input
            v-model="image"
            class="input"
            type="text"
            placeholder="Default: ubuntu"
          />
        </div>
      </div>
      <label class="label">Command</label>
      <span>todo make nice command input</span>
      <div class="control">
        <textarea
          v-model="command"
          class="textarea"
          placeholder="echo Hello World!"
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
const command: Ref<String | null> = ref(null);
const image: Ref<String | null> = ref(null);
const { nosana } = useSDK();
const emit = defineEmits(['submit-job']);
const props = defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
});

const submitJob = async () => {
  if (!props.loading) {
    const jsonFlow = {
      state: {
        'nosana/type': 'docker',
        'nosana/trigger': 'cli',
      },
      ops: [
        {
          op: 'container/run',
          id: 'run-from-job-creator',
          args: {
            cmds: [{ cmd: command.value }],
            image: image.value || 'ubuntu',
          },
        },
      ],
    };
    emit('submit-job', jsonFlow);
  }
};
</script>
<style scoped lang="scss"></style>
