<template>
<div class="auth__page-login">
    <v-row class="d-flex justify-center">
        <v-col lg="3">
            <span class="subtitle-1">
                Вход в систему
            </span>
            <v-text-field v-model="email" label="Введите свой адрес электронной почты" />
            <v-text-field v-model="password" label="Введите пароль от аккаунта" />
            <v-btn color="secondary" @click.prevent="login">Войти</v-btn>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    name : 'login',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async login() {
            let form = new FormData()
            form.append('email', this.email)
            form.append('password', this.password)
            await this.axios.post('login', form)
        }
    }
}
</script>

<style scoped></style>