import { reqGoodsInfo, reqAddOrUpdateShopCart} from "@/api"
import {getNanoid} from '@/utils/nanoid_token'
const actions ={
    // 获取产品信息的actions
    async getGoodInfo({commit},skuId){
        // 发请求
        let result = await reqGoodsInfo(skuId)
            if(result.code==200){
                commit('GETGOODINFO',result.data)
            }
    },
    async AddOrUpdateShopCart({commit},{skuId,skuNum}){
        // 解构dispatch中的对象
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code==200){
            //如果加入购物车成功,返回promise即为成功
            return 'ok'
        }else{
            //如果加入购物车失败，返回失败的Promise
            return Promise.reject();
        }
        
        
    }
}
const mutations ={
    GETGOODINFO(state,value){
        state.goodInfo=value
    },
}
const state ={
    goodInfo:{},
    nanoid_id:getNanoid()
}
const getters ={
    // 路径导航简化的数据
    categoryView(){
        // 起始数据已经回来了程序才能正常走下去 goodInfo起始是个空对象
        // 数据没回来至少得让goodInfo中的categoryView是个空对象
        return state.goodInfo.categoryView||{}
    },
    // 简化产品信息的数据
    skuInfo(){
        return state.goodInfo.skuInfo||{}
    },
    // 简化产品售卖属性的数据
    spuSaleAttrList(){
        return state.goodInfo.spuSaleAttrList||[]
    },

}
export default {
    namespaced:true,//开启命名空间
    actions,
    mutations,
    state,
    getters
}