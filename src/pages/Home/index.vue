<template>
    <div>
        <TypeNav/>
        <ListContainer/>
        <Recommend/>
        <Rank/>
        <Like/>
        <Floor v-for="floor in reqFloorList" :key="floor.id" :list='floor' />
        <Brand/>
    </div>
    
</template>

<script>
import ListContainer from '../Home/ListContainer'
import Recommend from '../Home/Recommend'
import Rank from '../Home/Rank'
import Like from '../Home/Like'
import Floor from '../Home/Floor'
import Brand from '@/pages/Home/Brand'

import {mapState} from 'vuex'
export default {
    name: 'home',
    components: {
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    computed:{
        
        ...mapState('home',{reqFloorList:'reqFloorList'})
        // reqFloorList(){
        //     return this.$store.state.home.reqFloorList
        // }
    },
    mounted(){
        // console.log(this,'home')
        // 因为数据是两个对象，所以在父组件这里发请求，拿到数据遍历两个floor组件
        this.$store.dispatch('home/getFloorList')
    }
}
</script>

<style>

</style>