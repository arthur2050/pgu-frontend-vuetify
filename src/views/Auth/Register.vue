<template>
<div class="auth__page-register">
    <v-row class="d-flex justify-center">
        <v-col lg="3">
            <span class="subtitle-1">
                Регистрация
            </span>
            <v-text-field v-model="name" label="Введите ваш ник" />
            <v-text-field v-model="email" label="Введите адрес электронной почты" />
            <v-text-field v-model="password" label="Придумайте пароль" />
            <v-text-field v-model="phone" label="Введите номер телефона" />
            <v-btn color="secondary" @click.prevent="register">Зарегистрироваться</v-btn>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    name : 'register',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            phone: '',
        }
    },
    methods: {
        async register() {
            let form = new FormData()
            form.append('name', this.name)
            form.append('email', this.email)
            form.append('password', this.password)
            form.append('phone', this.phone)
            await this.axios.post('register', form)
        }
    }
}
</script>

<style scoped></style>