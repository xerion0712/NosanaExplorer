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

  const response2 = await fetch(
    nosana.value.ipfs.config.api + '/pinning/pinFileToIPFS',
    {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data;`,
        Authorization: `Bearer ${nosana.value.ipfs.config.jwt}`,
      },
      body: data,
    },
  );
  console.log('respsone', response2);
  // response.data.IpfsHash;
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
  const ipfsHash = await nosana.value.ipfs.pin(jsonFlow);
  console.log(`ipfs uploaded:\t${nosana.value.ipfs.config.gateway + ipfsHash}`);

  const market = await nosana.value.jobs.getMarket(
    nosana.value.solana.config.market_address,
  );

  console.log(
    `posting job to market ${nosana.value.solana.config.market_address}`,
  );
  const response = await nosana.value.jobs.list(ipfsHash);
  console.log('job posted!', response);
  console.debug(data);
};
// const submitJob = async () => {
//   const command = 'cowsay ' + cowsayCommand.value;
//   const wasmUrl = await getWAPMUrlForCommandName('cowsay');

//   const jsonFlow = {
//     state: {
//       'nosana/type': 'wasm',
//       'nosana/trigger': 'cli',
//     },
//     ops: [
//       {
//         op: 'wasm/run',
//         id: 'run-from-cli',
//         args: {
//           cmds: [{ cmd: command }],
//           wasm: wasmUrl,
//         },
//       },
//     ],
//   };
//   const ipfsHash = await nosana.value.ipfs.pin(jsonFlow);
//   console.log(`ipfs uploaded:\t${nosana.value.ipfs.config.gateway + ipfsHash}`);
//   emit('submit-job', ipfsHash);
// };
</script>
<style scoped lang="scss"></style>
