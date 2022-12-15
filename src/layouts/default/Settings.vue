<template>
  <div id="settings-wrapper">
    <v-card
      id="settings"
      class="py-2 px-4"
      color="rgba(0, 0, 0, .3)"
      dark
      flat
      link
      min-width="100"
      style="position: fixed; top: 115px; right: -35px; border-radius: 8px; z-index: 1;"
    >
      <v-icon large>
        mdi-cog
      </v-icon>
    </v-card>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      activator="#settings"
      bottom
      content-class="v-settings"
      left
      nudge-left="8"
      offset-x
      origin="top right"
      transition="scale-transition"
    >
      <v-card
        class="text-center mb-0"
        width="300"
      >
        <v-card-text>
          <strong class="mb-3 d-inline-block">SIDEBAR FILTERS</strong>

          <v-item-group
            v-model="color"
            mandatory
          >
            <v-item
              v-for="color in colors"
              :key="color"
              :value="color"
            >
              <template v-slot="{ active, toggle }">
                <v-avatar
                  :class="active && 'v-settings__item--active'"
                  :color="color"
                  class="v-settings__item mx-1"
                  size="25"
                  @click="toggle"
                />
              </template>
            </v-item>
          </v-item-group>

          <v-divider class="my-4 secondary" />

          <strong class="mb-3 d-inline-block">SIDEBAR BACKGROUND</strong>

          <v-item-group
            v-model="userGradient"
            mandatory
          >
            <v-item
              v-for="(scrim, index) in userGradients"
              :key="scrim"
              :value="index"
              class="mx-1"
            >
              <template v-slot="{ active, toggle }">
                <v-avatar
                  :class="active && 'v-settings__item--active'"
                  :color="scrim"
                  class="v-settings__item"
                  size="24"
                  @click="toggle"
                />
              </template>
            </v-item>
          </v-item-group>

          <v-divider class="my-4 secondary" />

          <v-row
            align="center"
            no-gutters
          >
            <v-col cols="auto">
              Dark Mode
            </v-col>

            <v-spacer />

            <v-col cols="auto">
              <v-switch
                v-model="propertyDarkMode"
                class="ma-0 pa-0"
                color="secondary"
                hide-details
              />
            </v-col>
          </v-row>

          <v-divider class="my-4 secondary" />

          <v-row
            align="center"
            no-gutters
          >
            <v-col cols="auto">
              Sidebar Mini
            </v-col>

            <v-spacer />

            <v-col cols="auto">
              <v-switch
                v-model="appMini"
                class="ma-0 pa-0"
                color="secondary"
                hide-details
              />
            </v-col>
          </v-row>

          <v-divider class="my-4 secondary" />

          <v-row
            align="center"
            no-gutters
          >
            <v-col cols="auto">
              Sidebar Image
            </v-col>

            <v-spacer />

            <v-col cols="auto">
              <v-switch
                v-model="appDrawerImage"
                class="ma-0 pa-0"
                color="secondary"
                hide-details
              />
            </v-col>
          </v-row>

          <v-divider class="my-4 secondary" />

          <strong class="mb-3 d-inline-block">IMAGES</strong>

          <v-card
            :disabled="!appDrawerImage"
            flat
          >
            <v-item-group
              v-model="userImage"
              class="d-flex justify-space-between mb-3"
            >
              <v-item
                v-for="(img, index) in userImages"
                :key="img"
                :value="index"
                class="mx-1"
              >
                <template v-slot="{ active, toggle }">
                  <v-sheet
                    :class="active && 'v-settings__item--active'"
                    class="d-inline-block v-settings__item"
                    @click="toggle"
                  >
                    <v-img
                      :src="img"
                      height="100"
                      width="50"
                    />
                  </v-sheet>
                </template>
              </v-item>
            </v-item-group>
          </v-card>

          <v-row no-gutters>
            <v-spacer />
            <v-col cols="auto">
              <v-btn
              color="primary"
              @click="onSaveSettings">
                Cохранить
              </v-btn>
            </v-col>
          </v-row>

        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  // Mixins
  import Proxyable from 'vuetify/lib/mixins/proxyable'
  import {
  mapMutations,
  mapState,
  // mapActions,
  // mapGetters,
} from 'vuex';
  // Vuex
  import {Storage} from '@/services/LocalStorage';
  export default {
    name: 'DashboardCoreSettings',

    mixins: [Proxyable],

    data: () => ({
      color: '#E91E63',
      colors: [
        '#9C27b0',
        '#00CAE3',
        '#4CAF50',
        '#ff9800',
        '#E91E63',
        '#FF5252',
      ],
      menu: false,
      saveImage: '',
    }),
    created() {
      console.log(this.$router);
      console.log(this.$store.state);
      console.log(this);
      //do api request here fill in our data
      console.log(Storage);
      let userInterfaceSettings = Storage.get('pgu-front').user.user.interfaceSettings;
      console.log(userInterfaceSettings);
      this.userGradient = userInterfaceSettings.colorBackground; //устанавливаем бэкграунд меню(drawer)
      this.color = this.colors[userInterfaceSettings.colorFilters];//цвет подсветки пунктов и и подобных вещей
      this.propertyDarkMode = userInterfaceSettings.darkMode;//darkMode есть или нет  $vuetify.theme.dark
      this.appMini = userInterfaceSettings.sidebarMini;//sidebarMini есть или нет
      this.appDrawerImage = userInterfaceSettings.sidebarImage;//sidebarImage есть или нет
      this.userImage = userInterfaceSettings.selectedImage;
    },
    computed: {
      ...mapState({
          darkMode: state => state.user.dark,
          drawer: state => state.app.drawer,
          drawerImage: state => state.app.drawerImage,
          mini: state => state.app.mini,
          gradient: state => state.user.drawer.gradient,
          image: state => state.user.drawer.image,
          userImages: state => state.user.images,
          gradients: state => state.user.gradients,
        }),
        userGradient: {
          get(){
             console.log(this.gradient);
             return this.gradient;
           },
           set(value){
             this.setUserGradient(value);
           } 
        },
        userGradients: {
          get(){
             console.log(this.gradients);
             return this.gradients;
           },
           set(value){
             this.setUserGradients(value);
           } 
        },
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
        userImage: {
          get(){
            console.log('userImage');
             console.log(this.image);
             return this.image;
           },
           set(value){
             this.setUserDrawerImage(value);
           } 
        },
        propertyDarkMode: {
          get(){
            return this.darkMode;
          },
          set(value){
            this.setUserDark(value);
          }
        },

      // ...sync('app', [
      //   'drawer',
      //   'drawerImage',
      //   'mini',
      // ]),
      // ...sync('user', [
      //   'drawer@gradient',
      //   'drawer@image',
      // ]),
      // ...get('user', [
      //   'images',
      //   'gradients',
      // ]),
    },
    methods: {
      ...mapMutations({
          setUserGradient: 'user/setDrawerGradient',
          setAppDrawerImage: 'app/setDrawerImage',
          setAppDrawer: 'app/setDrawer',
          setAppMini: 'app/setMini',
          setUserDrawerImage: 'user/setDrawerImage',
          setUserDark: 'user/setDark'
        }),
    async onSaveSettings() {
        this.$store.dispatch('app/setOverlay', true);
        let form = new FormData();
        form.append('colorBackground', this.userGradient);
        form.append('colorFilters', this.colors.indexOf(this.color));
        form.append('darkMode', Number(this.propertyDarkMode));
        form.append('sidebarMini', Number(this.appMini));
        form.append('sidebarImage', Number(this.appDrawerImage));
        form.append('selectedImage', this.userImage ? this.userImage : 0);
        await this.API.post(`change-user/${this.$store.state.user.user.id}`,form).then((response) => {
          console.log(response);
          this.$store.commit('user/setUser', response.data.user);
        }).catch(() => {
        });
        this.loading = false;
        this.$store.dispatch('app/setOverlay', false);
      },
    },
    watch: {
      color (val) {
        this.$vuetify.theme.themes[this.isDark ? 'dark' : 'light'].primary = val
      },
    },
  }
</script>

<style lang="sass">
  .v-settings
    .v-item-group > *
      cursor: pointer

    &__item
      border-width: 3px
      border-style: solid
      border-color: transparent !important

      &--active
        border-color: #00cae3 !important
</style>
