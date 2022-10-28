<template>
  <div class="container" :style="{'backgroundImage':'url('+imagUrl+')','backgroundSize':'cover', 'backgroundRepeat': 'no-repeat'}">
    <el-form :rules="rules"
             v-loading="loading"
             element-loading-text="正在登录..."
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)" 
             ref="loginForm" 
             :model="loginForm" 
             class="loginContainer">
      <h3 class="loginTitle">系统用户登录</h3>
      <el-form-item prop="username">
        <el-input type="text" prefix-icon="el-icon-user" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" prefix-icon="el-icon-lock" show-password auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width: 170px;margin-right: 5px"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha">
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemeber">记住我</el-checkbox>
        <el-button type="primary" style="width: 100%" @click="loginSubmit">登录</el-button>
        <el-button type="primary" style="width: 100%" class="loginRegist" @click="loginRegisterSubmit">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return { 
      timer:null,
      imagUrl:require('../assets/animal/1.jpg'),
      captchaUrl:'/captcha?time='+new Date(),
      loginForm:{ 
        username:'',
        password:'',
        code:''
      },
      loading:false,
      checked:true,
      rules:{
        username:[{required:true,message:'请输入用户名',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'}],
        code:[{required:true,message:'请输入验证码',trigger:'blur'}]
      }
    }
  },
  mounted(){
    this.setTimer()
  },
  destroyed(){
    this.clear()
  },
  methods: {
    clear(){
      clearInterval(this.timer)
      this.timer=null
    },
    setTimer(){
      let index=1;
      this.timer = setInterval(()=>{
        index = index<3?index+1:1
        console.log("定时器开始"+index);
        this.imagUrl=require(`../assets/animal/${index}.jpg`)
      },3000)
    },
    loginSubmit() {
      this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.postRequest('/login',this.loginForm).then(resp => {
              if(resp) {
                this.loading = false;
                // 存储用户token
                const tokenStr = resp.obj.tokenHead+resp.obj.token;
                window.sessionStorage.setItem('tokenStr',tokenStr)
                // 跳转首页
                if(this.loginForm.username==='admin'){
                  this.$router.replace('/adminHome')
                }else{
                  this.$router.replace('/home')
                  // 直接输入地址的行为修复 页面跳转
                  let path = this.$route.query.redirect
                  this.$router.replace((path=='/'||path==undefined)?'/home':path)
                }
              }else{
                location.reload()
              }
            })
          } else {
            this.$message.error('请输入所有字段!!');
            return false;
          }
        });
    },
    loginRegisterSubmit(){
      this.$router.push('/register')
    },
    updateCaptcha() {
      this.captchaUrl = '/captcha?time'+new Date()
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    /* background: url("../assets/images/4.jpg") center center no-repeat;
    background-size: cover; */
    height: 100%;
    width: 100%;
    position: fixed;
  }
  .loginContainer {
    border-radius:15px;
    background-clip:padding-box;
    margin:180px 950px 180px;
    width:350px;
    padding:15px 35px 15px 35px;
    background:#fff;
    border:1px solid #eaeaea;
    box-shadow:0 0 25px #cac6c6;
    opacity: 0.8;
  }
  .loginTitle { 
    margin: 0px auto 40px auto;
    text-align: center;
  }
  .loginRemeber {
    text-align: left;
    margin: 0px 0px 15px 0px;
  }

  .el-button.loginRegist.el-button{
    margin-left: 0px;
    margin-top: 10px;
  }
  /deep/ .el-form-item__content{
    display: flex;
    align-items: center;
    height: 40px;
  }
</style>