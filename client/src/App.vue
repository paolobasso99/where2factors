<template>
  <div id="app">
    <GitHubCorner url="https://github.com/paolobasso99/where2factors" />
    <router-view />
  </div>
</template>

<script>
import GitHubCorner from '@/components/GitHubCorner.vue';

export default {
  props: {
    url: String,
  },
  components: {
    GitHubCorner,
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
  background-color: #ffffff;
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
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 5px 30px rgba(black, 0.1);
    max-width: 250px;
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