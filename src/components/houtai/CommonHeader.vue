<template>
  <div class="header">
    <div class="l-content">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <!-- <h3 style="color:#fff">首页</h3> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="mycolor" v-for="item in tags" :key="item.path" :to="{path:item.path}">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini" @command="commandHandler">
        <span>
          <img :src="userImg" class="user">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="show">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog
        title="修改密码"
        :visible.sync="value"
        width="30%"
        >
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="请输入旧密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请确认新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name:'CommonHeader',
  data(){
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
        this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
          callback();
      }
    };
    return{
      headers:{
        Authorization:window.sessionStorage.getItem('tokenStr')
      },
      userImg:require('../../assets/images/user.png'),
      value:false,
      ruleForm: {
          pass:'',
          oldPass: '',
          checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        oldPass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  mounted(){
    this.initAdmin()
  },
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.ruleForm.id=this.admin.id
            this.putRequest('/admin/pass',this.ruleForm).then(resp=>{
              if(resp){
                //更新密码成功后退出登录
                this.postRequest('/logout')
                window.sessionStorage.removeItem('user')
                window.sessionStorage.removeItem('tokenStr')
                this.$store.commit('initRoutes',[])
                this.$router.replace('/')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    initAdmin(){
      this.getRequest('/admin/info').then(resp=>{
        if(resp){
          this.userImg=resp.userFace
          window.sessionStorage.setItem('user',JSON.stringify(resp))
          this.$store.commit('INIT_ADMIN',resp)
        }
      })
    },
    handleMenu(){
      this.$store.commit('collapseMenu')
    },
    commandHandler(command){
      if(command=='logout'){
        this.$confirm("此操作将退出登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          // 注销登录
          this.postRequest('/logout')
          // 清空用户信息
          window.sessionStorage.removeItem('tokenStr')
          window.sessionStorage.removeItem('user')
          this.$router.replace('/')
          })
      }
      if(command=='show'){
        this.value=true
      }
    } 
  },
  computed:{
    ...mapState({
      tags:state=>state.tab.tabsList
    }),
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height:100%;
  justify-content: space-between;
  align-items: center;
}
.l-content{
  display: flex;
  align-items: center;
  .el-button{
    margin-right: 20px;
  }
}
.r-content{
  .user{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.mycolor /deep/ .el-breadcrumb__inner.is-link {
  color:skyblue
}

</style>