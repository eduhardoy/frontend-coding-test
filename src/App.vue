<template>
  <div class="app-container">
    <div class="app-column">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/scss/design_token.scss';
.app-container{
  background: $background;
  padding: 60px 87px;
  min-height: 100vh;
}
.app-column{
  max-width: 1200px;
  box-sizing: border-box;
  background: #fff;
  padding: 60px 20px 60px 40px;
  margin: 0px auto;
}
@media only screen and (max-width: 1200px) {
  .app-column{
    max-width: 100%;
  }
  .app-container{
    padding: 0 0;
  }
}
</style>
