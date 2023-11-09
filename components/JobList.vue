<template>
  <div>
    <div class="columns is-mobile is-vcentered">
      <div class="column">
        <h2 class="title is-5">
          {{ title ? title : 'Jobs' }}
        </h2>
      </div>
      <!-- <div v-if="jobs && jobs.length > perPage" class="column has-text-right">
        {{ (page - 1) * perPage + 1 }} -
        {{ Math.min(page * perPage, jobs.length) }} of {{ jobs.length }} jobs
      </div> -->
    </div>

    <table class="table is-fullwidth mb-0" :class="{ 'is-small': small }">
      <thead>
        <tr>
          <th>Address</th>
          <th style="width: 25%">Duration</th>
          <th>Finished</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!filteredJobs">
          <td colspan="5">Loading jobs..</td>
        </tr>
        <tr v-else-if="!filteredJobs.length">
          <td colspan="5">No jobs</td>
        </tr>
        <tr
          v-for="job in filteredJobs"
          v-else
          :key="job.pubkey"
          custom
          class="remove-greyscale-on-hover"
        >
          <td>
            <a
              :href="`https://explorer.nosana.io/jobs/${job.pubkey}?network=devnet`"
              class="address"
              target="_blank"
            >
              {{ job.pubkey }}
            </a>
          </td>
          <td>
            <span v-if="job.timeEnd">
              {{ fmtMSS(job.timeEnd - job.timeStart) }}
            </span>
            <span v-else-if="job.timeStart">
              {{ fmtMSS(Math.floor(timestamp / 1000) - job.timeStart) }}
            </span>
            <span v-else> - </span>
          </td>
          <td>
            <UseTimeAgo
              v-if="job.timeEnd"
              v-slot="{ timeAgo }"
              :time="new Date(job.timeEnd * 1000)"
            >
              {{ timeAgo }}
            </UseTimeAgo>
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <pagination
      v-if="jobs && jobs.length > perPage"
      v-model="page"
      class="pagination is-centered mt-4"
      :total-page="Math.ceil(jobs.length / perPage)"
      :max-page="6"
    >
    </pagination> -->
  </div>
</template>

<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components';

const timestamp = useTimestamp({ interval: 1000 });
const fmtMSS = (s: number) => {
  return (s - (s %= 60)) / 60 + (s > 9 ? 'm:' : 'm:0') + s + 's';
};
const props = defineProps({
  jobs: {
    type: Array<{
      pubkey: any;
      timeStart: number;
      timeEnd: number;
      state: number;
      price?: number;
    }>,
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
  small: {
    type: Boolean,
    default: true,
  },
});

const page: Ref<number> = ref(1);
const perPage: Ref<number> = ref(
  Math.max(5, props.jobs ? props.jobs.filter((j) => j.state === 0).length : 0),
);

const filteredJobs = computed(() => {
  if (!props.jobs || !props.jobs.length) return props.jobs;
  const paginatedJobs = props.jobs.slice(
    (page.value - 1) * perPage.value,
    page.value * perPage.value,
  );
  return paginatedJobs;
});
</script>

<style lang="scss" scoped>
.table {
  tr td,
  th {
    padding: 10px 0px;
  }
  white-space: nowrap;
  .address {
    max-width: 150px;
  }
  &.is-small {
    white-space: normal;
  }
}
</style>
