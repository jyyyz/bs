<template>
  <div class="articleContainer">
    <!-- 头部放用户名、时间、头像 -->
    <el-card class="container" shadow="never">
      <div class="header">
        <img :src="article.userFace" alt="" style="height:50px;width:50px;border-radius:50px">
        <span class="box1">{{article.username}}</span>
        <span class="box2">{{article.createDate}}</span>
        <h2 style="text-align:center;font-size:20px">{{article.shareTitle}}</h2>
      </div>
      <div>
        <p style="margin-top:8px;">{{article.shareInformation}}</p>
      </div>
      <div class="size-icon">
        <i class="el-icon-thumb">
          <span class="number">22</span>
        </i>
        <i class="el-icon-chat-dot-square">
          <span class="number">{{this.length}}</span>
        </i>
      </div>
      <el-form class="mm" :model="commentForm" ref="commentForm">
        <el-form-item>
          <img :src="myuser.userFace" alt="" style="height:50px;width:50px;border-radius:50px;margin-right:3px">
          <el-input v-model="commentForm.commentBody" placeholder="发表一条评论..."></el-input>
          <el-button type="danger" style="margin-left:3px" @click="addComment">发送</el-button>
        </el-form-item>
      </el-form>
      <hr/>
      <p>
        <span>全部评论</span>
        <span>（{{this.length}}）</span>
      </p>
      <div class="commentParent">
        <div v-for="(item,index) in commentList" :key="index">
        <div class="commentItem">
          <div class="userImg">
            <img v-if="item.userFace" :src="item.userFace" alt="">
            <img v-else src="../assets/logo.png" alt="">
          </div>
          <div class="commentContent">
            <p>
              <span>{{item.commentator}}</span>
              <span style="color:#99A2AA">{{item.commentCreateTime}}</span>
            </p>
            <div>
              {{item.commentBody}}
              <span style="color:#99A2AA;margin-left:20px;cursor:pointer;" @click="huiFu1([item.commentId,item.commentator],index)">回复</span>
            </div>
            <div v-for="(it,index1) in commentList[index].child" :key="index1">
              <div class="commentItem">
                <div class="userImg">
                  <img v-if="it.userFace" :src="it.userFace" alt="">
                  <img v-else src="../assets/logo.png" alt="">
                </div>
                <div class="commentContent">
                  <p>
                    <span>{{it.commentator}}</span>
                    <span style="color:#99A2AA">{{it.commentCreateTime}}</span>
                  </p>
                  <div>{{it.commentBody}}
                    <span style="color:#99A2AA;margin-left:20px;cursor:pointer;" @click="huiFu1([it.commentId,it.commentator],index)">回复</span>
                  </div>
                  <div v-for="(i,index2) in commentList[index].child[index1].child" :key="index2">
                    <div class="commentItem">
                      <div class="userImg">
                        <img v-if="i.userFace" :src="i.userFace" alt="">
                        <img v-else src="../assets/logo.png" alt="">
                      </div>
                      <div class="commentContent">
                        <p>
                          <span>{{i.commentator}}</span>
                          <span style="color:#99A2AA">{{i.commentCreateTime}}</span>
                        </p>
                        <div v-if="i.parentUsername">
                          回复<span style="color:#478ef0">@{{i.parentUsername}}</span>：{{i.commentBody}}
                          <span style="color:#99A2AA;margin-left:20px;cursor:pointer;" @click="huiFu1([i.commentId,i.commentator],index)">回复</span>
                        </div>
                        <div v-else>{{i.commentBody}}
                          <span style="color:#99A2AA;margin-left:20px;cursor:pointer;" @click="huiFu1([i.commentId,i.commentator],index)">回复</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-form style="margin-top:10px" :model="commentForm" class="nn">
              <el-form-item v-if="values[index].show">
                <img :src="myuser.userFace" alt="" style="height:50px;width:50px;border-radius:50px;margin-right:3px">
                <el-input v-model="commentBody" :placeholder="`回复@${parent.username}：`"></el-input>
                <el-button type="danger" style="margin-left:3px" @click="huiFuComment">发送</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        </div>
      </div>
    </el-card>
    <!-- 中间放内容 -->
    <!-- 尾部放评论内容 -->
  </div>
