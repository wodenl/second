<template>
  <div>
    <!--h1>购物车</h1-->
    <!--(1)顶部复选框:全选-->
    <div>
     全选 <input type="checkbox" @change="selectAll" v-model="allcb">
    </div>
    <!--(2)中间复选框:商品名/价格/删除-->
    <div class="cart-item" v-for="(item,i) of list" :key="i">
       <div class="leftText">
        <input type="checkbox" v-model="item.cb" @change="itemchange"/>
        <div class="lname">{{item.lname}}</div>
        <div class="price">{{item.price}}</div>
       </div>
       <mt-button
       :data-id="item.id"
       @click="del">删除</mt-button>
    </div>
    <!--(3)删除选中商品复选框39-->
    <div>
      购物车中商品数量
      <span style="color:red">{{$store.getters.getCart}}</span>
      <mt-button @click="delm">删除选中商品</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      list:[],//2:购物车列表
      allcb:false //全选按钮状态
    }
  },
  created() { //1:添加生命周期
   this.loadMore();
  },
  methods:{
    itemchange(){
      //商品复选框-状态修改
      //全部商品被选中，则 allcb为true，否则为 false
      var sum = 0;
      for(var item of this.list){
        if(item.cb){
          sum++;
        }
      }
      //console.log(sum);
      //console.log(this.list);
      if( sum == this.list.length){
        this.allcb = true ;
      }else{
        this.allcb = false ;
      }
    },
    selectAll(event){
      //1:添加参数event
      //2:获取当前全选按钮状态
      var all = event.target.checked;
      //3:赋值所有商品cb
      for(var item of this.list){
        item.cb = all;
      }
    },
    delm(e){// (删除指定商品)
      //1.显示交互框，用户再次确认删除
      this.$messagebox.confirm("是否删除指定商品?").then(res=>{
      //2.选择确认
      //3.创建空字符串 '1 2 3'
        var str = "";
      //4.创建循环遍历list数组 
        //判断当前对象cb值为true 
        //拼接对象id
        for( var item of this.list){
          if(item.cb){
            str += item.id+","
          }
        }
      //5.判断用户是否选择商品
        if(str.length == 0){
          this.$messagebox("请选择要删除的商品!");
          return;
        }
        str = str.substring(0,str.length-1);
        console.log(str);
      //6.--创建url 创建obj
      var url = "delm";
      var obj = {id:str};
      //7.--发送 ajax请求
      this.axios.get(url,{params:obj}).then(res=>{
        //8.重新加载购物车列表
        this.loadMore();
        //9.提示删除成功
        this.$toast("删除成功!");
      })
      })
      .catch(err=>{})
    },
    del(event){
      //1:为删除按钮添加自定义属性//data-id 保存当前购物车商品id
      //2:添加点击事件click del
      //2.1:交互提示:是否删除商品
      this.$messagebox.confirm("是否删除指定商品").then(res=>{
       //回调函数 3~8
       //3:获取当前商品id
      var id = event.target.dataset.id;
      //4:输出id
      //console.log(id);
      //5:发送ajax请求
      var url = "del";
      var obj = {id};
      this.axios.get(url,{params:obj}).then(res=>{
       //6:获取服务器端返回数据
       if(res.data.code > 0){
          this.$toast("删除成功");
          this.loadMore();
       }  
      })
      //7:提示删除成功 17:17
      //8:重新调用 loadMore 
      }).catch(err=>{
        //取消        
      })
    },
    loadMore(){
      //1:创建url
      var url = "findcart"
      //2:发送ajax请求获取购物车
      this.axios.get(url).then(res=>{
        //console.log(res.data.code);
        if(res.data.code==-1){
          //提示交互提示框
          this.$messagebox("消息","请登录").then(res=>{
            //跳转登录组件
            this.$router.push("/Login");
          })
        }else{
          //(1)为每个商品添加状态
          //res变量data属性data数组
          var list = res.data.data;
          for(var item of list){
            item.cb = false;
          }
          //(2)赋值
          this.list = list;
          //(2.9)循环之前 先清空
          this.$store.commit("clearCart");
          //(3)-------创建循环遍历数组
          for(var item of this.list){
            //(4)修改购物车数量
            this.$store.commit("addCart");
          }
        }
      })
      //3:将服务器返回数据保存list
    }
  }
}
</script>
<style>
/*1:购物车商品内容*/
.cart-item{
  display: flex;/*弹性布局 两端对齐*/
  justify-content: space-between;
  align-items: center;/*垂直居中*/
  border-bottom:1px solid #ccc;
  margin-top:25px;/*顶部距离*/
}
/*2:左侧复选框文字弹性布局*/
.leftText{
  display: flex;/*弹性布局*/
  align-items: center;/*垂直居中*/
}
/*3:修饰商品名称*/
.lname{
  margin-left:25px;/*与复选框间距*/
  color:#333;
}
/*4:修饰商品价格*/
.price{
   margin-left:25px;/*与名称间距*/
   color:red;
}
</style>

