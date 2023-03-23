<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑部分-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- v-if如果为空则是false，字符串则为true -->
            <!--商品的名字的面包屑的地方  -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 展示面包屑关键字的信息 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!--展示面包屑品牌的信息  -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
            <!--展示面包屑的售卖属性  -->
            <li class="with-x" v-for="(props,index) in searchParams.props" :key="index">{{props.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>

          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo='trademarkInfo' @attrInfo='attrInfo' />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: isOne}" @click="changeOrder('1')">
                  <a >综合<span v-show="isOne" :class="{'el-icon-bottom':isDesc,'el-icon-top':isAsc}" ></span></a>
                </li>
                <li :class="{active: isTwo}" @click="changeOrder('2')">
                  <a >销量<span v-show="isTwo" :class="{'el-icon-bottom':isDesc,'el-icon-top':isAsc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goodsList in goodsList" :key="goodsList.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank">
                      <img :src="goodsList.defaultImg" />
                      </a> -->
                      <router-link :to="`/detail/${goodsList.id}`">
                        <img :src="goodsList.defaultImg" />
                      </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{goodsList.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" >{{goodsList.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo='searchParams.pageNo' :pageSize='searchParams.pageSize' :total='total' :continues='5' @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapState,mapGetters} from 'vuex'
  export default {
    name: 'Search',
    data() {
      return {
        searchParams:{
          // 一级分类id
          "category1Id": "",
          "category2Id": "",
          "category3Id": "",
          // query参数
          "categoryName": "",
          // params的参数关键字
          "keyword": "",
          // 排序
          "order": "1:desc",
          // 当前的页数
          "pageNo": 1,
          // 一页显示多少条数据
          "pageSize": 3,
          // 平台售卖属性
          "props": [],
          // 品牌
          "trademark": ""
        }
      }
    },
    components: {
      SearchSelector
    },
    // 在mounted之前触发，将请求之前带有的参数修改
    //钩子函数:beforeCreate、created、beforeMount.执行都是在mounted之前
  //整理参数不能在：beforeCreate因为不能获取VC属性、方法
    beforeMount(){
      Object.assign(this.searchParams,this.$route.query,this.$route.params)

      // console.log(this.$route.params,';')
    },
    mounted(){
      // 在发请求之前带给服务器searchParams参数
    //组件挂载完毕发一次请求
      this.getData()
      // this.$store.dispatch('search/getSearchList')
      
    },
    computed:{
      // ...mapState('search',{searchList:'searchList'}),
      // searchList(){
      //   return this.$store.state.search.searchList
      // }
      ...mapGetters('search',{goodsList:'goodsList'}),
      isOne(){
        return this.searchParams.order.indexOf('1')!==-1
      },
      isTwo(){
        return this.searchParams.order.indexOf('2')!==-1
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc')!==-1
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc')!==-1
      },
      // 自定义事件的回调
      total(){
        return this.$store.state.search.searchList.total
      }
    },
    methods:{
      getData(){

        this.$store.dispatch('search/getSearchList',this.searchParams)
        // 将id置空，因为 Object.assign进行合并的时候，只会覆盖有值的属性，没有的属性值会保留下来
        // 置空可以用""或者undefined,用undefined服务器就不会带这个属性请求数据
        this.searchParams.category1Id=undefined
        this.searchParams.category2Id=undefined
        this.searchParams.category3Id=undefined
      },
      //清除面包屑-商品名字
      removeCategoryName(){
        this.searchParams.categoryName=undefined
        // 也要清除地址栏上的categoryName信息，路由自己跳自己
        if(this.$route.params){
              this.$router.push({name:'search',params:this.$route.params})
        }
      },
      // 清除面包屑-关键字  因为header组件中也有keyword所以也需要清除，涉及到兄弟组件通信$bus
      removeKeyword(){
        this.searchParams.keyword=undefined
        if(this.$route.query){
            this.$router.push({name:'search',query:this.$route.query})
            this.$bus.$emit('clear')
          }
      },
      // 自定义事件的回调
      trademarkInfo(trademark){
        this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`
                this.searchParams.categoryName=undefined
        this.getData()
        // this.searchParams.props=[]

      },
      // 收集平台属性地方回调（自定义事件）
      attrInfo(attr,attrValue){
        let props=`${attr.attrId}:${attrValue}:${attr.attrName}`
        // 判断searchParams.props数组中是否有props，没有再push
        if(this.searchParams.props.indexOf(props)==-1){
            this.searchParams.props.push(props)
            this.getData()
        }
      },
      // 清除面包屑-品牌
      removeTrademark(){
        this.searchParams.trademark=undefined
        this.getData()
      },
      // 清除面包屑-售卖属性
      removeAttr(index){
        // 整理参数
        this.searchParams.props.splice(index,1)
        this.getData()
      },
      // 改变排序
      changeOrder(flag){
        let newOrder= ''
        let originFlag = this.searchParams.order.split(':')[0]
        let originSortType = this.searchParams.order.split(':')[1]
        // console.log(originFlag,'originFlag',originSortType,'originSortType')
        // 综合与销量 
        if(flag==originFlag){
        newOrder = `${flag}:${originSortType=='asc'?'desc':'asc'}`
        // console.log(newOrder,'new')
        }else{
          newOrder = `${flag}:desc`
        }
        this.searchParams.order=newOrder
        this.getData()
      },
      // 自定义事件回调
      getPageNo(pageNo){
        if(this.searchParams.pageNo!==pageNo){
        this.searchParams.pageNo=pageNo
        this.getData()
        }
      }
    },
    watch:{
      //通过watch监听路由的变化---[商品的名字路由里面的吗]
      //监听组件VC的$route属性
    //$route:{},应该用深度监听呀?
    //$route，是vue-router提供的
      $route(newValue,oldValue){
        // console.log(newValue,oldValue,'监听地址栏数据')
        
        // 由于路由变化了，重新整理路由变化参数，最新的商品名字、id、以及关键字
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        // 整理好参数再次发请求
        this.getData()
        
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>