<template>
  <div class="website">
    <div class="website__header">
      <div class="website__header__main">
        <img
          :src="website.img"
          :alt="website.name"
          class="website__header__main__img"
        />
        <span class="website__header__main__item">{{ website.name }}</span>
        <span v-if="website.doc" class="website__header__main__item">
          <a :href="website.doc" target="_blank">
            <Icon icon-name="Documentation" icon-color="#33356c">
              <IconBook />
            </Icon>
          </a>
        </span>
        <span v-if="website.exception" class="website__header__main__item">
          <Icon
            v-tooltip="{
              content: website.exception,
              classes: ['danger'],
              offset: 10,
            }"
            icon-name="Exception"
            icon-color="#DD491B"
          >
            <IconAlert />
          </Icon>
        </span>
      </div>
      <div class="website__header__query">
        {{ website.query }}
      </div>
    </div>
    <div
      class="website__methods"
      v-if="'tfa' in website && website.tfa.length > 0"
    >
      <span>Methods:</span>
      <ul class="website__methods__list">
        <li
          v-for="method in website.tfa"
          :key="method"
          class="website__methods__list__method"
        >
          {{ method }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.website {
  &__header {
    display: flex;
    justify-content: space-between;

    &__main {
      display: flex;
      justify-content: center;
      align-content: center;

      &__item {
        margin-left: 20px;
        font-size: 1.2rem;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
      }

      &__img {
        vertical-align: top;
      }
    }

    &__query {
      color: #787878;
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
    }
  }

  &__methods {
    margin-top: 10px;
    text-align: left;
    font-size: 0.8rem;

    &__list {
      list-style-type: none;
      margin: 0px;
      padding: 0px;
      display: inline;

      &__method {
        margin: 0px 20px;
        text-transform: uppercase;
        display: inline;
      }
    }
  }
}
</style>

<script>
import Icon from '@/components/icons/Icon.vue';
import IconBook from '@/components/icons/IconBook.vue';
import IconAlert from '@/components/icons/IconAlert.vue';

export default {
  props: {
    website: Object,
  },
  components: {
    Icon,
    IconBook,
    IconAlert,
  },
};
</script>
