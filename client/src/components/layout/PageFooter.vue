<template>
  <footer class="footer">
    where2factors is an
    <a
      href="https://github.com/paolobasso99/where2factors"
      target="_blank"
      rel="noopener noreferrer"
      class="footer__link"
    >
      open source project</a
    > developed by <a
      href="https://bassopaolo.com"
      target="_blank"
      rel="noopener noreferrer"
      class="footer__link"
    >
      Paolo Basso</a
    > with <a
      href="https://twofactorauth.org"
      target="_blank"
      rel="noopener noreferrer"
      class="footer__link"
    >
      twofactorauth.org</a
    > data.
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%;
  padding: 40px;
  background-color: #dfdfdf;
  text-align: center;
  color: #5f5b6e;
  margin-top: 30px;
  font-size:0.9rem;
  font-weight: 300;

  &__link {
    text-decoration: none;
    color:#33356c;
    font-weight: 500;

    &:hover, &:focus {
      color:#33356c;
    }
  }
}
</style>