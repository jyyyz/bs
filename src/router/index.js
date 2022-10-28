import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AdminInfo from '../views/AdminInfo.vue'
import ShareArticle from '../views/shareArticle.vue'
import HelpArticle from '../views/helpArticle.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path:'/adminHome',
    name: '后台首页',
    component: () => import('../views/AdminHome.vue'),
    redirect:'/houtai',
    children: [
      {
        path: '/houtai',
        name: 'houtai',
        component:()=>import('../views/hthome/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component:()=>import('../views/user/index.vue')
      },
      {
        path: '/share',
        name: 'share',
        component:()=>import('../views/share/index.vue')
      },
      {
        path: '/help',
        name: 'help',
        component:()=>import('../views/help/index.vue')
      },
      {
        path: '/shareComment',
        name: 'shareComment',
        component:()=>import('../views/comment/shareComment.vue')
      },
      {
        path: '/helpComment',
        name: 'helpComment',
        component:()=>import('../views/comment/helpComment.vue')
      },
    ]
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect:'/home',
    children: [
      {
        path: '/home',
        name: 'home', 
        component:()=>import('../views/qhome.vue')
      },
      {
        path: '/share1',
        name: 'share1',
        component: ()=>import('../views/Share1.vue')
      },
      {
        path: '/share2',
        name: 'share2',
        component: ()=>import('../views/Share2.vue')
      },
      {
        path: '/share3',
        name: 'share3',
        component: ()=>import('../views/Share3.vue')
      },
      {
        path: '/help1',
        name: 'help1',
        component: ()=>import('../views/Help1.vue')
      },
      {
        path: '/help2',
        name: 'help2',
        component: ()=>import('../views/Help2.vue')
      },
      {
        path: '/help3',
        name: 'help3',
        component: ()=>import('../views/Help3.vue')
      },
      {
        path: '/chat',
        name: 'chat',
        component: ()=>import('../views/chat/FriendChat.vue'),
      },
      {
        path: '/userinfo',
        name: '个人中心',
        component: AdminInfo,
      },
      {
        path: '/shareArticle/:shareId',
        name: '分享详情页',
        component: ShareArticle,
      },
      {
        path: '/helpArticle/:helpId',
        name: '求助详情页',
        component: HelpArticle,
      }
    ]
  },
]

const router = new VueRouter({
  // mode:'history',
  routes
})

export default router
