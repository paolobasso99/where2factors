<template>
  <div>
    <p>Insert a new-line separated list of websites to check</p>
    <textarea v-model="websitesInput" name="websites" id="websitesInput" cols="60" rows="10"></textarea>
    <button @click="start">Start</button>
  </div>
</template>

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
    async start() {
      this.websites = this.websitesInput.split(/[\r\n]+/);

      const response = await axios.post('/api/websites', {
        websites: this.websites,
      });
      console.log(response.data);
    },
  },
};
</script>
