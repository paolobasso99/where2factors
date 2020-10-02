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
      :placeholder="'amazon.com\nhttps://google.com\nhttps://dropbox.com/example'"
    ></textarea>
    <button @click="check" class="websites__input__submit">Check websites</button>
  </div>
</template>

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

<script>
import axios from 'axios';

export default {
  data() {
    return {
      websitesInput: '',
      websites: [],
    };
  },
  methods: {
    async check() {
      this.websites = this.websitesInput.split(/[\r\n]+/);

      const response = await axios.post('/api/websites', {
        websites: this.websites,
      });

      this.$emit('checked', response.data);
    },
  },
};
</script>
