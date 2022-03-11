<template>
<div class="auth__page-login">
    <v-row class="d-flex justify-center">
        <v-col lg="3">
            <span class="subtitle-1">
                Вход в систему
            </span>
            <v-text-field v-model="email" label="Введите свой адрес электронной почты" />
            <v-text-field v-model="password" label="Введите пароль от аккаунта" />
            <v-btn class="auth__button" color="#41b883" @click.prevent="login">Войти</v-btn>
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
            snackbar: {
                show: false,
                mode: undefined, // success or fail
                message: ''
            }
        }
    },
    methods: {
        async login() {
            let form = new FormData()
            form.append('email', this.email)
            form.append('password', this.password)
            await this.axios.post('login', form).then(() => {
                this.$router.push('/')
            }).catch(() => {
                if(!this.snackbar.show) {
                    this.snackbar = {
                        ...this.snackbar,
                        show: true,
                        mode: 'fail',
                        message: 'Не удалось войти в систему! Проверьте введенные данные!'
                    }
                }
            })
        }
    }
}
</script>

<style scoped></style>