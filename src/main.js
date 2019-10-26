import Vue from 'vue'
import App from './App.vue'
import router from './router'

//#删除5~16内容 
//功能:引入第三方组件库mint-ui
//1:完整引入mint-ui组件库中所有组件
import MintUI from "mint-ui"
//2:单引入mint-ui库中样式文件
import "mint-ui/lib/style.css"
//3:将mint-ui注册vue实例 14:15
Vue.use(MintUI)
//4:引入字体图标文件 main.js
import "./font/iconfont.css"
//5:引入axios模块
import axios from "axios"
//6:配置服务器基础路径
axios.defaults.baseURL="http://127.0.0.1:4000/"
//7:配置保存session信息
axios.defaults.withCredentials=true
//8:axios 注册vue
Vue.prototype.axios = axios

//--------------------------------- Vuex ------------------------
//1.引入文件(下载命令: npm i vuex -S)
import Vuex from "vuex"
//2.注册
Vue.use(Vuex)
//3.创建一个存储对象
var store = new Vuex.Store({
  state:{  //共享数据
    fa:12,         //共享：亮哥发量
    cartCount:0    //共享: 购物车数量,初始为 0
  },
  mutations:{ //修改共享数据
    addCart(state){ //购物车数量 +1
      state.cartCount++;
    },
    clearCart(state){ // 清空购物车
      state.cartCount = 0;
    },
    //-------------------------------
    subItem(state){ //方法1：每次减少一根
      state.fa--;   
    },
    clear(state){  //方法2：清空，头发掉光
      state.fa = 0; 
    }
  },
  getters:{ //获取 共享数据
    getFa(state){
      return state.fa;
    },
    getCart(state){
      return state.cartCount; //获得购物车 数量 
    }
  },
  actions:{// 异步 修改数据
    //context ==$store
    modifyCount:(context)=>{
      //模拟异步操作
      setTimeout(()=>{
        //调用 mutations 方法
        context.commit("clear")
      },2000)
    }

  }
})
new Vue({
  router,
  render: h => h(App),
  store   //Vuex存储对象
}).$mount('#app')
