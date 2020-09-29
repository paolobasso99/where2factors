<template>
  <div class="websites__result">
    <ul class="websites__result__list" v-if="this.websites.withTFA">
      <li class="websites__result__list__item" v-for="website in this.websites.withTFA" :key="website.query">
        <Website :website="website" />
      </li>
    </ul>
    <ul v-if="this.websites.withoutTFA">
      <li class="websites__result__list__item" v-for="website in this.websites.withoutTFA" :key="website.query">
        <Website :website="website" />
      </li>
    </ul>
    <ul v-if="this.websites.notFound">
      <li class="websites__result__list__item" v-for="query in this.websites.notFound" :key="query">
        {{query}}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.websites {
  &__result {
    &__list {
      &__item {
        
      }
    }
  }
}
</style>

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
