<template>
  <div id="app">
    <GitHubCorner url="https://github.com/paolobasso99/where2factors" />
    <router-view />
    <PageFooter />
  </div>
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
@import url('https://fonts.googleapis.com/css?family=Montserrat');

* {
  box-sizing: border-box;
}

html,
body {
  padding: 0px;
  margin: 0px;
  background-color: #f7f7f8;
  box-sizing: border-box;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
}

.page {
  margin: auto;
  width: 980px;
  max-width: 100%;
  padding: 0px 20px;
}

.tooltip {
  $color: rgba(#33356c, 1);

  .tooltip-inner {
    background: $color;
    color: white;
    padding: 16px;
    border-radius: 3px;
    box-shadow: 0 5px 30px rgba(black, 0.1);
    max-width: 250px;
    font-size:0.8rem;
  }

  .tooltip-arrow {
    border-color: $color;
  }

  &.danger {
    $color: rgba(#dd491b, 1);

    .tooltip-inner {
      background: $color;
      color: white;
    }

    .tooltip-arrow {
      border-color: $color;
    }
  }
}
</style>