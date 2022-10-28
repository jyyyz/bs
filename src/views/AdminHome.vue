<template>
  <el-container style="height:100vh">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header/>
      </el-header>
      <common-tag/>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '../components/houtai/CommonAside.vue'
import CommonHeader from '../components/houtai/CommonHeader.vue'
import CommonTag from '../components/houtai/CommonTag.vue'
export default {
  name:'AdminHome',
  components:{
    CommonAside,
    CommonHeader,
    CommonTag
  },
  data(){
    return{}
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
.el-main{
  padding-top: 0;
}
</style>