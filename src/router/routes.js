import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'

export default [{
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]