<template>
  <v-container
    id="user-profile-view"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
          <template #title>
            Edit Profile — <small class="text-body-1">Complete your profile</small>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row> 
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="name" 
                    :label="$t('name')" 
                    :error-messages="veeErrors.collect('name')"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="email" 
                    :label="$t('email')"
                    :error-messages="veeErrors.collect('email')"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="surname" 
                    :label="$t('surName')"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="phone" 
                    :label="$t('phone')"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="patronymic" 
                    :label="$t('patronymic')"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <app-card class="mt-4 text-center">
          <v-img
            class="rounded-circle elevation-6 mt-n12 d-inline-block"
            src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
            width="128"
          />

          <v-card-text class="text-center">
            <h6 class="text-h6 mb-2 text--secondary">
              CEO / FOUNDER
            </h6>

            <h4 class="text-h4 mb-3 text--primary">
              John Leider
            </h4>

            <p class="text--secondary">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione dolorem deserunt veniam tempora magnam quisquam quam error iusto cupiditate ducimus, et eligendi saepe voluptatibus assumenda similique temporibus placeat animi dicta?
            </p>

            <v-btn
              class="mr-0"
              color="primary"
              min-width="100"
              rounded
            >
              Follow
            </v-btn>
          </v-card-text>
        </app-card>
      </v-col>
    </v-row>
    <v-row>
        <v-col
          cols="12"
          class="text-right"
        >
          <v-btn
            color="primary"
            min-width="150"
            @click="editProfile"
          >
            Update Profile
          </v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default { 
    name: 'UserProfileView',
    data() {
        return {
            loading: false,
            name: '',
            email: '',
            password: '',
            surname: '',
            patronymic: '',
            phone: '',
        }
    },
    async created() {
      this.name = this.$store.state.user.user.name;
      this.email = this.$store.state.user.user.email;
      this.surname = this.$store.state.user.user.surname;
      this.phone = this.$store.state.user.user.phone;
      this.patronymic = this.$store.state.user.user.patronymic; 
    },
    methods: {
      async editProfile() {
            this.$store.dispatch('app/setOverlay', true);
            this.veeErrors.clear();
            let form = new FormData()
            form.append('name', this.name)
            form.append('email', this.email)
            form.append('surname', this.surname)
            form.append('phone', this.phone)
            form.append('patronymic', this.patronymic)
            this.loading = true;
            await this.API.post(`change-user-profile/${this.$store.state.user.user.id}`, form).then((success) => {
              console.log(success);
             this.$store.commit('user/setUser', success.data.user);
            }).catch((error)  => {
                this.$validationParser(error, this.veeErrors);
                this.$store.dispatch('snackbar/add', {color: 'error', content: 'failedProfileEdit'});
            });
            this.loading = false;
            console.log(this.$store.state);
            this.$store.dispatch('app/setOverlay', false);
        }
    } 
  }
</script>
