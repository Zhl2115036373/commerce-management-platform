// 登录与注册的模块
import { reqGetCode, reqUserRegister } from "@/api"
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        console.log(result)
        if(result.code==200){
            commit('GETCODE',result.data)
        }
    },
    // 用户注册登录
    async getUserRegister({commit},data){
        // console.log(code,phone,password)
        let result = await reqUserRegister(data)
        // 没有返回数据
        if (result.code==200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
        // console.log(result)
    }
}
const mutations ={
    GETCODE(state,code){
        state.code = code
    }
}
const state ={
    code:''
}
const getters ={}
export default {
    namespaced:true,//开启命名空间
    actions,
    mutations,
    state,
    getters
}
