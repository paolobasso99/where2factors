<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h3>
      Where2Factors helps you to find which websites that you use have two
      factors authentication!
    </h3>
    <Websites />
  </div>
</template>

<script>
import Websites from '@/components/websites/Websites.vue';

export default {
  name: 'Home',
  components: {
    Websites
  }
};
</script>
