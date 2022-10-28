<template>
  <div class="shareInformationContainer">
    <el-card
      shadow="hover"
      class="shareCard"
      v-for="item in dataShow"
      :key="item.shareId"
      >
      <div class="shareList" @click="$router.push(`/shareArticle/${item.shareId}`)">
        <img :src="item.userFace" style="height:50px;width:50px;border-radius:50px" alt="">
        <span class="box1">{{item.username}}</span>
        <span class="box2">{{item.createDate}}</span>
        <h1 style="margin-top:8px">{{item.shareTitle}}</h1>
        <p style="margin-top:5px">{{item.shareIntroduce}}</p>
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
      :total="this.share.length"
      @size-change="handleSizeChange"
      >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Share3',
  data(){
    return{
      share:[],
      currentPage:1,
      pagesize:3,
      pageNum: 1,
      totalPage: [],
      // 当前显示的数据
      dataShow: "",
    }
  },
  mounted(){
    this.initShare();
  },
  methods:{
    initShare(){
      this.getRequest('/share-information/gain').then(resp=>{
        if(resp){
          this.share=resp;
          console.log(resp);
          this.getList()
        }
      })
    },
    getList(){
      this.pageNum = Math.ceil(this.share.length / this.pagesize);
      for (let i = 0; i < this.pageNum; i++) {
      // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
      // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为5， 则第一页是1-5条，即slice(0,5)，第二页是6-10条，即slice(5,10)...
      this.totalPage[i] = this.share.slice(this.pagesize * i, this.pagesize * (i + 1))
    }
   // 获取到数据后显示第一页内容
      this.dataShow = this.totalPage[this.currentPage-1];
      // console.log(this.dataShow);
    },
    nextPage() {
      // if (this.currentPage === this.pageNum) return ;
      this.currentPage=this.currentPage + 1
      this.initShare()
    },
    // 上一页
    prePage() {
      // if (this.currentPage === 1) return ;
      this.currentPage=this.currentPage - 1
      this.initShare()
    },
    handleSizeChange(val){
      this.pagesize=val
      this.dataShow=""
      this.initShare()
    },
    handleCurrentChange(val){
      this.dataShow=this.totalPage[val-1]
    }
  }
}
</script>

<style scoped>
.shareInformationContainer{
  margin-top: 10px;
}
.shareCard{
  border-bottom: 1px solid #ccc;
  margin-top: 5px;
  background-color: #D3D3D3;
  /* background: url("../assets/images/4.jpg") center center no-repeat;
  background-size: cover; */
}
.shareList{
  position: relative;
  
}
.box1 {
  position: relative;
  left: 50px;
  top: -20px;
}
.shareList .box2 {
  position: absolute;
  right: 30px;
  top: 20px;
}
</style>