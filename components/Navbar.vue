<template>
  <nav class="navbar px-3" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item" to="/">
          <img class="logo" width="150" src="~assets/img/logo.svg" />
          <span class="subtitle is-7">JOB CREATOR</span>
        </div>
        <a
          id="navbar-burger"
          role="button"
          class="navbar-burger"
          aria-label="menu"
          :class="{ 'is-active': mobileMenu }"
          aria-expanded="false"
          data-target="navbar"
          @click="mobileMenu = !mobileMenu"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div v-if="wallet" id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div
            v-if="!mobileMenu"
            class="navbar-item ml-4 has-dropdown is-hoverable"
          >
            <div class="navbar-link">
              <figure
                class="image is-32x32 mr-2"
                style="border: 1px solid #ddd; border-radius: 50%"
              >
                <img src="~assets/img/default-profile.svg" class="is-rounded" />
              </figure>
              <span class="address" style="max-width: 100px">
                {{ wallet.publicKey }}
              </span>
            </div>

            <div class="navbar-dropdown py-0">
              <div class="navbar-item py-3">
                <a
                  :href="`https://explorer.solana.com/address/${wallet.publicKey}?cluster=devnet`"
                  class="address"
                  target="_blank"
                  style="max-width: 100%"
                >
                  {{ wallet.publicKey }}
                </a>
              </div>
              <div v-if="nosBalance && nosPrice" class="navbar-item py-3">
                <div
                  class="tooltip is-flex is-justify-content-space-between"
                  style="width: 100%"
                >
                  <span class="has-text-weight-semibold">Balance</span>
                  ${{ (nosPrice.usd * nosBalance.uiAmount).toFixed(2) }}
                  <span class="tooltiptext"
                    >${{ (nosPrice.usd * nosBalance.uiAmount).toFixed(2) }} ({{
                      nosBalance.uiAmount.toFixed()
                    }}
                    NOS)</span
                  >
                </div>
              </div>
              <!-- <div v-if="totalNosEarned !== null" class="navbar-item py-3">
                <span class="has-text-weight-semibold">Total NOS earned</span>
                {{ totalNosEarned.toFixed(2) }} NOS
              </div> -->
              <hr class="navbar-divider my-0" />
              <a
                class="navbar-item py-3"
                style="
                  border-bottom-left-radius: 5px;
                  border-bottom-right-radius: 5px;
                "
                @click.prevent="logout"
              >
                <img
                  class="mr-2"
                  src="~assets/img/logout.svg"
                  style="width: 20px"
                />
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile menu -->
    <div
      v-if="wallet"
      class="mobile-menu is-hidden-desktop"
      :class="{ 'is-hidden-touch': !mobileMenu }"
    >
      <aside class="menu">
        <ul class="menu-list mt-5">
          <div class="navbar-item py-3">
            <a
              :href="`https://explorer.solana.com/address/${wallet.publicKey}?cluster=devnet`"
              class="address"
              target="_blank"
              style="max-width: 100%"
            >
              {{ wallet.publicKey }}
            </a>
          </div>
          <div
            v-if="nosBalance && nosPrice"
            class="navbar-item py-3 is-flex is-justify-content-space-between"
          >
            <span class="has-text-weight-semibold">Balance</span>
            ${{ (nosPrice.usd * nosBalance.uiAmount).toFixed(2) }} ({{
              nosBalance.uiAmount.toFixed()
            }}
            NOS)
          </div>
          <!-- <div v-if="totalNosEarned !== null" class="navbar-item py-3">
                <span class="has-text-weight-semibold">Total NOS earned</span>
                {{ totalNosEarned.toFixed(2) }} NOS
              </div> -->
          <hr class="navbar-divider my-0" />
          <a
            class="navbar-item py-3"
            style="
              border-bottom-left-radius: 5px;
              border-bottom-right-radius: 5px;
            "
            @click.prevent="logout"
          >
            <img
              class="mr-2"
              src="~assets/img/logout.svg"
              style="width: 20px"
            />
            Logout
          </a>
        </ul>
      </aside>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { PublicKey } from '@solana/web3.js';
const { nosana, wallet, secretKey } = useSDK();
const nosBalance: Ref<any> = ref(null);
const nosPrice: Ref<any> = ref(null);
const mobileMenu: Ref<Boolean> = ref(false);

const logout = () => {
  secretKey.value = null;
  location.reload();
};

const getBalances = async () => {
  nosBalance.value = await nosana.value.jobs.getNosBalance(
    wallet.value?.publicKey as PublicKey,
  );
  console.log('nosBalance.value', nosBalance.value);
  console.log('nosana.value', nosana.value);
  nosPrice.value = await nosana.value.solana.getNosPrice();
};
watch(wallet, () => {
  getBalances();
});
</script>
<style lang="scss">
.navbar {
  @include touch {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  background: $white;
  .navbar-brand {
    .navbar-item {
      img {
        max-height: 2.5rem;
      }
      &.is-active,
      &:hover {
        color: $primary;
      }
    }
  }
}
.menu-list {
  text-align: center;
  margin: 0 auto;
  .is-justify-content-space-between {
    justify-content: center !important;
    span {
      padding-right: 15px;
    }
  }
}
</style>
