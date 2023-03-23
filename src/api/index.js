// 当前这个模块 api进行统一管理
import requsts from "./request";
import mockAjax from "./mockAjax";
// import 

// 三级联动接口
// /api/product/getBaseCategoryList
//箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
//下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
//return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
export const reqCategoryList = ()=>{
    return requsts({url:'/product/getBaseCategoryList',method:'get'})
}

//获取首页轮播图数据的接口
export const bannerList =()=>{
    return mockAjax({url:'/banner',method:'get'})
}

// 获取floor数据
export const reqFloorList = ()=>{
    return mockAjax({url:'/floor',method:'get'})
}

// 搜索模块的请求接口函数:
// 地址 方式 要带参数 params默认是个空对象 (params={})=>{
export const reqSearchList = (params)=>{
    return requsts({url:'/list',method:'post',data:params})
}

// 产品页的接口
export const reqGoodsInfo = (skuId) =>{
    return requsts({url:`/item/${skuId}`,method:'get'})
}

// /api/cart/addToCart/{ skuId }/{ skuNum }
// 将产品添加到购物车中 获取某一个产品的个数
export const reqAddOrUpdateShopCart=(skuId,skuNum) =>{
    return requsts({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
}

// 获取购物车列表的数据
// /api/cart/cartList get请求
export const reqShopCart = ()=>{
    return requsts({url:'/cart/cartList',method:'get'})
}

// 删除购物车的商品
// /api/cart/deleteCart/{skuId} delete请求
export const reqDeleteCart= (skuId)=>{
    return requsts({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}

// 切换某一个商品的勾选状态
// /api/cart/checkCart/{skuID}/{isChecked} get请求
export const reqUpdateCheckedById=(skuId,isChecked)=>{
    return requsts({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}

// 获取验证码
// /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone)=>{
    return requsts({url:`/user/passport/sendCode/${phone}`,method:'get'})
}

// 注册
// /api/user/passport/register
export const reqUserRegister = (data) =>{
    return requsts({url:'/user/passport/register',method:'post',data:data})
}
