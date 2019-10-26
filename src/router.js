import Vue from 'vue'
import Router from 'vue-router'

import HelloContainer from "./components/HelloWorld.vue"
import Home from "./components/weixin/Home.vue"
//功能:引入组件Exam01.vue
//1:将Exam01.vue引入当前router.js
import Exam01 from "./components/exam/Exam01.vue"
//2:为组件指定访问路径
import Exam02 from "./components/exam/Exam02.vue"
import Exam03 from "./components/exam/Exam03.vue"
import Exam04 from "./components/exam/Exam04.vue"
import Exam05 from "./components/exam/Exam05.vue"
import Exam06 from "./components/exam/Exam06.vue"
import Exam07 from "./components/exam/Exam07.vue"
import Fa08 from "./components/exam/Fa08.vue"
import Fa09 from "./components/exam/Fa09.vue"
import Home3 from "./components/message/Home.vue"
import MessageList from "./components/message/common/MessageList"
import Login from "./components/xz/Login.vue"
import Product from "./components/xz/Product.vue"
import Cart from  "./components/xz/Cart.vue"
import ExamVuex from  "./components/exam/ExamVuex.vue"


Vue.use(Router)
export default new Router({
  routes: [
    {path:'/ExamVuex',component:ExamVuex},
    {path:'/Cart',component:Cart},
    {path:'/Product',component:Product},
    {path:'/Login',component:Login},
    {path:'/MessageList',component:MessageList},
    {path:'/Home3',component:Home3},
    {path:'/Fa09',component:Fa09},
    {path:'/Fa08',component:Fa08},
    {path:'/Exam07',component:Exam07},
    {path:'/Exam06',component:Exam06},
    {path:'/Exam05',component:Exam05},
    {path:'/Exam04',component:Exam04},
    {path:'/Exam03',component:Exam03},
    {path:'/Exam02',component:Exam02},
    {path:'/Exam01',component:Exam01},
    {path:'/Home',component:Home},
    {path:'/',component:HelloContainer},
  ]
})
