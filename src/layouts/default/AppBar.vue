<template>
  <v-app-bar
    id="default-app-bar"
    app
    absolute
    class="v-bar--underline"
    color="transparent"
    :clipped-left="$vuetify.rtl"
    :clipped-right="!$vuetify.rtl"
    height="70"
    flat
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="appDrawer = !appDrawer"
    />

    <default-drawer-toggle class="hidden-sm-and-down" />

    <v-toolbar-title
      class="font-weight-light text-h5"
      v-text="name"
    />

    <v-spacer />

    <default-search class="hidden-sm-and-down" />

    <default-go-home />

    <default-notifications />

    <default-account />
  </v-app-bar>
</template>

<script>
  import {
  mapMutations,
  mapState,
  // mapActions,
  // mapGetters,
} from 'vuex';
  // Utilities
  export default {
    name: 'DefaultBar',
    data() {
      return {
        name_: ''
      }
    },
    components: {
      DefaultAccount: () => import(
        /* webpackChunkName: "default-account" */
        './widgets/Account'
      ),
      DefaultDrawerToggle: () => import(
        /* webpackChunkName: "default-drawer-toggle" */
        './widgets/DrawerToggle'
      ),
      DefaultGoHome: () => import(
        /* webpackChunkName: "default-go-home" */
        './widgets/GoHome'
      ),
      DefaultNotifications: () => import(
        /* webpackChunkName: "default-notifications" */
        './widgets/Notifications'
      ),
      DefaultSearch: () => import(
        /* webpackChunkName: "default-search" */
        './widgets/Search'
      ),
    },

    computed: {
      ...mapState({
          drawer: state => state.app.drawer,
          mini: state => state.app.mini,
        }),
        appDrawer: {
          get(){
             console.log(this.drawer);
             return this.drawer;
           },
           set(value){
             this.setAppDrawer(value);
           } 
        },
        appMini: {
          get(){
             console.log(this.mini);
             return this.mini;
           },
           set(value){
             this.setAppMini(value);
           } 
        },
      // ...sync('app', [
      //   'drawer',
      //   'mini',
      // ]),
        name() {
           console.log('changed route');
           return this.$route.name ? this.$route.name : 'AppBar';
        }
    },
    methods: {
      ...mapMutations({
          setAppDrawer: 'app/setDrawer',
          setAppMini: 'app/setMini',
        })
    },
  }
</script>
