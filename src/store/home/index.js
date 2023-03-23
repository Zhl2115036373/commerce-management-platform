import { reqCategoryList,bannerList,reqFloorList } from "@/api";

//准备actions对象——响应组件中用户的动作
const actions = {
    // 通过api里的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList(context){
        //获取服务器的数据,存储在vuex仓库中
        //reqCategory函数执行,返回的是Promise对象【pending、成功、失败】
        //await 等待成功的结果
        let result = await reqCategoryList()
        // console.log(result,'home,index.js')
        if(result.code==200){
            context.commit('CATEGORYLIST',result.data)
        }
    },
    //获取banner图的action
    async getBannerList({commit}){
        let result = await bannerList()
        // console.log(result,'home,index.js')
        // console.log('action执行了，获取服务器数据')  
        if(result.code==200){
            commit('BANNERLIST',result.data)
        }
    },
    //获取Floor组件的数据
    async getFloorList({commit}){
        let result = await reqFloorList()
        // console.log(result.data)
        if(result.code==200){
            commit('REQFLOORLIST',result.data)
        }
    }
}
//准备mutations对象——修改state中的数据
const mutations = {
    CATEGORYLIST(state,value){
        // console.log(state,value,'home0,index.js')
        state.categoryList = value
        // state.categoryList = value.slice(0,16) //开启命名空间写法
    },
    BANNERLIST(state,bannerList){
        // console.log(state,bannerList,'home0,index.js')
        // console.log('mutations执行了，修改state中数据')
        state.bannerList = bannerList
    },
    REQFLOORLIST(state,reqFloorList){
        state.reqFloorList =reqFloorList
    }
}
//准备state对象——保存具体的数据
const state = {
    categoryList:[],
    bannerList:[],
    reqFloorList:[]
    }
// 当state中的数据需要经过加工后再使用时，可以使用getters加工。
const getters = {}

export default {
    namespaced:true,//开启命名空间
	actions,
    mutations,
    state,
	getters
}