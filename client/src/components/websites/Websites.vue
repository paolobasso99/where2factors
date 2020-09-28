<template>
  <div>
    <WebsitesInput @checked="onChecked" />
    <WebsitesResult :websites="websites" />
  </div>
</template>

<script>
import WebsitesInput from '@/components/websites/WebsitesInput.vue';
import WebsitesResult from '@/components/websites/WebsitesResult.vue';

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
    WebsitesResult,
  },
  methods: {
    async onChecked(websites) {
      // Empty
      this.websites = {
        withTFA: [],
        withoutTFA: [],
        notFound: [],
      };

      this.websites.notFound = websites.notFound;

      // Sort
      for (const website of websites.found) {
        if ('tfa' in website) {
          this.websites.withTFA.push(website);
        } else {
          this.websites.withoutTFA.push(website);
        }
      }
    },
  },
};
</script>
