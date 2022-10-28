<template>
  <div class="container" :style="{'backgroundImage':'url('+imagUrl+')','backgroundSize':'cover', 'backgroundRepeat': 'no-repeat'}">
    <el-form :rules="rules"
             v-loading="loading"
             element-loading-text="正在注册..."
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)" 
             ref="registerForm" 
             :model="registerForm" 
             class="registerContainer">
      <h3 class="registerTitle">系统用户注册</h3>
      <el-form-item prop="username">
        <el-input type="text" prefix-icon="el-icon-user" auto-complete="false" v-model="registerForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" prefix-icon="el-icon-lock" show-password auto-complete="false" v-model="registerForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="passwords">
        <el-input type="password" prefix-icon="el-icon-lock" show-password auto-complete="false" v-model="registerForm.passwords" placeholder="请确认密码"></el-input>
      </el-form-item>
        <el-button type="primary" style="width: 100%" @click="registerSubmit">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data(){
    return { 
      timer:null,
      imagUrl:require('../assets/animal/1.jpg'),
      registerForm:{ 
        username:'',
        password:'',
        passwords:''
      },
      loading:false,
      rules:{
        username:[{required:true,message:'请输入用户名',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'}],
        passwords:[{required:true,message:'请确认密码',trigger:'blur'}],
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
    registerSubmit() {
      if (this.registerForm.password !== this.registerForm.passwords) {
        this.$message.error('两次密码不一致')
        return
      }
      this.$refs.registerForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.postRequest('/admin/register',this.registerForm).then(resp => {
              if(resp) {
                this.loading = false;
                // this.$store.dispatch('setUser',resp)
                // 注册成功跳转登录页
                this.$router.replace('/')
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
  }
}
</script>

<style scoped>
  .container{
    /* background: url("../assets/images/4.jpg") center center no-repeat;
    background-size: cover; */
    height: 100%;
    width: 100%;
    position: fixed;
  }
  .registerContainer {
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
  .registerTitle { 
    margin: 0px auto 40px auto;
    text-align: center;
  }

  .el-form-item__content{
    display: flex;
    align-items: center;
    height: 40px;
  }
</style>