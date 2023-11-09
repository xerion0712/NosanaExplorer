<template>
  <div class="has-text-centered loading-screen">
    <!-- TODO: use svg and animate this -->
    <img src="~assets/img/loading-graphic.png" class="mb-5" />
    <h3 class="title is-6">Loading</h3>
    <p class="has-text-grey" style="font-size: 0.85rem">
      Job finished, returning back to the queue
    </p>
  </div>
</template>
<style lang="scss" scoped>
.loading-screen {
  h3 {
    &:after {
      content: '.';
      animation: dots 1s steps(5, end) infinite;
    }
  }
}
@keyframes dots {
  0%,
  20% {
    color: white;
    text-shadow:
      0.25em 0 0 rgba(0, 0, 0, 0),
      0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    text-shadow:
      0.25em 0 0 rgba(0, 0, 0, 0),
      0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow:
      0.25em 0 0 black,
      0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow:
      0.25em 0 0 black,
      0.5em 0 0 black;
  }
}
</style>
