import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
// 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {postRequest} from './utils/api'
import {putRequest} from './utils/api'
import {getRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import { initMenu } from './utils/menus'
import BMap from 'vue-baidu-map'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.use(BMap, {
  ak: 'uPru3wlDYuvL5MrhYwRCzEqQMTWWp8mC'
})

// 插件形式使用请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

router.beforeEach((to, from, next) => {
  if (window.sessionStorage.getItem('tokenStr')) {
    // initMenu(router,store)
    store.dispatch('connect')
    if(!window.sessionStorage.getItem('user')){
      // 判断用户信息是否存在
      return getRequest('/admin/info').then(resp=>{
        if(resp){
          // 存入用户信息
          window.sessionStorage.setItem('user', JSON.stringify(resp))
          store.commit('INIT_ADMIN',resp)
          next()
        }
          
      })
    }
    next()
  } else {
    if (to.path == '/'||to.path=='/register') {
      next()
    }else {
      next('/?redirect='+to.path)
    }
  }
  
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
