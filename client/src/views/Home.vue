<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h3>
      Where2Factors helps you to find which websites that you use have two
      factors authentication!
    </h3>
    <WebsitesInput />
  </div>
</template>

<script>
import WebsitesInput from '@/components/WebsitesInput.vue';

export default {
  name: 'Home',
  components: {
    WebsitesInput
  }
};
</script>
