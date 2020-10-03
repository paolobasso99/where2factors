<template>
  <div class="websites__input">
    <p class="websites__input__instructions">
      Insert a new-line or comma separated list of websites to check
    </p>
    <p class="websites__input__tip">
      TIP: Export all your accounts from your password manager, tutorial
      <a
        href="https://github.com/paolobasso99/where2factors"
        target="_blank"
        rel="noopener noreferrer"
        class="websites__input__tip__link"
        >here</a
      >.
    </p>
    <textarea
      v-model="websitesInput"
      name="websites"
      class="websites__input__textarea"
      cols="60"
      rows="10"
      :placeholder="
        'amazon.com\nhttps://google.com\nhttps://dropbox.com/example'
      "
    ></textarea>
    <button @click="check" class="websites__input__submit">
      <Icon
        v-if="loading"
        icon-name="Loading"
        icon-color="#fff"
        viewBox="0 0 38 38"
        class="websites__input__submit__icon"
        ><IconLoading
      /></Icon>
      <span v-if="loading">Checking...</span>
      <span v-else>Check websites</span>
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import Icon from '@/components/icons/Icon.vue';
import IconLoading from '@/components/icons/IconLoading.vue';

export default {
  props: {
    loading: Boolean,
  },
  data() {
    return {
      websitesInput: '',
      websites: [],
    };
  },
  components: {
    Icon,
    IconLoading,
  },
  methods: {
    async check() {
      this.$emit('startChecking');

      // Remove empty lines https://stackoverflow.com/questions/16369642/javascript-how-to-use-a-regular-expression-to-remove-blank-lines-from-a-string
      this.websitesInput = this.websitesInput.replace(
        /^\s*$(?:\r\n?|\n)/gm,
        '',
      );

      // Split to array by new line or comma https://regex101.com/r/yUYSAs/2
      if (this.websitesInput.length > 0) {
        this.websites = this.websitesInput.split(/[\r\n,]+/);
      } else {
        this.websites = [];
      }

      if (this.websites.length > 0) {
        const response = await axios.post('/api/websites', {
          websites: this.websites,
        });

        this.$emit('checked', response.data);
      } else {
        this.$emit('checked', []);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.websites {
  &__input {
    display: block;
    margin-bottom: 64px;

    &__textarea {
      display: block;
      margin: auto;
      background-color: #dfdfdf;
      border: 0px;
      padding: 10px;
      width: 700px;
      height: 200px;
      max-width: 100%;
    }

    &__submit {
      padding: 15px 30px;
      border: 0px;
      background-color: #33356c;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-content: center;
      margin: auto;
      margin-top: 30px;
      font-size: 1.5rem;
      cursor: pointer;

      &__icon {
        margin-right: 10px;
      }
    }

    &__instructions {
      font-size: 1.3rem;
      margin: 20px 0 10px;
    }

    &__tip {
      color: #787878;
      font-size: 0.9rem;
      margin-top: 0px;
      &__link {
        text-decoration: none;
        color: #33356c;
        font-weight: 500;

        &:hover,
        &:focus {
          color: #33356c;
        }
      }
    }
  }
}
</style>
