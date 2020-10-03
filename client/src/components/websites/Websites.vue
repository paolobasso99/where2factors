<template>
  <div class="websites">
    <WebsitesInput @checked="onChecked" :loading="loading" />
    <WebsitesResult :websites="websites" />
  </div>
</template>

<style lang="scss" scoped>
.websites {
  text-align: center;
  font-size:1rem;
}
</style>

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
      loading: false,
    };
  },
  components: {
    WebsitesInput,
    WebsitesResult,
  },
  methods: {
    async onChecked(websites) {
      // Set loading animation
      this.loading = true;

      // Empty
      this.websites = {
        withTFA: [],
        withoutTFA: [],
        notFound: [],
      };

      if('notFound' in websites) {
        this.websites.notFound = websites.notFound;
      }

      // Sort
      if('found' in websites) {
        for (const website of websites.found) {
          if ('tfa' in website && website.tfa.length > 0) {
            this.websites.withTFA.push(website);
          } else {
            this.websites.withoutTFA.push(website);
          }
        }
      }

      // Stop loading
      this.loading = false;
    },
  },
};
</script>
