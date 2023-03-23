import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
// import { Icon } from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
// 注册Carousel为全局组件
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 第一个参数： 全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.use(ElementUI);
// Vue.component(Icon.name,Icon);
Vue.config.productionTip = false
import router from './router'
import store from './store'
import '@/mock/mockServer'
// 引入swiper样式
import 'swiper/dist/css/swiper.css'

new Vue({
  render: h => h(App),
  beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
  router,
  store
}).$mount('#app')
