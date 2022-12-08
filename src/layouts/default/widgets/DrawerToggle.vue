<template>
  <v-btn
    class="ml-3 mr-4"
    elevation="1"
    fab
    small
    @click="appMini = !appMini"
  >
    <v-icon>
      {{ appMini ? 'mdi-format-list-bulleted' : 'mdi-dots-vertical' }}
    </v-icon>
  </v-btn>
</template>

<script>
  // Utilities
  import {
  mapMutations,
  mapState,
  // mapActions,
  // mapGetters,
} from 'vuex';

  export default {
    name: 'DefaultDrawerToggle',

    computed: {
      ...mapState({
          mini: state => state.app.mini,
        }),
        appMini: {
          get(){
             console.log(this.mini);
             return this.mini;
           },
           set(value){
             this.setAppMini(value);
           } 
        },
      // mini: sync('app/mini'),
    },
    methods: {
      ...mapMutations({
          setAppMini: 'app/setMini',
        })
    },
  }
</script>
