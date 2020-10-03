<template>
  <div class="websites__result">
    <div
      class="websites__result__section"
      v-if="this.websites.withTFA.length > 0"
    >
      <h3 class="websites__result__title">
        <Icon
          class="websites__result__title__icon"
          icon-name="With TFA"
          icon-color="#4AAD52"
          width="25"
        >
          <IconTick />
        </Icon>
        With TFA
      </h3>
      <ul class="websites__result__list">
        <li
          class="websites__result__list__item"
          v-for="website in this.websites.withTFA"
          :key="website.query"
        >
          <Website :website="website" />
        </li>
      </ul>
    </div>
    <div
      class="websites__result__section"
      v-if="this.websites.withoutTFA.length > 0"
    >
      <h3 class="websites__result__title">
        <Icon
          class="websites__result__title__icon"
          icon-name="Without TFA"
          icon-color="#DD491B"
          width="25"
        >
          <IconX />
        </Icon>
        Without TFA
      </h3>
      <ul class="websites__result__list">
        <li
          class="websites__result__list__item"
          v-for="website in this.websites.withoutTFA"
          :key="website.query"
        >
          <Website :website="website" />
        </li>
      </ul>
    </div>

    <div
      class="websites__result__section"
      v-if="this.websites.notFound.length > 0"
    >
      <h3 class="websites__result__title">
        <span class="websites__result__title__icon websites__result__title__icon--unmatched">
          ?
        </span>
        Unmatched
      </h3>
      <ul class="websites__result__list">
        <li
          class="websites__result__list__item websites__result__list__item--unmatched"
          v-for="query in this.websites.notFound"
          :key="query"
        >
          <span>{{ query }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.websites {
  &__result {
    text-align: center;

    &__section {
      margin-top: 60px;
    }

    &__title {
      font-weight: 400;
      font-size: 1.5rem;
      margin: 24px 0px;

      &__icon {
        margin-right: 1rem;

        &--unmatched {
          font-size:1.2em;
          font-weight: 400;
          color: #33356c;
        }
      }
    }

    &__list {
      list-style-type: none;
      padding: 0px;

      &__item {
        margin: 40px 0px;

        &--unmatched {
          margin: 20px 0px;
        }

        &:first-child {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>

<script>
import Website from '@/components/websites/Website.vue';
import Icon from '@/components/icons/Icon.vue';
import IconTick from '@/components/icons/IconTick.vue';
import IconX from '@/components/icons/IconX.vue';

export default {
  props: {
    websites: Object,
  },
  components: {
    Website,
    Icon,
    IconTick,
    IconX,
  },
};
</script>
