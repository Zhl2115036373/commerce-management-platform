import {reqSearchList} from '@/api'
//准备actions对象——响应组件中用户的动作
const actions = {
    async getSearchList({commit},v){
        let  result= await reqSearchList(v)
        // console.log(v)
        if(result.code == '200'){
            commit('REQSEARCHLIST',result.data)
        }
    }
}
//准备mutations对象——修改state中的数据
const mutations = {
    REQSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
//准备state对象——保存具体的数据
const state = {
    // 返回的数据是个对象，所以写成对象
    searchList:{}
}
// 当state中的数据需要经过加工后再使用时，可以使用getters加工。
const getters = {
    goodsList(state){
        // state.searchList.goodsList如果服务器数据回来，没问题就是一个数组
        // 如果没网的话state.searchList.goodsList应该返回的是undefined
        return state.searchList.goodsList || {}

    },
    trademarkList(){
        return state.searchList.trademarkList || {}
    },
    attrsList(){
        return state.searchList.attrsList ||{}
    }
}

export default {
    namespaced:true,//开启命名空间
	actions,
    mutations,
    state,
	getters
}