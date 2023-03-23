<template>
<div>
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="$route.meta.show"></Footer>

</div>
</template>

<script>
import Header from './components/Header'
import Footer from "./components/Footer";
export default {
  name: '',
  components: {Header,Footer},
  mounted(){
    // console.log(this.$route,'App')
    // console.log(this.$router,'App')
    // 通知发送请求
        this.$store.dispatch('home/categoryList')
  }
}
</script>

<style>


</style>
