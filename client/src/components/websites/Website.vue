<template>
  <div class="website">
    <img :src="website.img" :alt="website.name" class="website__img" />
    <div class="website__header">
      <span class="website__name">{{ website.name }}</span>
      <span v-if="website.doc">{{website.doc}}</span>
      <span v-if="website.exception">{{website.exception}}</span>
      <span class="website__query">{{ website.query }}</span>
    </div>
    <div class="website__methods">
      <ul>
        <li v-for="method in website.tfa" :key="method">{{method}}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  props: {
    website: Object,
  },
};
</script>
