<template>
  <div class="container px-4">
    <div class="columns is-align-items-center is-relative">
      <div class="column mx-auto is-7">
        <div class="box p-6">
          <h1 class="title mb-5 is-1">Start earning</h1>
          <p class="mb-6">
            Get started with creating jobs by logging in with your private key.
          </p>
          <div class="field">
            <div class="control" style="width: 100%">
              <input
                v-model="key"
                class="input"
                type="password"
                placeholder="Private key"
              />
            </div>
          </div>
        </div>
        <div class="control is-fullwidth">
          <a
            class="button is-primary is-fullwidth"
            @click="key === '' || key.length === 0 ? null : login(false)"
            >Login</a
          >
        </div>
      </div>
    </div>
    <div v-if="warningModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card has-border-radius">
        <section class="modal-card-body p-6">
          <h3 class="title is-2">Warning!</h3>
          <p class="pt-2 pb-4">
            Do not utilize an existing private key for managing real funds.
          </p>
          <button
            class="button is-primary px-6 mt-5"
            @click.prevent="warningModal = false"
          >
            I understand
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const key = ref('');
const warningModal = ref(true);

const emit = defineEmits(['login']);
const login = (generateKeypair?: Boolean) =>
  emit('login', generateKeypair ? null : key.value);
</script>
<style lang="scss" scoped>
.robot {
  margin: 0 auto;
  transform: rotate(-21deg);
  @include touch {
    width: 150px;
  }
}
.box {
  @include touch {
    padding: 2rem !important;
  }
}
.modal-card-body {
  border-radius: 8px;
}
.modal-card-body {
  padding: 2rem;
}
</style>
