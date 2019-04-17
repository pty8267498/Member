import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    isPageNumber: true,  // 屏幕比较小时 翻页修改
    screenWidth: document.documentElement['clientWidth'],  // 屏幕宽度
  },
  mutations:{

  }
})
