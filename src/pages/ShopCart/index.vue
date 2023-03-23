<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.skuId">
          <li class="cart-list-con1">
            <input type="checkbox" 
            name="chk_list" 
            :checked='cart.isChecked ===1'
            @change="updateChecked(cart,$event)"
            >
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum * cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" 
        :checked="isAllCheck"
        @change="updateAllChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from '/node_modules/lodash/throttle'
import {mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    computed:{
      ...mapGetters('shopcart',['cartList']),
      // 计算出购物车的数据
      cartInfoList(){
        return this.cartList.cartInfoList||[]
      },
      //购物车商品总价
    totalPrice(){
      let sum = 0
      this.cartInfoList.forEach(element => {
        sum += element.skuNum*element.skuPrice 
      });
      return sum
    },
    // 是否全选
    isAllCheck(){
      // every遍历数组里面的原理，只要全部元素isChecked属性都为1 则为真 只要有一个不是1  就为false
        return this.cartInfoList.every(item=>item.isChecked==1)
      }
    
    },
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        this.$store.dispatch('shopcart/getCartList')
      },
      // 修改购物车商品的数量
      handler: throttle(async function(type,disNum,cart){
        // type: 为了区分三个元素是哪一个
        //disNum: + (变化量 1 ) - (变化量 -1 ) input是最终的个数 (不是变化量 )
        // cart: 哪一个产品， 需要里面的id
        switch (type) {
          // 加
          case 'add':
            disNum = 1
            break;
          case 'minus' :
            // 判断产品个数是否大于1
            // 减的操作 至少加入购物车的数量最低1个
            if(cart.skuNum>1){
                disNum =-1
            }else{
              disNum=0
            }
            break;
            // input框中的值 用户输入最终的值，可能非法（带有汉字）
          case 'change':
            if(isNaN(disNum)||disNum<1){
              disNum=0
            }else{
              disNum= parseInt(disNum) - cart.skuNum
            }
        }
        // console.log(cart.skuNum,disNum,'097')
        //发请求：修改商品的个数
        try {
              await this.$store.dispatch('detail/AddOrUpdateShopCart',{skuId:cart.skuId,skuNum:disNum})
              this.getData()
        } catch (error) {
          alert('修改数量失败')
        }

      },500),
      // 删除某一个产品的操作
      async deleteCartById(skuId){
          try {
                await  this.$store.dispatch('shopcart/getDeleteCart',skuId)
                this.getData()
          } catch (error) {
              alert('删除商品失败')
          }
    },
    // 切换某一个商品的勾选状态
    updateChecked(cart,event){
      try {
            // 带给服务器的参数是Checked，不是布尔值，应该是0|1
          // console.log(event.target.checked,'000')
          let isChecked = event.target.checked==true ? '1':'0'
          this.$store.dispatch('shopcart/getUpdateCheckedById',{skuId:cart.skuId,isChecked})
          this.getData()
      } catch (error) {
              alert(error.message)
            }
    },
    // 删除勾选的产品
    // async
      deleteAllCart(){
      // 有bug，如果一次性删除的商品较多，那重新获取商品数据的请求会先完成，页面需要手动刷新才行
      try {
        // await
        this.$store.dispatch('shopcart/getdeleteAllChecktedCart')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
      
    },
    //全选的业务
    async updateAllChecked(event){
      let isChecked=event.target.checked?'1':'0'
      try {
          // console.log(isChecked,'alert(error.message)')
          await this.$store.dispatch('shopcart/getUpdateAllChecked',isChecked)
          this.getData()
      } catch (error) {
          // alert(error.message)
      }
    }
      
    },

  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }



          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>