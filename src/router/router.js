// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from "@/pages/Detail"
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
export default [
    {
        path: '/',
        redirect: '/home',
        // redirect: '/search',
        
    },
    {
        path: '/home',
        component: Home,
        // 路由元信息不能瞎写，只能叫meta 
        meta: {show: true}
    },
    {
        // 登录
        path: '/login',
        component: Login,
        meta: {show: false}
    },
    {
        // 注册
        path: '/register',
        component: Register,
        meta: {show: false}
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        // /:keyword
        component: Search,
        meta: {show: true},
        props: true
    },
    {
        name: 'detail',
        path: '/detail/:skuId?',
        component: Detail,
        meta: {show: true},
        props: true
    },
    {
        name: 'AddCartSuccess',
        path: '/addcarsuccess',
        component: AddCartSuccess,
        meta: {show: true},
        props: true
    },
    {
        name: 'ShopCart',
        path: '/shopcart',
        component: ShopCart,
        meta: {show: true},
        props: true
    },
]