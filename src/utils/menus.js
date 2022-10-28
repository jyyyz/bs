import { getRequest } from "./api"

export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return
  }

  getRequest('/system/config/menu').then(data => {
    if (data) {
      // 格式化Router
      /* let fmtRoutes = formatRoutes(data)
      // 添加到路由
      router.addRoutes(fmtRoutes)
      // 将数据存入vuex
      store.commit('initRoutes', fmtRoutes) */
      //连接websocket
      store.dispatch('connect')
    }
  })
}

export const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(router => {
    let {
      path,
      component,
      name,
      iconCls,
      children,
    } = router
    if (children && children instanceof Array) {
      // 递归
      children = formatRoutes(children)
    }
    let fmRouter = {
      path: path,
      iconCls: iconCls,
      name: name,
      children: children,
      component(resolve) {
        if (component.startsWith('Home')) {
          require(['../views/home/'+component+'.vue'].resolve)
        } else if (component.startsWith('Per')) {
          require(['../views/per/'+component+'.vue'].resolve)
        }
        
      }
    }
    fmtRoutes.push(fmRouter)
  })
  return fmtRoutes
}