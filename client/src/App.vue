<template>
  <main id="app" role="main">
    <GitHubCorner url="https://github.com/paolobasso99/where2factors" />
    <router-view />
    <PageFooter />
  </main>
</template>

<script>
import GitHubCorner from '@/components/layout/GitHubCorner.vue';
import PageFooter from '@/components/layout/PageFooter.vue';

export default {
  props: {
    url: String,
  },
  components: {
    GitHubCorner,
    PageFooter,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,500');

* {
  box-sizing: border-box;
}

html,
body {
  padding: 0px;
  margin: 0px;
  background-color: $background-color;
  box-sizing: border-box;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  font-weight: 300;
  color: $text-color;
}

.page {
  margin: auto;
  width: 980px;
  max-width: 100%;
  padding: 0px 20px;
}

.tooltip {
  $color: rgba($primary-color, 1);

  .tooltip-inner {
    background: $color;
    color: $on-primary-color;
    padding: 16px;
    border-radius: 3px;
    box-shadow: 0 5px 30px rgba(black, 0.1);
    max-width: 250px;
    font-size: 0.8rem;
  }

  .tooltip-arrow {
    border-color: $color;
  }

  &.danger {
    $color: rgba($danger-color, 1);

    .tooltip-inner {
      background: $color;
      color: $on-danger-color;
    }

    .tooltip-arrow {
      border-color: $color;
    }
  }
}
</style>
