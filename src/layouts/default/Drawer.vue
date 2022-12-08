<template>
  <v-navigation-drawer
    id="default-drawer"
    v-model="appDrawer"
    :dark="dark"
    :right="$vuetify.rtl"
    :src="appDrawerImage ? image : ''"
    :mini-variant="appMini"
    mini-variant-width="80"
    :expand-on-hover="false"
    app
    width="260"
  >
    <template
      v-if="appDrawerImage"
      #img="props"
    >
      <v-img
        :key="image"
        :gradient="gradient"
        v-bind="props"
      />
    </template>

    <div class="px-2">
      <default-drawer-header />

      <v-divider class="mx-3 mb-2" />

      <default-list :items="items" />
    </div>

    <template #append>
      <div class="pa-4 text-center">
        <app-btn
          class="text-none mb-4"
          color="white"
          href="https://vuetifyjs.com"
          small
          text
        >
          Documentation
        </app-btn>

      </div>
    </template>

    <div class="pt-12" />
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
  mapMutations,
  mapState,
  // mapActions,
  mapGetters,
} from 'vuex';
  export default {
    name: 'DefaultDrawer',

    components: {
      DefaultDrawerHeader: () => import(
        /* webpackChunkName: "default-drawer-header" */
        './widgets/DrawerHeader'
      ),
      DefaultList: () => import(
        /* webpackChunkName: "default-list" */
        './List'
      ),
    },

    computed: {
      // ...get('user', [
      //   'dark',
      //   'gradient',
      //   'image',
      // ]),
      // ...get('app', [
      //   'items',
      //   'version',
      // ]),
      // ...sync('app', [
      //   'drawer',
      //   'drawerImage',
      //   'mini',
      // ]),
    ...mapState({
          items: state => state.app.items,
          drawer: state => state.app.drawer,
          drawerImage: state => state.app.drawerImage,
          mini: state => state.app.mini,
          userImages: state => state.user.images,
          gradients: state => state.user.gradients,
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
        appDrawerImage: {
          get(){
             console.log(this.drawerImage);
             return this.drawerImage;
           },
           set(value){
             this.setAppDrawerImage(value);
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
        ...mapGetters({
          gradient: 'user/gradient',
          image: 'user/image',
          dark: 'user/dark',
        })
    },
    methods: {
      ...mapMutations({
          setAppDrawerImage: 'app/setDrawerImage',
          setAppDrawer: 'app/setDrawer',
          setAppMini: 'app/setMini',
        })
    },
  }
</script>

<style lang="sass">
#default-drawer
  .v-list-item
    margin-bottom: 8px

  .v-list-item::before,
  .v-list-item::after
    display: none

  .v-list-group__header__prepend-icon,
  .v-list-item__icon
    margin-top: 12px
    margin-bottom: 12px
    margin-left: 4px

  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important
</style>
