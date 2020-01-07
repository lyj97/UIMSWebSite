import App from '../app'
/**
 * auth true登录才能访问，false不需要登录，默认true
 */
export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/login', //登录
                meta: { auth: false },
                component: resolve => require(['../pages/login/'], resolve)
            },
            {
                path: '/register', //注册
                meta: { auth: false },
                component: resolve => require(['../pages/register/'], resolve)
            },
            {
                path: '/signout', //退出
                component: resolve => require(['../pages/signout/'], resolve)
            },
            {
                path: '/home', //个人主页
                component: resolve => require(['../pages/home/'], resolve)
            },
            {
                path: '/list', //list
                meta: { auth: false },
                component: resolve => require(['../pages/list/'], resolve)
            },
            {
                path: '/search', //search
                component: resolve => require(['../pages/search/'], resolve)
            },
            {
                path: '/jlupages', //JLUPages
                meta: { auth: false },
                component: resolve => require(['../pages/JLUPages/'], resolve)
            },
            {
                path: '/jlupages_new', //JLUPages
                meta: { auth: false },
                component: resolve => require(['../pages/JLUPages_new/'], resolve)
            },
            {
                path: '/version', //version
                meta: { auth: false },
                component: resolve => require(['../pages/version/'], resolve)
            },
            {
                path: '/', //首页
                meta: { auth: false },
                component: resolve => require(['../pages/index/'], resolve)
            },
            {
                path: '*', //其他页面，强制跳转到登录页面
                redirect: '/login'
            }
        ]
    }
]