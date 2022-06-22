<template>
<div class="auth__page-register">
    <v-row class="d-flex justify-center">
        <v-col lg="3"
               cols="9">
            <span class="subtitle-1">
                {{$t('registration')}}
            </span>
            <v-text-field v-model="name" 
                         :label="$t('name')" 
                         :error-messages="veeErrors.collect('name')"/>
            <v-text-field v-model="surname" :label="$t('surName')"/>
            <v-text-field v-model="patronymic" :label="$t('patronymic')"/>
            <v-text-field v-model="email" 
                          :label="$t('email')" 
                          :error-messages="veeErrors.collect('email')"/>
            <v-text-field v-model="password" 
                          :label="$t('password')"
                          :error-messages="veeErrors.collect('password')"/>
            <v-text-field v-model="phone" :label="$t('phone')" />
            <v-btn class="auth__button" color="#41b883" @click.prevent="register">{{$t('acceptSignUp')}}</v-btn>
        </v-col>
    </v-row>
</div>
</template>

<script>
import {API_URL} from "@/config";

export default {
    name : 'register',
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
    methods: {
        async register() {
            this.$store.dispatch('app/setOverlay', true);
            this.veeErrors.clear();
            let form = new FormData()
            form.append('name', this.name)
            form.append('email', this.email)
            form.append('password', this.password)
            form.append('surname', this.surname)
            form.append('patronymic', this.patronymic)
            form.append('phone', this.phone)
            this.loading = true;
            await this.API.postWithoutAuth(API_URL+'/register', form).then(() => {
                this.$router.push('/login');
            }).catch((error)  => {
                this.$validationParser(error, this.veeErrors);
                console.log(error.response.data);
                console.log(error.toJSON());
                console.log(this.veeErrors);
                this.$store.dispatch('snackbar/add', {color: 'error', content: 'errorRegistration'});
            });
            this.loading = false;
            console.log(this.$store.state);
            this.$store.dispatch('app/setOverlay', false);
        }
    }
}
</script>

<style scoped>
</style>