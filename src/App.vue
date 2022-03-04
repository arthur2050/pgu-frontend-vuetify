<template>
  <v-app id="app">
    <div class="d-flex justify-end header">
      <div>
        <router-link to="/login">Войти</router-link> |
        <router-link to="/register">Зарегистрироваться</router-link>
      </div>
    </div>
    <router-view/>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.header {
  justify-content: flex-end;
  padding: 20px;
}
</style>
