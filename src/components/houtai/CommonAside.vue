<template>
  <el-menu 
    default-active="1-4-1" 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose" 
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{isCollapse?'后台':'宠物相亲网后台管理系统'}}</h3>
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
            path:'/houtai',
            name:'houtai',
            label:'首页',
            icon:'s-home',
            url:'HouTai/Houtai'
          },
          {
            path:'/share',
            name:'share',
            label:'分享信息管理',
            icon:'collection',
            url:'ShareMange/ShareManage'
          },
          {
            path:'/help',
            name:'help',
            label:'求助信息管理',
            icon:'collection-tag',
            url:'HelpMange/HelpManage'
          },
          {
            path:'/user',
            name:'user',
            label:'用户管理',
            icon:'user',
            url:'UserManage/UserManage'
          },
          {
            label:'管理评论信息',
            icon:'chat-line-square',
            children:[
              {
                path:'/shareComment',
                name:'shareComment',
                label:'管理分享评论',
                icon:'chat-dot-square',
                url:'Comment/ShareComment'
              },
              {
                path:'/helpComment',
                name:'helpComment',
                label:'管理求助评论',
                icon:'chat-dot-square',
                url:'Comment/HelpComment'
              },
            ]
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
        this.$store.commit('selectMenu',item)
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
      isCollapse(){
        return this.$store.state.tab.isCollapse
      }
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
    h3 {
      color: #fff;
      text-align:center;
      line-height:48px
    }
  }
</style>
