import  {reqShopCart,reqDeleteCart,reqUpdateCheckedById}  from '@/api'
const actions = {
    // 获取购物车列表
    async getCartList({commit}){
        let result = await reqShopCart()
        if(result.code==200){
            // console.log(result.data,'pp')
            commit('GETCARTLIST',result.data)
        }
    },
    // 删除购物车中某个商品
    async getDeleteCart(context,skuId){
        let result = await reqDeleteCart(skuId)
        console.log(result,skuId)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject()
        }
    },
    // 切换某一个商品的勾选状态
    async getUpdateCheckedById(context,{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        console.log(skuId,isChecked,'##')
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    // 删除全部勾选的产品
    getdeleteAllChecktedCart({getters,dispatch}){
        //Promise.all():参数需要的是一个数组【数组里面需要promise】 Promise.all([p1,p2,p3...])
          //Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
          //成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            console.log(item.isChecked,'item.isChecked')
            let promise = item.isChecked===1?dispatch('getDeleteCart',item.skuId):''
            PromiseAll.push(promise)
        });
        // Promise.all会判断是否成功，所以不需要await了
        return Promise.all(PromiseAll);
    },
    // 选中的全部商品
    getUpdateAllChecked({getters,dispatch},isChecked){
            getters.cartList.cartInfoList.forEach((item)=>{
                let PromiseAll=[]
                if(item.isChecked=='0'){
                    dispatch('getUpdateCheckedById',{skuId:item.skuId,isChecked})
                }
                item.isChecked=isChecked
                
                // let promise = item.isChecked==0?dispatch('getUpdateCheckedById',{skuId:item.skuId,isChecked}):''
                    PromiseAll.push(promise)
                    console.log(PromiseAll,'ppp')
            });
            return Promise.all(PromiseAll);
    }
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const state ={
    cartList:[]
}
const getters={
    cartList(state){
        return state.cartList[0]||{}
    },
    // 计算出购物车的数据
    // cartInfoList(state){
    //     return state.cartList[0].cartInfoList||[]
    // }
}
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}