<template>
  <div>
    <el-card class="box-card" style="width:400px;margin-top:10px">
      <div slot="header" class="clearfix">
        <span>{{admin.username}}</span>
      </div>
      <div>
        <div style="display:flex;justify-content:center">
          <el-upload
            action="/admin/userface"
            :headers="headers"
            :data="admin"
            :show-file-list="false"
            :on-success="onSuccess">
            <img title="点击修改用户头像" :src="userImage" style="height:100px;width:100px;border-radius:50px" alt="">
          </el-upload>
        </div>
        <div>姓&#12288;&#12288;名：<el-tag>{{admin.name}}</el-tag></div>
        <div>性&#12288;&#12288;别：<el-tag>{{admin.sex}}</el-tag></div>
        <div>年&#12288;&#12288;龄：<el-tag>{{admin.age}}</el-tag></div>
        <div>电话号码：<el-tag>{{admin.phone}}</el-tag></div>
        <div style="display:flex;justify-content:space-around;margin-top:10px">
          <el-button type="primary" @click="showUpdateAdminInfo">修改信息</el-button>
          <el-button type="danger" @click="showUpdatePassword">修改密码</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog
      title="编辑个人信息"
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        <table>
          <tr>
            <td>姓&#12288;&#12288;名：</td>
            <td><el-input v-model="admin2.name"></el-input></td>
          </tr>
          <tr>
            <td>用&#8194;户&#8194;名：</td>
            <td><el-input v-model="admin2.username"></el-input></td>
          </tr>
          <tr>
            <td>性&#12288;&#12288;别：</td>
            <td><el-input v-model="admin2.sex"></el-input></td>
          </tr>
          <tr>
            <td>年&#12288;&#12288;龄：</td>
            <td><el-input v-model="admin2.age"></el-input></td>
          </tr>
          <tr>
            <td>电话号码：</td>
            <td><el-input v-model="admin2.phone"></el-input></td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="updateAdminInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="更新密码"
      :visible.sync="passwordDialogVisible"
      width="30%">
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
</template>

<script>
export default {
  name:'AdminInfo',
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
      userImage:require('../assets/images/user.png'),
      headers:{
        Authorization:window.sessionStorage.getItem('tokenStr')
      },
      admin: {},
      admin2: {},
      dialogVisible:false,
      passwordDialogVisible:false,
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
    this.initAdmin();
  },
  methods:{
    onSuccess(){
      this.initAdmin()
    },
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
    showUpdatePassword(){
      this.passwordDialogVisible = true
    },
    showUpdateAdminInfo(){
      this.dialogVisible = true
    },
    updateAdminInfo(){
      this.putRequest('/admin/info',this.admin2).then(resp=>{
        if(resp){
          this.dialogVisible=false;
          this.initAdmin()
        }
      })
    },
    initAdmin(){
      this.getRequest('/admin/info').then(resp=>{
        if(resp){
          this.admin=resp;
          if(resp.userImage!==null){
            this.userImage=resp.userFace
          }
          this.admin2=Object.assign({}, this.admin);
          window.sessionStorage.setItem('user',JSON.stringify(resp))
          this.$store.commit('INIT_ADMIN',resp)
        }
      })
    }
  }
}
</script>

<style>

</style>