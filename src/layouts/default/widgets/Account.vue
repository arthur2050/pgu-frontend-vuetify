<template>
  <v-menu
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-list
      :tile="false"
      flat
      nav
    >
      <template v-for="(p, i) in profile">
        <v-divider
          v-if="p.divider"
          :key="`divider-${i}`"
          class="mb-2 mt-2"
        />
        <div v-else
             :key="`item-${i}`"
              v-on="p.handler !== undefined ? {click: p.handler} : {}">
        <app-bar-item>
          <v-list-item-title v-text="p.title"  />
        </app-bar-item>
        </div>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'DefaultAccount',
    data () {
      return {
          profile: [
          { title: 'Profile',  handler: this.onProfile },
          { title: 'Settings', handler: undefined },
          { divider: true },
          { title: 'Log out' , handler: this.onLogout },
        ]
      }
    },
    methods: {
      onLogout() {
        console.log('onLogout');
        this.$store.commit('auth/resetToken');
        this.$router.push('/login');
      },
      onProfile() {
        if(this.$route.name == "Profile") return;
        this.$router.push({name: "Profile"});
      }
    },
  }
</script>
