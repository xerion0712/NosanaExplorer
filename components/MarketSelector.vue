<template>
  <div class="px-3">
    <h1 class="title mb-5 is-1">Choose market</h1>
    <div v-if="markets" class="market-selector py-3">
      <div class="columns is-multiline">
        <template v-for="market in markets">
          <div
            v-if="
              marketsInfo[market.address] && !marketsInfo[market.address].skip
            "
            :key="market.address"
            :value="market.address"
            class="column is-4"
            :class="{
              'grey-box':
                market.address.toString() !==
                'Db9gUpeqYC2FCmHJMxiZX1ncoZXVEABjsaCWfbPzDdXi',
            }"
            @click="selectMarket(market)"
          >
            <div
              class="box is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
              :class="{
                'has-background-accent':
                  selectedMarket && market.address === selectedMarket.address,
              }"
            >
              <img
                :src="`/img/icons/${marketsInfo[market.address].icon}.svg`"
                class="mb-3"
              />
              <!-- <span>{{ market.address }}</span> -->
              <span class="has-text-weight-semibold">{{
                marketsInfo[market.address].name
              }}</span>
              {{ ((parseInt(market.jobPrice) * 3600) / 1e6).toFixed(2) }}
              $NOS/hour
            </div>
          </div>
        </template>
      </div>
      <div class="control py-3" style="text-align: right">
        <a
          class="button is-secondary px-6 mt-5 is-fullwidth"
          :class="{ 'is-disabled': !selectedMarket }"
          @click="selectedMarket ? $emit('start-in-market') : null"
          >Continue</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import marketsJson from '@/public/markets.json';
const marketsInfo = marketsJson;

export default {
  props: {
    markets: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      selectedMarket: null,
      marketsInfo,
    };
  },
  methods: {
    selectMarket(market) {
      if (
        market.address.toString() ===
        'Db9gUpeqYC2FCmHJMxiZX1ncoZXVEABjsaCWfbPzDdXi'
      ) {
        this.$emit('select-market', market);
        this.selectedMarket = market;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.market-selector {
  .box {
    transition: all ease 0.2s;
    border: transparent 1px solid;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }

    img {
      border-radius: 6px;
    }
    &.has-background-accent {
      background-color: #e6fde5 !important;
      border: $secondary 1px solid;
    }
    &.has-background-accent:hover {
      background-color: #e6fde5 !important;
    }
  }
  .grey-box {
    opacity: 0.35;
    cursor: not-allowed;
    .box {
      cursor: not-allowed;
      &:hover {
        background-color: #fff;
      }
    }
  }
}
</style>
