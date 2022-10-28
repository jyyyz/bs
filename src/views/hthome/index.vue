<template>
  <el-row class="home" :gutter="20">
    <el-col :span="9" style="margin-top:10px">
      <el-card shadow="hover">
        <div class="user">
          <el-upload
            action="/admin/userface"
            :data="admin"
            :show-file-list="false"
            :on-success="onSuccess">
            <img :src="userImg" title="点击修改头像"/>
          </el-upload>
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">系统管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>当前登录时间：<span>{{dataTime}}</span></p>
          <p>当前登录地点：<span>{{city}}</span></p>
        </div>
      </el-card>
      <el-card style="margin-top:20px;height:220px">
        <div class="clearfix" style="text-align:center">
          <span>管理员个人资料</span>
        </div>
        <div>
          <div>用&#8194;户&#8194;名：<el-tag>{{admin.username}}</el-tag></div>
          <div>性&#12288;&#12288;别：<el-tag>{{admin.sex}}</el-tag></div>
          <div>年&#12288;&#12288;龄：<el-tag>{{admin.age}}</el-tag></div>
          <div>电话号码：<el-tag>{{admin.phone}}</el-tag></div>
        </div>
      </el-card>
    </el-col>
    <el-col style="margin-top:10px" :span="15">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="num">{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <div class="graph">
        <el-card style="height:300px">
          <div style="height:240px" ref="echarts"></div>
        </el-card>
        <el-card style="height:300px">
          <div style="height:240px" ref="vecharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name:'houtai',
  data(){
    return{
      headers:{
        Authorization:window.sessionStorage.getItem('tokenStr')
      },
      userImg:require('../../assets/images/user.png'),
      dataTime:'',
      nowWeek:'',
      city:'正在定位中...',
      admin:{},
      countData:[
        {
          name:"男用户数",
          value:0,
          icon:"user-solid",
          color:"#00BFFF"
        },
        {
          name:"分享总数",
          value:0,
          icon:"share",
          color:"#ffb980"
        },
        {
          name:"分享评论",
          value:0,
          icon:"s-comment",
          color:"#5ab1ef"
        },
        {
          name:"女用户数",
          value:0,
          icon:"user-solid",
          color:"#FF69B4"
        },
        {
          name:"求助总数",
          value:0,
          icon:"help",
          color:"#ffb980"
        },
        {
          name:"求助评论",
          value:0,
          icon:"s-comment",
          color:"#5ab1ef"
        },
      ]
    }
  },
  mounted(){
    this.getData()
    this.getAddress()
    this.initAdmin()
    this.getSum()
    this.getDraw()
  },
  methods:{
    onSuccess(){
      this.initAdmin()
    },
    getDraw(){
      const xData = this.countData.map(item=>item.name)
      xData.splice(0,1)
      xData.splice(2,1)
      const yData = this.countData.map(item=>item.value)
      yData.splice(0,1)
      yData.splice(2,1)
      const option = {
          xAxis: {
            data:xData
          },
          yAxis: {},
          series: [
            {
              name:'总数',
              type: 'bar',
              data: yData
            }
          ]
      }
      const E = echarts.init(this.$refs.echarts)
      E.setOption(option)

      const Data = this.countData.map(item=>item)
      Data.splice(1,2)
      Data.splice(2,2)
      const videoOption = {
          tooltip:{
            trigger:"item",
          },
          legend:{
            bottom:5,
            left:'center',
            textStyle:{
              color:'#000',
              fontSize:16
            }
          },
          color:[
            "#00BFFF",
            "#FF69B4",
          ],
          series:[
            {
              data:Data,
              type:'pie',
              radius:'70%',
              center:['50%','50%']
            }
          ],
        }
      const V=echarts.init(this.$refs.vecharts)
      V.setOption(videoOption)
    },
    getSum(){
      this.getRequest('/admin/gainSum1').then(resp=>{
        if(resp){
          this.countData[0].value=resp
        }
      })
      this.getRequest('/share-information/gainSum').then(resp=>{
        if(resp){
          this.countData[1].value=resp
        }
      })
      this.getRequest('/share-comment/gainSum').then(resp=>{
        if(resp){
          this.countData[2].value=resp
        }
      })
      this.getRequest('/admin/gainSum2').then(resp=>{
        if(resp){
          this.countData[3].value=resp
        }
      })
      this.getRequest('/help-information/gainSum').then(resp=>{
        if(resp){
          this.countData[4].value=resp
        }
      })
      this.getRequest('/help-comment/gainSum').then(resp=>{
        if(resp){
          this.countData[5].value=resp
          this.getDraw()
        }
      })
      
    },
    initAdmin(){
      this.getRequest('/admin/info').then(resp=>{
        if(resp){
          this.userImg=resp.userFace
          this.admin=resp
        }
      })
    },
    getData(){
      let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        let week = new Date().getDay();
        let hh = new Date().getHours();
        let mf =
            new Date().getMinutes() < 10
                ? "0" + new Date().getMinutes()
                : new Date().getMinutes();
        if (week == 1) {
            this.nowWeek = "星期一";
        } else if (week == 2) {
            this.nowWeek = "星期二";
        } else if (week == 3) {
            this.nowWeek = "星期三";
        } else if (week == 4) {
            this.nowWeek = "星期四";
        } else if (week == 5) {
            this.nowWeek = "星期五";
        } else if (week == 6) {
            this.nowWeek = "星期六";
        } else {
            this.nowWeek = "星期日";
        }
        this.dataTime = yy + "-" + mm + "-" + dd+" " +hh +":" + mf+" " + this.nowWeek;
    },
    getAddress(){
      //获取当前位置
      let that =this
      var address = null;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          //获取地址信息，设置地址label
          var gc = new BMap.Geocoder();
          gc.getLocation(r.point, function(rs) {
            //   debugger
            var addComp = rs.addressComponents;
            address =
              addComp.province +
              addComp.city  //获取地址
            that.city=address
          });
        } else {
          that.city="定位失败"
        }
      });
   }
  }
}
</script>

<style lang="less" scoped>

</style>