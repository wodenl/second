<template>
<div>
    <h3>Vuex</h3>
    <!-- 获取共享数据--亮哥头发(fa) -->
    <span>可怜的亮亮还有几根毛?——— {{$store.getters.getFa}}</span>
    <!-- 添加按钮 1.减一根 -->
    <!-- 异步修改发量 -->
    <br>
    <input type="button" value="异步修改-2s后" @click="mclear">
    <br>
    <input type="button" value="减一" @click="sub">
    <!-- 添加按钮 2.发量清空 -->
    <br>
    <input type="button" value="清空" @click="clear">
</div>
</template>
<script>
export default {
    methods:{
        sub(){//调用修改数据方法
            this.$store.commit("subItem")},
        clear(){//调用修改数据方法
            this.$store.commit("clear")},
        mclear(){//异步修改共享数据
            this.$store.dispatch("modifyCount")},
        }
    }
</script>