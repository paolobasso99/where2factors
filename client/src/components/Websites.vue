<template>
  <WebsitesInput @checked="onChecked" />
</template>

<script>
import WebsitesInput from '@/components/WebsitesInput.vue';

export default {
  name: 'Websites',
  data() {
    return {
      websites: {
        withTFA: [],
        withoutTFA: [],
        notFound: [],
      },
    };
  },
  components: {
    WebsitesInput,
  },
  methods: {
    async onChecked(websites) {
      this.websites.notFound = websites.notFound;

      // for(const website in websites) {
        
      // }
    },
  },
};
</script>
