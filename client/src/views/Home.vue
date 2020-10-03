<template>
  <div class="page page--home">
    <div class="header">
      <h1 class="header__title">where2factors</h1>
      <img
        class="header__logo"
        src="../assets/logo.svg"
        onerror="this.src='../assets/logo.png'; this.onerror=null;"
        alt="where2factors logo"
      />
      <h3 class="header__subtitle">
        where2factors helps you to find which websites that you use have two
        factors authentication (TFA)
      </h3>
    </div>

    <Websites />
  </div>
</template>

<style lang="scss" scoped>
.header {
  text-align: center;
  margin-top:70px;
  margin-bottom: 70px;
  padding:20px;
}
.header__title {
  display: none;
}
.header__logo {
  max-width: 100%;
  width: 500px;
  margin-bottom: 10px;
}
.header__subtitle {
  color: #787878;
  font-size: 0.9rem;
  margin: 0px;
  font-weight: 400;
}
</style>

<script>
import Websites from '@/components/websites/Websites.vue';

export default {
  name: 'Home',
  components: {
    Websites,
  },
};
</script>
