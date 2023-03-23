<template>
  <div class="type-nav">
    <div class="container" >
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2"  @click="goSearch">
              <div class="item bo" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex == index}">
                <h3 @mousemove="changeIndex(index)"  >
                  <a :data-categoryName='c1.categoryName' :data-category1id='c1.categoryId'>{{c1.categoryName}}</a>
                  <!-- 用声明式导航滑动三级联动很卡顿，因为它要在一瞬间生成很多组件以及转化dom，我们不采用
                  <router-link to="/search">{{c1.categoryName}}</router-link> -->
                </h3>
                <!-- 二三级分类 -->
                <!-- 通过JS实现动态行内样式，进行二级、三级分类的显示与隐藏(display:none|block切换的) -->
                <div class="item-list clearfix" :style="{'display': currentIndex==index? 'block': 'none'}">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName='c2.categoryName' :data-category2id='c2.categoryId'>{{c2.categoryName}}</a>
                        <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName='c3.categoryName'  :data-category3id='c3.categoryId'>{{c3.categoryName}}</a>
                          <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                        </em>
                        
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      
    </div>
    <!-- <p>{{num}}</p> -->
  </div>
</template>

<script>
// 引入节流（规定时间内无论点多少次只触发一次
import throttle from '/node_modules/lodash/throttle'
// import { state } from '@/store/user';
import {mapState, mapGetters} from 'vuex'
export default {
  name: "TypeNav",
  data() {
    return {
      // 储存用户鼠标移上哪一个一级分类
      currentIndex:-1,
      // 是否显示三级联动
      show:true
    }
  },

  computed:{
    // 程序员自己写代码
    // categoryList(){
    //   return this.$store.state.home.categoryList
    // },

    // 借助mapState生成计算属性，从state中读取数据。（开启命名空间 对象写法）
    // ...mapState('home',{categoryList:'categoryList'}),

    // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
    // 注入一个参数state，其实即为大仓库中的数据
    ...mapState({
      categoryList:(state)=>{
        return state.home.categoryList.slice(0,16)
      },
    }),

  },

  mounted(){
    // this.$store.dispatch('categoryList')
  //  console.log('home',this.$store.state.home.categoryList) 
    if(this.$route.path !=='/home'){
      this.show=false
    }
  
  },
  
  methods: {
    // 鼠标进入 修改响应式数据currentIndex属性
    // changeIndex(index){
    //   this.currentIndex = index
    //   console.log('9')
    // },

    changeIndex:throttle(function(index){
      this.currentIndex = index
      // console.log(index)
    }, 50),
    // 一级菜单鼠标移出事件的回调
    // 鼠标离开时会将商品分类隐藏
    leaveIndex(){
      this.currentIndex = -1
      // 如果不是首页，就展示三级联动
      if(this.$route.path !=='/home'){
        this.show=false
      }
      
    },
    // 进行路由跳转的方法
    goSearch(event){
    //最好的解决方案:编程式导航 + 事件委派
    //存在一些问题:事件委派，是把全部的子节点[h3、dt、d1、em] 的事件委派给父亲节点
    //点击a标签的时候，才会进行路由跳转[怎么能确定点击的一定是a标签]
    //存在另外一个问题: 即使你能确定点击的是a标签， 如何区分是一级、二级、三级分类的标签。
    //第一个问题:把子节点当中a标签，我加上自定义属性data-categoryName，其余的子节点是没有的
    
      console.log(event.target.dataset,'search')
      // 给a标签添加自定义届性data-categoryName,全部的字标签当中只有a标签带有自定义属性，别的标签名字----dataset纯属扯淡
      let {categoryname,category1id,category2id,category3id} = event.target.dataset
      // 能进入这个if：一定是a标签
      if(event.target.tagName=='A'){
        // 整理路由跳转的参数
        let location = {name: 'search'}
        let query = {categoryName:event.target.text}
        // this.$router.push('/search')
        console.log(location,query ,'???')

        // 一级二级三级分类的a标签
        // 一定是啊标签：一级目录
        if(category1id){
            query.category1Id=category1id
        }else if(category2id){
          query.category2Id=category2id
        }else if(category3id){
          query.category3Id=category3id
        }
        
        
        if(this.$route.params){
          location.params = this.$route.params
          // 动态给location配置对象添加query属性
          location.query=query
          
        }
        this.$router.push(location).catch(err=>{
          
        })
        // console.log(this.$route.query,'///')
      }
      
    },
    // 鼠标移入的时候，让商品分类进行展示
    enterShow(){
      if(this.$route.path !=='/home'){
        this.show=true
      }
      
    }
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // 这个可以实现练习js
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        // .item:hover{
        //   background-color: skyblue;
        // }
        .cur{
          background-color: skyblue;
        }
      }
    }
// 过渡动画的样式
    .sort-enter {
      height: 0px;
    }
    
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all .5s linear;
    }
  }
}
</style>
