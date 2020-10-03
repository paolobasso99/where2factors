<template>
  <div class="icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      :aria-labelledby="iconName"
      :height="height"
      :width="width"
      role="presentation"
      class="icon__svg"
    >
      <title :id="iconName" lang="en">{{ iconName }}</title>
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
  display: inline-block;

  &__svg {
    width: 100%;
    height: auto;
  }
}
</style>