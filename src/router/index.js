
import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/static/index.vue'
//白名单
const whiteList = [
    "/",
    "/login"
]
import { useUserStore } from '../store/user'

//路由表
const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/static/login.vue'),
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../views/static/index.vue')// 懒加载
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/static/test.vue')
    },
    {
        path: '/homepage',
        name: 'homepage',
        component: () => import('../views/static/homepage.vue')// 懒加载
    },
    {
        path: '/role',
        name: 'role',
        component: () => import('../views/static/role.vue')// 懒加载
    },
    {
        path: '/permission',
        name: 'permission',
        component: () => import('../views/static/permission.vue')// 懒加载
    },
    {
        path: '/userinfo',
        name: 'userinfo',
        component: () => import('../views/static/userinfo.vue')// 懒加载
    },
    {
        path: '/userRole',
        name: 'userRole',
        component: () => import('../views/static/userRole.vue')// 懒加载
    },
    {
        path: '/rolePermission',
        name: 'rolePermission',
        component: () => import('../views/static/rolePermission.vue')// 懒加载
    },
    // {
    //     path: '/admin',
    //     name: 'admin',
    //     component: LayoutAdmin,
    //     children: [
    //         {
    //             path: '',
    //             name: 'home',
    //             component: () => import('@/views/admin/index.vue')
    //         },
    //         {
    //             path: 'index',
    //             name: 'admin-index',
    //             component: () => import('@/views/admin/index.vue')
    //         },

    //         {
    //             path: 'userinfo',
    //             name: 'admin-userinfo',
    //             component: () => import('@/views/admin/userinfo.vue')
    //         },
    //     ]
    // },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/404.vue')// 懒加载
    },
]
const router = createRouter({
    //模式
    history: createWebHashHistory(),
    routes
})
//前置路由守卫
//用户状态 user.js
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    next();
    if (whiteList.includes(to.path)) {
        next();
    }
    else {

        if (userStore.token && userStore.token.length > 0) {
            next()
        }
        else {
            next({ name: "login" })
        }

    }


})
export default router;
