<template>
  <div class="px-3">
    <h1 class="title mb-5 is-1">Choose job type</h1>
    <div v-if="jobTypes" class="job-selector py-3">
      <div class="columns is-multiline">
        <template v-for="jobType in jobTypes" :key="jobType.name">
          <div class="column is-4" @click="selectJobType(jobType)">
            <div
              class="box is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
              :class="{
                'has-background-accent':
                  selectedJobType && jobType.name === selectedJobType.name,
              }"
            >
              <img
                :src="`/img/icons/${jobTypesInfo[jobType.id].icon}.svg`"
                class="mb-3"
              />
              <span class="has-text-weight-semibold">{{ jobType.name }}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="control py-3" style="text-align: right">
        <a
          class="button is-secondary px-6 mt-5 is-fullwidth"
          :class="{ 'is-disabled': !selectedJobType }"
          @click="selectedJobType ? $emit('start-in-market') : null"
          >Continue</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import jobTypesJson from '@/public/job-types.json';
const jobTypesInfo = jobTypesJson;

export default {
  props: {
    jobTypes: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      selectedJobType: null,
      jobTypesInfo,
    };
  },
  methods: {
    selectJobType(type) {
      this.$emit('select-job-type', type);
      this.selectedJobType = type;
    },
  },
};
</script>
<style scoped lang="scss">
.job-selector {
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
