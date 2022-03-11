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
            <v-btn class="auth__button" color="#41b883" @click.prevent="register">Зарегистрироваться</v-btn>
        </v-col>
    </v-row>
    <v-snackbar height="100" v-model="snackbar.show" :centered="true">
        <span>{{snackbar.message}}</span>
        <template #action>
            <v-btn
            color="red"
            text
            @click="snackbar.show = false"
            >
            Закрыть
            </v-btn>
        </template>
    </v-snackbar>
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
            snackbar: {
                show: false,
                mode: undefined, // success or fail
                message: ''
            }
        }
    },
    methods: {
        async register() {
            let form = new FormData()
            form.append('name', this.name)
            form.append('email', this.email)
            form.append('password', this.password)
            form.append('phone', this.phone)
            await this.axios.post('register', form).then(() => {
                this.$router.push('/login')
            }).catch(() => {
                if(!this.snackbar.show) {
                    this.snackbar = {
                        ...this.snackbar,
                        show: true,
                        mode: 'fail',
                        message: 'Не удалось зарегистрироваться! Возможно, пользователь с данным e-mail уже существует'
                    }
                }
            })
        }
    }
}
</script>

<style scoped></style>