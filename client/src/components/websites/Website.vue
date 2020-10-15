<template>
  <div class="website">
    <div class="website__header">
      <div class="website__header__main">
        <span class="website__header__main__item">
          <img
            :src="website.img"
            class="website__header__main__img"
            :alt="website.name + ' logo'"
          />
        </span>
        <span class="website__header__main__item website__header__main__item--name">{{ website.name }}</span>
        <span v-if="website.doc" class="website__header__main__item website__header__main__item--doc">
          <a
            :href="website.doc"
            target="_blank"
            class="website__header__main__item__link website__header__main__item__link--doc"
            :aria-label="'Documentation for' + website.name"
          >
            <Icon icon-name="Documentation" icon-color="#33356c" height="32">
              <IconBook />
            </Icon>
          </a>
        </span>
        <span v-if="website.exception" class="website__header__main__item website__header__main__item--exception">
          <Icon
            v-tooltip="{
              content: website.exception,
              classes: ['danger'],
              offset: 10,
            }"
            icon-name="Exception"
            icon-color="#DD491B"
            height="32"
          >
            <IconAlert />
          </Icon>
        </span>
      </div>
      <div class="website__header__query">
        {{ website.host }}
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
      font-weight: 400;

      &__item {
        margin-left: 20px;
        font-size: 1.2rem;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;

        @media all and (max-width: 450px) {
          margin-left: 10px;
        }

        @media all and (max-width: 500px) {
          font-size: 1rem;
        }

        @media all and (max-width: 450px) {
          font-size: 0.9rem;
        }

        &:first-child {
          margin-left: 0px;
        }

        &:last-child {
          margin-right: 20px;
          @media all and (max-width: 450px) {
            margin-right: 10px;
          }
        }

        &__link {
          height: 100%;
          display: inline-flex;
          align-items: center;
          max-height: 100%;
        }
      }

      &__img {
        vertical-align: top;
        height: 32px;
        width: 32px;
        @media all and (max-width: 450px) {
          height: 24px;
          width: 24px;
        }
      }
    }

    &__query {
      color: $text-light-color;
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
      font-size: 0.8rem;
      text-transform: lowercase;

      @media all and (max-width: 450px) {
        font-size: 0.6rem;
      }
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
