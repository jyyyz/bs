<template>
  <div class="helpInformationContainer">
    <el-card
      shadow="hover"
      class="helpCard"
      v-for="item in dataShow"
      :key="item.helpId"
      >
      <div class="helpList" @click="$router.push(`/helpArticle/${item.helpId}`)">
        <img :src="item.userFace" style="height:50px;width:50px;border-radius:50px" alt="">
        <span class="box1">{{item.username}}</span>
        <span class="box2">{{item.createDate}}</span>
        <h2 style="margin-top:8px">{{item.helpTitle}}</h2>
        <p style="margin-top:5px">{{item.helpIntroduce}}</p>
      </div>
    </el-card>
    <el-pagination
      @prev-click="prePage()"
      @next-click="nextPage()"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 6]" 
      :page-size="pagesize"         
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.help.length"
      @size-change="handleSizeChange"
      >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Help3',
  data(){
    return{
      help:[],
      currentPage:1,
      pagesize:3,
      pageNum: 1,
      totalPage: [],
      // 当前显示的数据
      dataShow: "",
    }
  },
  mounted(){
    this.initHelp();
  },
  methods:{
    initHelp(){
      this.getRequest('/help-information/gain').then(resp=>{
        if(resp){
          this.help=resp;
          console.log(resp);
          this.getList()
        }
      })
    },
    getList(){
      this.pageNum = Math.ceil(this.help.length / this.pagesize);
      for (let i = 0; i < this.pageNum; i++) {
      // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
      // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为5， 则第一页是1-5条，即slice(0,5)，第二页是6-10条，即slice(5,10)...
      this.totalPage[i] = this.help.slice(this.pagesize * i, this.pagesize * (i + 1))
    }
   // 获取到数据后显示第一页内容
      this.dataShow = this.totalPage[this.currentPage-1];
      // console.log(this.dataShow);
    },
    nextPage() {
      // if (this.currentPage === this.pageNum) return ;
      this.currentPage=this.currentPage + 1
      this.initHelp()
    },
    // 上一页
    prePage() {
      // if (this.currentPage === 1) return ;
      this.currentPage=this.currentPage - 1
      this.initHelp()
    },
    handleSizeChange(val){
      this.pagesize=val
      this.dataShow=""
      this.initHelp()
    },
    handleCurrentChange(val){
      this.dataShow=this.totalPage[val-1]
    }
  }
}
</script>

<style scoped>
.helpInformationContainer{
  margin-top: 10px;
}
.helpCard{
  border-bottom: 1px solid #ccc;
  margin-top: 5px;
  background-color: #D3D3D3;
  /* background: url("../assets/images/4.jpg") center center no-repeat;
  background-size: cover; */
}
.helpList{
  position: relative;
  
}
.box1 {
  position: relative;
  left: 50px;
  top: -20px;
}
.helpList .box2 {
  position: absolute;
  right: 30px;
  top: 20px;
}
</style>