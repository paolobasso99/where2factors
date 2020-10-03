<template>
  <div class="websites__input">
    <p class="websites__input__instructions">
      Insert a new-line separated list of websites to check
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
      <Icon v-if="!loading" icon-name="Loading" icon-color="#fff"
        ><IconLoading
      /></Icon>
      Check websites
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
      // Remove empty lines https://stackoverflow.com/questions/16369642/javascript-how-to-use-a-regular-expression-to-remove-blank-lines-from-a-string
      this.websitesInput = this.websitesInput.replace(/^\s*$(?:\r\n?|\n)/gm, '');

      // Split to array
      if (this.websitesInput.length > 0) {
        this.websites = this.websitesInput.split(/[\r\n]+/);
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
      display: block;
      margin: auto;
      margin-top: 30px;
      font-size: 1.5rem;
      cursor: pointer;
    }

    &__instructions {
      font-size: 1.3rem;
    }
  }
}
</style>
