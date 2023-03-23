<template>
<div class="floor">
            <div class="py-container">
                <div class="title clearfix">
                    <h3 class="fl">{{list.name}}</h3>
                    <div class="fr">
                        <ul class="nav-tabs clearfix">
                            <li class="active" v-for="(navList,index) in list.navList" :key="index">
                                <a href="#tab1" data-toggle="tab">{{navList.text}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content">
                    <div class="tab-pane">
                        <div class="floor-1">
                            <div class="blockgary">
                                <ul class="jd-list">
                                    <li v-for="(keywords,index) in list.keywords" :key="index">{{keywords}}</li>
                                </ul>
                                <img :src="list.imgUrl" />
                            </div>
                            <div class="floorBanner">
                                <!-- 轮播图的地方 -->
                                <Carousel :list="list.carouselList" />
                            
                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="list.recommendList[0]" />
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="list.recommendList[1]" />
                                </div>
                            </div>
                            <div class="split center">
                                <img :src="list.bigImg" />
                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="list.recommendList[2]" />
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="list.recommendList[3]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
// import Swiper from 'swiper'
export default {
    name: 'Floor',
    props:['list'],
    computed:{
        // recommendList可以用slice截取再遍历但这里不用这么麻烦
        recommendList(){
            return this.list.recommendList.slice(0,2)
        }
        
    },
    mounted(){
        // 这里可以将Swiper直接写在这里，轮播图不可以是因为轮播图在mounted里派发了一个action，
        //问题:组件Floor的结构是否在mounted这里完整的!!!
        //floor数据props：父组件给的,从来没有发生过变化. 父亲给数据->儿子接受数据->渲染结构->mounted
        //初始化Swiper类的实例
        // var mySwiper = new Swiper (this.$refs.floor1Swiper, {
        //             loop: true, // 循环模式选项
        //             // 如果需要分页器
        //             pagination: {
        //                 el: '.swiper-pagination',
        //                 clickable:true
        //             },
                    
        //             // 如果需要前进后退按钮
        //             navigation: {
        //                 nextEl: '.swiper-button-next',
        //                 prevEl: '.swiper-button-prev',
        //             },
                    
        //             // 如果需要滚动条
        //             scrollbar: {
        //                 el: '.swiper-scrollbar',
        //             },
        //                     })
    },
    // watch:{
    //     // 不开启immediate是监视不到list数据的，因为props传过来的数据是没有变化的，所以让immediate先执行一次
    //     //floor是父组件给与的props:它的props属性值从来没有变化过！！！！
        
    //     list:{
    //         immediate:true,
    //         handler(){
    //             // 因为我们无法确定v-for是否遍历完成，所以我们先用$nextTick
    //             this.$nextTick(()=>{
    //                 var mySwiper = new Swiper ('.swiper-container', {
    //                 loop: true, // 循环模式选项
    //                 // 如果需要分页器
    //                 pagination: {
    //                     el: '.swiper-pagination',
    //                     clickable:true
    //                 },
                    
    //                 // 如果需要前进后退按钮
    //                 navigation: {
    //                     nextEl: '.swiper-button-next',
    //                     prevEl: '.swiper-button-prev',
    //                 },
                    
    //                 // 如果需要滚动条
    //                 scrollbar: {
    //                     el: '.swiper-scrollbar',
    //                 },
    //                         })
    //             })
    //         }
    //     }
    // }
}
</script>

<style lang="less" scoped>
.floor {
        margin-top: 15px;

        .py-container {
            width: 1200px;
            margin: 0 auto;

            .title {
                .fl {
                    float: left;
                    color: #c81623;
                    font-size: 20px;
                    line-height: 30px;
                    margin: 9px 0;
                    font-weight: 700;
                }

                .fr {
                    float: right;

                    .nav-tabs {
                        margin: 10px 0 0;
                        display: inline-block;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                padding-top: 1px;
                                font-weight: 400;
                                background-color: #fff;

                                &::after {
                                    content: "|";
                                    padding: 0 10px;
                                }
                            }

                            &:nth-child(7) {
                                a {
                                    &::after {
                                        content: "";
                                    }
                                }
                            }

                            &.active {
                                a {
                                    color: #e1251b;
                                }
                            }
                        }
                    }
                }
            }

            .tab-content {
                border-top: 2px solid #c81623;
                border-bottom: 1px solid #e4e4e4;

                .tab-pane {
                    .floor-1 {
                        height: 360px;
                        display: flex;

                        .blockgary {
                            width: 210px;
                            height: 100%;
                            background: #f7f7f7;

                            .jd-list {
                                padding: 15px 0;
                                overflow: hidden;

                                li {
                                    list-style-type: none;
                                    float: left;
                                    width: 40%;
                                    margin: 0 10px;
                                    border-bottom: 1px solid #e4e4e4;
                                    text-align: center;
                                    line-height: 26px;
                                }
                            }

                            img {
                                width: 100%;
                            }
                        }

                        .floorBanner {
                            width: 330px;
                            height: 100%;
                        }

                        .split {
                            width: 220px;
                            height: 100%;
                            position: relative;

                            .floor-x-line {
                                position: absolute;
                                background: #e4e4e4;
                                width: 220px;
                                height: 1px;
                                top: 180px;
                            }

                            .floor-conver-pit {
                                width: 100%;
                                height: 50%;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    transition: all 400ms;

                                    &:hover {
                                        opacity: 0.8;
                                    }
                                }
                            }
                        }

                        .center {
                            border: 1px solid #e4e4e4;
                        }
                    }
                }
            }
        }
    }
</style>>