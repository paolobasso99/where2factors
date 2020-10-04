<template>
  <div class="icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
      :aria-labelledby="iconName"
      :height="height"
      :width="width"
      role="presentation"
      class="icon__svg"
    >
      <title lang="en">{{ iconName }}</title>
      <g :fill="iconColor">
        <slot />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'alert',
    },
    width: {
      type: [Number, String],
      default: 20,
    },
    height: {
      type: [Number, String],
      default: 20,
    },
    viewBox: {
      type: [String],
      default: "0 0 20 20",
    },
    iconColor: {
      type: String,
      default: 'currentColor',
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  overflow: visible;
  vertical-align: middle;
  display: inline-flex;
  align-items: center;

  &__svg {
    margin: 0 auto;
    display: block;
  }
}
</style>