export default {
  state: {
    isCollapse:false,
    tabsList: [
      {
        path: '/houtai',
        name: 'houtai',
        label: '首页',
        icon:'home'
      },
    ],
    currentMenu:null
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse=!state.isCollapse
    },
    selectMenu(state, val) {
      if (val.name !== 'houtai') {
        state.currentMenu = val
        const result = state.tabsList.findIndex(item => item.name === val.name)
        if (result===-1) {
          state.tabsList.push(val)
        }
      } else {
        state.currentMenu=null
      }
    },
    closeTag(state, val) {
      const result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result,1)
    }
  }
}