<template>
  <div>
    <ul v-if="this.websites.withTFA">
      <li v-for="website in this.websites.withTFA" :key="website.query">
        <div class="website-cotainer">
          <img
            :src="website.img"
            :alt="website.name"
            class="website-img"
          />
          <div>
            <p>{{website.query}} matched:</p>
            <p>{{website.name}}</p>
          </div>
        </div>
      </li>
    </ul>
    <ul v-if="this.websites.withoutTFA"></ul>
    <ul v-if="this.websites.notFound"></ul>
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
    websites: Object,
  },
};
</script>
