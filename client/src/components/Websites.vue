<template>
  <WebsitesInput @checked="onChecked"/>
</template>

<script>
import WebsitesInput from '@/components/WebsitesInput.vue';

export default {
  name: 'Websites',
  components: {
    WebsitesInput
  },
  methods: {
    async onChecked(data) {
      console.log(data);
    },
  },
};
</script>
