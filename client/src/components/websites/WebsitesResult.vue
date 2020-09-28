<template>
  <div>
    <ul v-if="this.websites.withTFA">
      <li v-for="website in this.websites.withTFA" :key="website.query">
        <Website :website="website" />
      </li>
    </ul>
    <ul v-if="this.websites.withoutTFA">
      <li v-for="website in this.websites.withoutTFA" :key="website.query">
        <Website :website="website" />
      </li>
    </ul>
    <ul v-if="this.websites.notFound">
      <li v-for="query in this.websites.notFound" :key="query">
        {{query}}
      </li>
    </ul>
  </div>
</template>

<script>
import Website from '@/components/websites/Website.vue';

export default {
  props: {
    websites: Object,
  },
  components: {
    Website,
  },
};
</script>
