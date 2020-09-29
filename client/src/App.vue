<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat');

* {
  box-sizing: border-box;
}

html, body {
  padding: 0px;
  margin: 0px;
  background-color: #ffffff;
  box-sizing: border-box;
}

#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
}

.page {
  margin: auto;
  width: 1200px;
  max-width: 100%;
  padding: 0px 20px;
}
</style>