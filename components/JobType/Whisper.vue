<template>
  <div>
    <tapir-widget :time="2" button-color="#93FC39" :custom-upload="creatJob" />
  </div>
</template>

<script setup lang="ts">
import TapirWidget from 'vue-audio-tapir';
import 'vue-audio-tapir/dist/vue-audio-tapir.css';
const { nosana } = useSDK();
const emit = defineEmits(['submit-job']);

const creatJob = async (data: any) => {
  console.log('creating job: ', data);
  // let audioUrl = URL.createObjectURL(data);
  // audioUrl =
  //   nosana.value.ipfs.config.gateway +
  //   (await nosana.value.ipfs.pinFile(audioUrl));
  const file = new File([data], 'recording.wav');

  const formData = new FormData();
  formData.set('file', file, 'recording.wav');
  console.log(formData.get('file'));

  const audioUrl = await fetch(
    nosana.value.ipfs.config.api + '/pinning/pinFileToIPFS',
    {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data;`,
        Authorization: `Bearer ${nosana.value.ipfs.config.jwt}`,
      },
      body: formData,
    },
  );
  console.log('respsone', audioUrl);
  return;

  // eslint-disable-next-line no-unreachable
  console.log(`audio file uploaded:\t ${audioUrl}`);
  const jsonFlow = {
    state: {
      'nosana/type': 'whisper',
      'nosana/trigger': 'cli',
    },
    ops: [
      {
        op: 'whisper/run',
        id: 'run-from-cli',
        args: {
          audio: audioUrl,
        },
      },
    ],
  };
  emit('submit-job', jsonFlow);
};
</script>
<style scoped lang="scss"></style>
