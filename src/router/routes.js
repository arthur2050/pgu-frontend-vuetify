import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
export default [
    
	{
		path: '/',
		name: 'Index',
		component: () => import('@/layouts/default/Index.vue'),
        children:[
            {
                path: '/components/profile/',
                name: 'Profile',
                component: () => import('@/views/User/UserProfile.vue')
            },
            {
                path: '/components/tables/',
                name: 'Tables',
                component: () => import('@/views/Tables/EditedTables.vue')
            },
        ]
	},
	{
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