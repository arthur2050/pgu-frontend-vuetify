<template>
  <v-app id="app">
    <div class="d-flex justify-end header">
      <div v-if="!isAuth">
        <v-select
          v-model="$i18n.locale"
          :items="langs"
          item-text="text"
          item-value="value"
          label="Solo field"
          dense
          solo
        ></v-select>
         <v-toolbar
      flat
      height="72"
    >
      <v-switch
        v-model="$vuetify.theme.dark"
        hint="This toggles the global state of the Vuetify theme"
        inset
        label="Vuetify Theme Dark"
        persistent-hint
      ></v-switch>
    </v-toolbar>
        <router-link to="/login" class="header__link">{{$t('signIn')}}</router-link> |
        <router-link to="/register" class="header__link">{{$t('signUp')}}</router-link>
      </div>
    </div>
    <router-view/>
    <v-snackbar v-model="snackbarDisplayed"
                :timeout="snackbar.current.timeout"
                :color="snackbar.current.color"
                :multi-line="snackbar.current.content > 60"
                bottom
                :left="snackbar.current.position==='left'"
                :right="snackbar.current.position==='right'">
      <v-icon v-if="snackbar.current.icon"
              :color="snackbar.current.iconColor"
              class="pr-1">
        {{snackbar.current.icon}}
      </v-icon>
      <template v-else-if="$t(snackbar.current.content)">
        {{$t(snackbar.current.content, snackbar.current.parameters)}}
      </template>
      <template v-else>
        {{snackbar.current.fallback}}
      </template>
      <template v-slot:action="{attrs}">
        <v-btn text
               dark
               v-bind="attrs"
               @click.native="snackbarDisplayed = false">
          {{$t('close')}}
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="isOverlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
  import '@/styles/overrides.sass';
  import {
  mapMutations,
  mapState,
  mapActions,
  mapGetters,
} from 'vuex';


  export default {
  data () {
    return {
      data: {},
      darkTheme: false,
      title: 'Vuetify.js',
      langs: [
        {text:'English',value:'en'}, 
        {text:'Русский',value:'ru'}, 
        {text:'Română',value:'md'}, 
        {text:'Український',value:'ua'}, 
      ],
    };
  },
  computed: {
    ...mapState({
      nav: state => state.nav,
      snackbar: state => state.snackbar,
      loaders: state => state.loaders,
      systemOptions: state => state.options,
      isOverlay: state => state.app.isOverlay
    }),
    ...mapGetters({
      hasRole: 'user/hasRole',
      isAuth: 'auth/isAuthenticated'
    }),
    snackbarDisplayed: {
      get () {
        return this.snackbar.show;
      },
      set (value) {
        if (value) this.showSnackbar();
        else this.hideSnackbar();
      },
    },
    routeKey () {
      if (this.$route.meta !== undefined && this.$route.meta.ignoreChildPath) {
        return this.$route.meta.rootPath;
      } else {
        return this.$route.path;
      }
    },
  },
  async created () {
    this.startNowTimer();
    // this.setCollapsedClass();
     // const success  = await this.API.get(['/']);
    // this.data      = success.data;
    // this.isLoading = false;
     // this.setUser(success.data.user);
     // this.setRoles(success.data.roles);
    // this.setLocale(success.data.user.locale);
  },
  methods: {
    ...mapMutations({
      setDrawer: 'nav/setDrawer',
      setUser: 'user/setUser',
      setRoles: 'user/setRoles',
      setLocale: 'options/setLocale',
      setLocaleShort: 'options/setLocaleShort',
    }),
    ...mapActions({
      showSnackbar: 'snackbar/show',
      hideSnackbar: 'snackbar/hide',
      startNowTimer: 'time/start',
      setCollapsedClass: 'nav/setCollapsedClass',
    }),
  },
};
</script>
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
