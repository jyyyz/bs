<template>
  <div class="tabs">
    <el-tag
      size="small"
      v-for="(item,index) in tags"
      :key="item.name"
      :closable="item.name!=='houtai'"
      :effect="$route.name===item.name?'dark':'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item,index)"
    >
    {{item.label}}
    </el-tag>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name:'CommonTag',
  data(){
    return{

    }
  },
  computed:{
    ...mapState({
      tags:state=>state.tab.tabsList
    })
  },
  methods:{
    ...mapMutations({
      close:'closeTag'
    }),
    changeMenu(item){
      this.$router.push({name:item.name})
    },
    handleClose(item,index){
      const length = this.tags.length-1
      this.close(item)
      if(item.name ===this.$router.name){
        return;
      }
      if(index === length){
        this.$router.push({
          name:this.tags[index-1].name
        })
      } else{
        this.$router.push({
          name:this.tags[index].name
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tabs{
  padding:20px;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>