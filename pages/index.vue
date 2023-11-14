<template>
  <div>
    <div class="container px-3">
      <div
        class="loader mt-3"
        :class="{ 'is-loading': loading || fetchingRuns }"
      ></div>
      <div v-if="error" class="notification is-danger is-light">
        <button class="delete" @click="error = null"></button>
        {{ error }}
      </div>
      <h1
        v-if="!keypair && !loginPath"
        class="title mb-5 is-2 has-text-centered"
      >
        Choose your path
      </h1>
      <div v-if="!keypair || !status" class="columns is-centered mt-3">
        <div
          v-if="!keypair && !loginPath"
          class="column login-path mt-4"
          @click="loginPath = 'login'"
        >
          <div
            class="box is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
          >
            <img src="~/assets/img/robot_login.svg" class="mb-3" />
            <span class="has-text-weight-semibold">Login</span>
          </div>
        </div>

        <div
          v-if="!keypair && !loginPath"
          class="column login-path mt-4"
          @click="login(false)"
        >
          <div
            class="box is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
          >
            <img src="~/assets/img/robot_keypair.svg" class="mb-3" />
            <span class="has-text-weight-semibold">New Account</span>
          </div>
        </div>
        <LoginScreen v-if="!keypair && loginPath" @login="login" />
        <div
          v-if="keypair && jobTypesJson && !status && !loading"
          class="column is-8"
        >
          <job-selector
            :job-types="jobTypesJson"
            @select-job-type="selectJobType"
            @start-in-market="status = 'READY'"
          />
        </div>
      </div>
    </div>

    <div v-if="keypair && status">
      <div class="work-wrapper px-3">
        <div>
          <h1 class="title mb-5 is-2 has-text-centered">Create Job</h1>
          <span
            v-if="selectedJobType"
            class="has-text-primary"
            @click="(selectedJobType = null), (status = null)"
            >&lt; Back</span
          >
          <p
            v-if="selectedJobType"
            class="is-size-7 mb-2 pt-5 has-text-weight-semibold is-flex"
          >
            Selected job type
            <img
              width="14"
              style="margin-bottom: -3px"
              src="~assets/img/icons/feather.svg"
            />
            {{ selectedJobType.name }}
          </p>
          <div class="box px-6">
            <div v-if="keypair" class="py-5">
              <JobTypeCowsay
                v-if="selectedJobType.id === 'cowsay'"
                @submit-job="submitJob"
              ></JobTypeCowsay>
              <JobTypeWhisper
                v-if="selectedJobType.id === 'whisper'"
                @submit-job="submitJob"
              ></JobTypeWhisper>
              <JobTypeDocker
                v-if="selectedJobType.id === 'docker'"
                @submit-job="submitJob"
              ></JobTypeDocker>
            </div>
          </div>
        </div>
        <div v-if="success" class="notification is-success is-light">
          <button class="delete" @click="success = null"></button>
          Succesfully posted job<br />
          Job: {{ success.job.toString() }}
        </div>
      </div>
    </div>
    <KeypairModal v-if="showKeypairPopup" :keypair="keypair" @login="login" />
  </div>
</template>

<script setup lang="ts">
import { Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import jobTypesJson from '@/public/job-types.json';

const { nosana, setWallet, secretKey } = useSDK();
const loading = ref(false);
const markets: Ref<any | undefined> = ref(undefined);
const error: Ref<any> = ref(null);
const keypair: Ref<Keypair | undefined> = ref(undefined);
const fetchingRuns: Ref<boolean> = ref(false);
const status: Ref<any> = ref(null);
const selectedJobType: Ref<any> = ref(null);
const showKeypairPopup: Ref<Boolean> = ref(false);
const config = useRuntimeConfig();
const loginPath: Ref<any> = ref(null);
const success: Ref<any> = ref(null);

const login = async (key: any) => {
  loading.value = true;
  console.log('key: ', key);
  try {
    if (!key) {
      // generate keypair, get some tokens and create a stake account so it can enter the markets
      const generatedKp = Keypair.generate();

      try {
        const airdropResult = await fetch(
          `${
            config.public.backendUrl
          }/airdrop?address=${generatedKp.publicKey.toString()}`,
        );
        console.log('airdrop', airdropResult);
      } catch (error) {
        throw new Error('Couldnt airdrop tokens to the generated address');
      }

      setWallet(generatedKp as Keypair);

      // create stake of 1 NOS
      const stake = await nosana.value.stake.create(
        generatedKp.publicKey,
        1,
        365,
      );
      console.log('stake tx', stake);

      keypair.value = generatedKp;
      showKeypairPopup.value = true;
      return;
    } else {
      if (typeof key === 'string') {
        key = bs58.decode(key);
      }
      keypair.value = Keypair.fromSecretKey(key);
    }
    setWallet(keypair.value as Keypair);
    showKeypairPopup.value = false;

    await getMarkets();
  } catch (e) {
    console.error(e);
    keypair.value = undefined;
    secretKey.value = null;
    error.value = e;
  }
  loading.value = false;
};

const getMarkets = async () => {
  markets.value = await nosana.value.jobs.allMarkets();
};

const selectJobType = (type: any) => {
  selectedJobType.value = type;
  console.log('selectedMarket.value', selectedJobType.value);
};

if (secretKey.value !== null && secretKey.value.length > 0) {
  login(secretKey.value);
}

const submitJob = async (ipfsHash: string) => {
  const response = await nosana.value.jobs.list(
    ipfsHash,
    // new PublicKey(selectedJobType.market),
  );
  success.value = response;
  console.log('response', response);
};
</script>
<style lang="scss" scoped>
.work-wrapper {
  max-width: 580px;
  width: 100%;
  margin: 0 auto;
}
.box {
  @include touch {
    padding: 1rem;
  }
}

.login-path {
  max-width: 240px;
  width: 100%;

  @include touch {
    max-width: 100%;
  }
  .box {
    transition: all ease 0.2s;
    border: transparent 1px solid;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
}
</style>