</template>

<script>
export default {
  name:'shareArticle',
  data(){
    return{
      article:{},
      commentForm:{
        shareId:'',
        commentator:'',
        commentBody:'',
        parentId:'',
        parentUsername:null
      },
      myuser:{},
      commentList:null,
      length:'',
      parent:{
        id:'',
        username:''
      },
      values:[],
      commentBody:''
    }
  },
  methods:{
    async articleData(){
      console.log(this.$route);
      const res = await this.getRequest('/share-information/gain/' + this.$route.params.shareId)
      /* this.getRequest('/share-information/gain/' + this.$route.params.shareId).then(resp=>{
        console.log(resp);
      }) */
      console.log(res);
      this.article=res
      
    },
    async myUserinfo() {
      const res = await this.getRequest('/admin/info')
      this.myuser = res
    },
    async commentData(){
      const res = await this.getRequest('/share-comment/gainComment/'+this.$route.params.shareId)
      console.log(res);
      this.length = res.length
      this.commentList = this.changeCommentData(res)
      for(var i=0;i<this.commentList.length;i++){
        this.values.push({show:false})
      }
    },
    huiFu1(comment,i){
      console.log(comment);
      this.parent.id=comment[0];
      this.parent.username=comment[1];
      this.values[i].show=true
    },
    changeCommentData(data){
        function fn(temp){
          let arr1 = []
          for(var i=0;i<data.length;i++){
            if(data[i].parentId==temp){
              arr1.push(data[i])
              data[i].child=fn(data[i].commentId)
            }
          }
          return arr1
        }
        return fn(null)    
    },
    huiFuComment(){
      this.commentForm.parentId=this.parent.id
      this.commentForm.parentUsername=this.parent.username
      this.commentForm.commentBody=this.commentBody
      this.addComment()
    },
    addComment(){
      this.commentForm.shareId=this.$route.params.shareId
      this.commentForm.commentator=this.myuser.username
      this.commentForm.userFace = this.myuser.userFace
      if(this.commentForm.commentBody===''){
        this.$message.error('内容不能为空')
        return    
      }else{
        this.$refs.commentForm.validate((valid) => {
          if (valid) {
            this.postRequest('/share-comment/addComment',this.commentForm).then(resp => {
              if(resp) {
                console.log('123');
                location.reload()
              }
            })
          }
        });
      }
      
    }
  },
  created(){
    this.articleData()
    this.myUserinfo()
    this.commentData()
  },
}
</script>

<style lang="less" scoped>
.mm /deep/ .el-form-item__content{
  display: flex;
  align-items: center;
  margin-top: 5px;
}
/* .mm /deep/ .el-input__inner{
  width: 1100px;
  margin-right: 10px;
} */
.nn /deep/ .el-form-item__content{
  display: flex;
  align-items: center;
}
.container{
  margin-top: 10px;
}
.header{
  position: relative;
}
.box1{
  position: absolute;
  top: 10px;
  left: 70px;
}
.box2{
  position: absolute;
  top: 30px;
  left: 70px;
}
.size-icon{
  font-size: 25px;
  margin-top: 10px;
}
.size-icon i:nth-child(2){
  margin-left: 20px;
}
.number{
  font-size: 10px;
}
.commentParent{
  padding: 10px 10px;
}
.commentParent >div{
  border-bottom: 1px solid #e7e7e7;
}
.commentParent .commentItem{
  display: flex;
  
  padding: 10px 10px;
}
.commentParent .commentItem .userImg{
  margin-right: 10px;
}
.commentParent .commentItem .userImg img{
  width: 35px;
  height: 35px;
  /* border-radius: 100%; */
}
.commentParent .commentItem .commentContent{
  flex: 1;
}
.commentParent .commentItem .commentContent p{
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #555;
}
</style>