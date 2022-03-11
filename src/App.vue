<template>
  <v-app id="app">
    <div class="d-flex justify-end header">
      <div>
        <router-link to="/login" class="header__link">Войти</router-link> |
        <router-link to="/register" class="header__link">Зарегистрироваться</router-link>
      </div>
    </div>
    <router-view/>
  </v-app>
</template>


<style lang="scss">
@import './styles/index.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
