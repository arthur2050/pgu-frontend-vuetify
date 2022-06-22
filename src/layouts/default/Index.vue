<template>
  <div v-if="isAuth">
    <default-bar />

    <default-drawer />

    <default-view />

    <default-footer />

    <default-settings />
  </div>
</template>

<script>
  import {
  mapGetters
} from 'vuex';
  
  export default {
    name: 'DefaultLayout',
    async created () {
      console.log(this.isAuth);
      if(this.isAuth) {
        this.$store.dispatch('app/setOverlay', true);
        const response = await this.API.get('/dashboard');
        console.log(response.data);
        this.$store.dispatch('app/setOverlay', false);
      }
      else if(!this.isAuth) {
        await this.$store.dispatch('snackbar/add', {color: 'error', content: 'nonAuthorized'});
        this.$router.push('/login');
      }
    },
    computed: {
      ...mapGetters({
        isAuth: 'auth/isAuthenticated'
      })
    },
    components: {
      DefaultBar: () => import(
        /* webpackChunkName: "default-app-bar" */
        './AppBar'
      ),
      DefaultDrawer: () => import(
        /* webpackChunkName: "default-drawer" */
        './Drawer'
      ),
      DefaultFooter: () => import(
        /* webpackChunkName: "default-footer" */
        './Footer'
      ),
      DefaultSettings: () => import(
        /* webpackChunkName: "default-settings" */
        './Settings'
      ),
      DefaultView: () => import(
        /* webpackChunkName: "default-view" */
        './View'
      ),
    },
  }
</script>
