//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

// 引入小仓库
import home from './home';
import search from './search';
import detail from './detail';
import shopcart from './shopcart'
import user from './user';
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {}
//准备state对象——保存具体的数据
const state = {}

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
    },
})