<template>
  <div class="website">
    <div class="website__header">
      <div>
        <img
          :src="website.img"
          :alt="website.name"
          class="website__header__img"
        />
        <span class="website__header__item">{{ website.name }}</span>
        <span v-if="website.doc" class="website__header__item">
          <a :href="website.doc" target="_blank">
            <Icon icon-name="Documentation" icon-color="#33356c">
              <IconBook />
            </Icon>
          </a>
        </span>
        <span v-if="website.exception" class="website__header__item">
          <Icon
            v-tooltip="{
              content: website.exception,
              classes: ['danger'],
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
    <ul v-if="'tfa' in website && website.tfa.length > 0" class="website__methods">
      <li
        v-for="method in website.tfa"
        :key="method"
        class="website__methods__method"
      >
        {{ method }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.website {
  &__header {
    display: flex;
    justify-content: space-between;

    &__item {
      margin-left: 20px;
      font-size: 1.2rem;
    }

    &__img {
      vertical-align: top;
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
    width: 100%;
    list-style-type: none;
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;

    &__method {
      padding: 10px 20px;
      text-transform: uppercase;
      background-color: #33356c;
      color: #fff;
      font-size:0.7rem;
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
