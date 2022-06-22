<template>
<div class="auth__page-login">
    <v-row class="d-flex justify-center">
        <v-col lg="3"
               cols="9">
            <span class="subtitle-1">
                {{$t('loginSystem')}}
            </span>
            <v-text-field v-model="email" :label="$t('inputEmailAddress')" />
            <v-text-field v-model="password" 
                          :label="$t('inputPassword')" 
                          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="showPass ? 'text' : 'password'"
                          @click:append="showPass = !showPass"/>
            <v-btn class="auth__button" color="#41b883" @click.prevent="login">{{$t("acceptSignIn")}}</v-btn>
        </v-col>
    </v-row>
</div>
</template>

<script>

import {API_URL} from "@/config";
export default {
    name : 'login',
    data() {
        return {
            showPass:false,
            loading: false,
            email: '',
            password: '',
            snackbar: {
                show: false,
                mode: undefined, // success or fail
                message: ''
            },
        }
    },
    methods: {
        async login() {
            this.$store.dispatch('app/setOverlay', true);
            console.log(this.$store);
            let form = new FormData()
            form.append('email', this.email)
            form.append('password', this.password)
            this.loading = true;
            console.log(this.API);
            await this.API.postWithoutAuth(API_URL+'/login',form).then((response) => {
                this.$store.commit('user/setUser', response.data.user);
                console.log(response.data);
                this.$store.commit('auth/setToken', response.data.token);
                console.log(response);
                this.$router.push('/');
            }).catch(() => {
            });
            this.loading = false;
            this.$store.dispatch('app/setOverlay', false);
        }
    }
}
</script>

<style scoped></style>