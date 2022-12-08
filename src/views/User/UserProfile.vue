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
                    md="4"
                >
                  <v-select
                      v-model="lang"
                      :items="langs"
                      :label="$t('lang')"
                      item-text="name"
                      item-value="code"
                  ></v-select>
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
          <v-file-input
              v-show="false"
              v-model="newUserImage"
              :error-messages="veeErrors.collect('avatarPath')"
              :rules="avatarRules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
          ></v-file-input>
<!--          <input type="file" ref="inputFile" v-show="false" name="userImage">-->
          <v-badge
              :value="hover"
              color="secondary"
              :content="$t('changePhoto')"
              right
              transition="slide-x-transition"
          >
            <v-hover v-model="hover">
              <v-img
                  v-if="getUser.avatarPath !== null"
                  class="rounded-circle elevation-6 mt-n12 d-inline-block"
                  :src="userImage"
                  width="128"
                  @click="photoHandler"
              ></v-img>
              <v-avatar
                  v-else
                  color="primary"
                  class="elevation-6 mt-n12"
                  size="128"
                  @click="photoHandler"
              ><span class="white--text text-h1">{{ initialsUser() }}</span></v-avatar>
            </v-hover>
          </v-badge>


<!--          <v-avatar-->
<!--              size="156"-->
<!--          >-->
<!--            <v-img-->
<!--                src="https://cdn.vuetifyjs.com/images/john.jpg"-->
<!--                alt="John"-->
<!--            >-->
<!--            </v-img>-->
<!--          </v-avatar>-->
          <v-card-text class="text-center">
            <h6 class="text-h6 mb-2 text--secondary">
              CEO / FOUNDER
            </h6>

            <h4 class="text-h4 mb-3 text--primary">
              {{ name }} {{ surname }}
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
  import {
    mapGetters,
  } from 'vuex';
  // import Vue from 'vue';
  import {BASE_URL, API_URL} from "@/config";

  export default { 
    name: 'UserProfileView',
    data() {
        return {
            langs: [],
            newUserImage: null,
            avatarRules: [
              value => !value || typeof value == 'string' || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
            ],
            hover: false,
            userImage: null,
            loading: false,
            name: '',
            email: '',
            password: '',
            surname: '',
            patronymic: '',
            phone: '',
            lang: null
        }
    },
    async created() {
      this.initialize();

      console.log(this.userImage);
      console.log(typeof this.userImage);
    },
    computed: {
      ...mapGetters({
        getUser: 'user/getUser',
      }),
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
            if( typeof this.lang == 'object' && this.lang !== null) {
              form.append('lang', this.lang.code);
            }
            else {
              form.append('lang', this.lang)
            }

            if(this.newUserImage !== null)
            form.append('avatarPath', this.newUserImage)
            this.loading = true;
            await this.API.post(`change-user-profile/${this.$store.state.user.user.id}`, form).then((success) => {
              console.log(success);
             this.$store.commit('user/setUser', success.data.user);
             this.initialize();
            }).catch((error)  => {
                this.$validationParser(error, this.veeErrors);
                this.$store.dispatch('snackbar/add', {color: 'error', content: 'failedProfileEdit'});
            });
            this.loading = false;
            console.log(this.$store.state);
            this.$store.dispatch('app/setOverlay', false);
        },
      photoHandler() {
        let inputFile = this.$el.querySelector('input[type="file"]');
        inputFile.click();
      },
      initialsUser() {
        return this.name.slice(0,1).toUpperCase() + this.surname.slice(0,1).toUpperCase();
      },
      async initialize() {
        const languages = await this.requestLanguages();
        this.userImage = BASE_URL + '/uploads/' + this.getUser.avatarPath;
        this.name = this.$store.state.user.user.name;
        this.email = this.$store.state.user.user.email;
        this.surname = this.$store.state.user.user.surname;
        this.phone = this.$store.state.user.user.phone;
        this.patronymic = this.$store.state.user.user.patronymic;
        this.lang = {name: this.$t(this.$store.state.user.user.lang), code: this.$store.state.user.user.lang};
        this.$i18n.locale = this.$store.state.user.user.lang ;
        this.fillLanguages(languages);
      },
      async requestLanguages() {
        return await this.API.get(`${API_URL}/lazy/langs`).then((success) => {
            let languages = success.data.item;
            return new Promise(resolve => resolve(languages))
        }).catch((error)  => {
          console.log(error)
          this.$store.dispatch('snackbar/add', {color: 'error', content: 'failedProfileEdit'});
        });
      },
      fillLanguages(languages) {
        this.langs = [];
        languages.forEach((lang) => {
          console.log(this.$t(lang));
          this.langs.push({name: this.$t(lang), code: lang})
        });
      }
    }
  }
</script>
