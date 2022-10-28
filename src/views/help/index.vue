<template>
  <div class="manage">
    <el-dialog
      :title="operateType==='add'?'新增求助':'更新求助'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"></common-form>  
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShow=false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form">
        <el-button type="primary" @click="search(searchForm.keyword)">搜索</el-button>  
      </common-form> 
    </div>
    <common-tab
      :dataShow="dataShow"
      :tableLabel="tableLabel"
      @edit="editUser"
      @del="delUser">
      <el-pagination
      :data="tableData"
      @prev-click="prePage()"
      @next-click="nextPage()"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,8]" 
      :page-size="pagesize"         
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.tableData.length"
      @size-change="handleSizeChange"
      >
    </el-pagination>
    </common-tab>
  </div>
</template>

<script>
import CommonForm from '../../components/houtai/CommonForm.vue'
import CommonTab from '../../components/houtai/CommonTab.vue'
export default {
  name:'help',
  components:{
    CommonForm,
    CommonTab
  },
  data(){
    return{
      operateType:'add',
      isShow:false,
      operateFormLabel:[
        {
          model:'helpId',
          label:'ID',
          type:'input'
        },
        {
          model:'helpTitle',
          label:'求助主题',
          type:'input'
        },
        {
          model:'helpIntroduce',
          label:'求助内容介绍',
          type:'input',
        },
        {
          model:'username',
          label:'发布用户',
          type:'input'
        },
        {
          model:'helpInformation',
          label:'求助内容',
          type:'input'
        }
      ],
      operateForm:{
        helpId:'',
        helpTitle:'',
        helpIntroduce:'',
        username:'',
        helpInformation:''
      },
      formLabel:[
        {
          model:'keyword',
          label:'',
          type:'input'
        }
      ],
      searchForm:{
        keyword:''
      },
      tableData:[],
      tableLabel:[
        {
          prop:"helpId",
          label:"ID"
        },
        {
          prop:"helpTitle",
          label:"求助主题"
        },
        {
          prop:"helpIntroduce",
          label:"求助内容介绍"
        },
        {
          prop:"username",
          label:"发布用户"
        },
        {
          prop:"createDate",
          label:"发布时间"
        },
        {
          prop:"helpInformation",
          label:"求助内容"
        },
      ],
      currentPage:1,
      pagesize:5,
      pageNum: 1,
      totalPage: [],
      // 当前显示的数据
      dataShow: [],
    }
  },
  methods:{
    confirm(){
      if(this.operateType==='add'){
        this.postRequest('/help-information/add',this.operateForm).then(resp => {
          if(resp) {
            location.reload()
            this.getList()
          }
      })}else{
        this.putRequest('/help-information/updateHelp',this.operateForm).then(resp => {
          if(resp) {
            location.reload()
            this.getList()
          }
      })}
    },
    addUser(){
      this.isShow=true
      this.operateType='add'
      this.operateForm={
        helpId:'',
        helpTitle:'',
        helpIntroduce:'',
        username:'',
        helpInformation:''
      }
    },
    getList(){
      this.getRequest('/help-information/gain').then(resp=>{
        if(resp){
          this.tableData=resp;
          this.getData()
        }
      })
    },
    editUser(row){
      this.operateType="edit"
      this.isShow=true
      this.operateForm=row
      console.log(this.operateForm);
    },
    delUser(row){
      console.log(row);
      this.$confirm("是否删除?","提示",{
        confirmButtonText:"确定",
        canceButtonText:"取消",
        type:"warning"
      }).then(()=>{
        this.deleteRequest('/help-information/'+row.helpId).then(resp=>{
          if(resp){
            location.reload()
          }
        })
      })
    },
    search(keyword){
      console.log(keyword);
      this.getRequest('/help-information/search/'+keyword).then(resp=>{
        if(resp){
          this.tableData=resp
          this.getData()
        }
      })
    },
    getData(){
      this.pageNum = Math.ceil(this.tableData.length / this.pagesize);
      for (let i = 0; i < this.pageNum; i++) {
      // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
      // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为5， 则第一页是1-5条，即slice(0,5)，第二页是6-10条，即slice(5,10)...
      this.totalPage[i] = this.tableData.slice(this.pagesize * i, this.pagesize * (i + 1))
    }
   // 获取到数据后显示第一页内容
      this.dataShow = this.totalPage[this.currentPage-1];
      // console.log(this.dataShow);
    },
    nextPage() {
      // if (this.currentPage === this.pageNum) return ;
      this.currentPage=this.currentPage + 1
      this.getList()
    },
    // 上一页
    prePage() {
      // if (this.currentPage === 1) return ;
      this.currentPage=this.currentPage - 1
      this.getList()
    },
    handleSizeChange(val){
      this.pagesize=val
      this.dataShow=""
      this.getList()
    },
    handleCurrentChange(val){
      this.dataShow=this.totalPage[val-1]
    }
  },
  created(){
    this.getList()
  }

}
</script>

<style lang="less" scoped>
.manage-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>