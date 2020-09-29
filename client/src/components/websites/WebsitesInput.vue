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
    ></textarea>
    <button @click="check" class="websites__input__submit">Check</button>
  </div>
</template>

<style lang="scss">
.websites {
  &__input {
    display: block;
    &__textarea {
      display: block;
      margin: auto;
      background-color: #eeeeee;
      border: 0px;
      padding:10px;
      width:700px;
      height: 200px;
      max-width: 100%;
    }
    &__submit {
      padding: 10px 20px;
      border: 0px;
      background-color: #33356C;
      color: #ffffff;
      display: block;
      margin: auto;
      margin-top: 30px;
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
