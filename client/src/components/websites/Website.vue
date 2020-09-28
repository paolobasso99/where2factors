<template>
  <div class="website-cotainer">
    <img :src="website.img" :alt="website.name" class="website-img" />
    <div>
      <p>{{ website.query }} matched:</p>
      <p>{{ website.name }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.website-cotainer {
  display: flex;
}
</style>

<script>
export default {
  props: {
    website: Object,
  },
};
</script>
