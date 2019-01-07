import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {
      nickname: window.localStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(window.localStorage.getItem('user' || '[]')).nickname,
      img_path: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).img_path,
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
      roles: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).roles
    },
    routes: []
  },
  mutations: {
    login: (state, user) => {
      var userTemp = {}
      userTemp.nickname = user.nickname
      userTemp.img_path = user.img_path
      userTemp.username = user.username
      userTemp.roles = user.roles
      window.localStorage.setItem('user', JSON.stringify(userTemp))
    },
    logout: (state) => {
      window.localStorage.removeItem('user')
      state.routes = []
    }

  }
})
