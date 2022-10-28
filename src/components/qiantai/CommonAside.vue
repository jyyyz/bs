<template>
  <el-menu 
    default-active="1-4-1" 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose"
  >
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.label" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
        <el-menu-item :index="subIndex.toString()" @click="clickMenu(subItem)">
          <i :class="'el-icon-'+subItem.icon"></i>  
          <span>{{subItem.label}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        menu:[
          {
            path:'/home',
            name:'home',
            label:'首页',
            icon:'s-home',
            url:'home/home'

          },
          {
            label:'分享',
            icon:'notebook-1',
            children:[
              {
                path:'/share1',
                name:'share1',
                label:'发布分享',
                icon:'edit',
                url:'Share/Share1'
              },
              {
                path:'/share2',
                name:'share2',
                label:'我的分享',
                icon:'share',
                url:'Share/Share2'
              },
              {
                path:'/share3',
                name:'share3',
                label:'全部分享',
                icon:'share',
                url:'Share/Share3'
              },
            ]
          },
          {
            label:'求助',
            icon:'notebook-2',
            children:[
              {
                path:'/help1',
                name:'help1',
                label:'发布求助',
                icon:'edit',
                url:'Help/Help1'
              },
              {
                path:'/help2',
                name:'help2',
                label:'我的求助',
                icon:'help',
                url:'Help/Help2'
              },
              {
                path:'/help3',
                name:'help3',
                label:'全部求助',
                icon:'help',
                url:'Help/Help3'
              },
            ]
          },
          {
            path:'/chat',
            name:'chat',
            label:'在线聊天',
            icon:'chat-line-round',
            url:'Chat/Chat'
          }
        ] 
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        this.$router.push({
          name:item.name
        })
      }
    },
    computed:{
      // 对有无子项目的路由进行过滤
      noChildren(){
        return this.menu.filter(item=>!item.children)
      },
      hasChildren(){
        return this.menu.filter(item=>item.children)
      },
      /* getMenu(){
        return this["$router"].options.menus // 获取路由对象routes
      } */
    }
  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 100%;
    border: none;
  }
</style>
