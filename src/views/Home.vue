<template>
  <div>
    <el-container style="height:100vh">
      <el-header class="homeHeader">
        <div class="title">宠物相亲网</div>
        <div>
          <el-dropdown class="userInfo" @command="commandHandler">
            <span class="el-dropdown-link" style="color:#fff;">
            {{user.username}}<i><img :src="'user.userFace!==null'?user.userFace:userImage"/></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
              <el-dropdown-item command="setting">设置</el-dropdown-item>
              <el-dropdown-item command="logout">注销登录</el-dropdown-item>   
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <common-aside></common-aside>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" class="fj">
            <el-breadcrumb-item :to="{ path:'/home' }">首页</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
            欢迎来到宠物相亲网！
          </div> -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/qiantai/CommonAside.vue'
export default {
  name: 'Home',
  components:{
    CommonAside
  },
  data(){
    return{
      userImage:require("../assets/images/user.png")
      // user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  methods: {
    menuClick(index){
      this.$router.push(index)
    },
    commandHandler(command){
      if(command=='logout'){
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 注销登录
          this.postRequest('/logout')
          // 清空用户信息
          window.sessionStorage.removeItem('tokenStr')
          window.sessionStorage.removeItem('user')
          // 清空菜单
          // this.$store.commit('initRoutes',[])
          // 跳转到登录页
          this.$router.replace('/')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      }
      if(command=='userinfo') {
        this.$router.push('/userinfo')
      }
    }
  },
  computed:{
    /* routes(){
      return this.$store.state.routes
    }, */
    user(){
      return this.$store.state.currentAdmin;
    },
  }
}
</script>

<style scoped lang="less">
  .fj /deep/ span.el-breadcrumb__inner.is-link{
    cursor: pointer;
  }
  .homeHeader{
    background: #1C1C1C;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 60px;
  }
  .el-aside{
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
  }
  .el-main {
    position: absolute;
    left: 200px;
    right: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
  }
  .homeHeader .title{
    font-size: 30px;
    font-family: 华文楷体;
    color: white;
  }
  .homeHeader .userInfo{
    cursor: pointer;
  }
  .el-dropdown-link img{
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-left: 8px;
  }
  .homeWelcome{
    text-align:center;
    font-size: 30px;
    font-family: 华文楷体;
    color: #409eff;
    padding-top: 50px;
  }
</style>