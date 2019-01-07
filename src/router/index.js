import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import home from '../components/home'
import tb from '../components/Technology_before'
import tbm from '../components/Technology_Mid'
// eslint-disable-next-line camelcase
import per_info from '@/components/per_info'
// eslint-disable-next-line camelcase
import tsb_info from '../components/TSB_info'
import plantation from '../components/plantation_info'
import choosePlant from '../components/choosePlant'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login', // 登录页
      name: 'login',
      component: login
    },
    {
      path: '/mainpage', // 主页面
      name: '主页',
      component: home,
      children: [{
        path: '/Technology_before', // 技术服务产前页面
        component: tb,
        name: '产前技术',
        hidden: true
      },
      {
        path: '/per_info', // 个人信息页面
        component: per_info,
        name: '个人信息',
        hidden: true
      },
      {
        path: '/Technology_Mid',
        component: tbm,
        name: '产中技术',
        hidden: true
      },
      {
        path: '/tsb_info',
        component: tsb_info,
        name: '产前信息',
        hidden: true
      },
      {
        path: '/plantation',
        component: plantation,
        name: '果园信息',
        hidden: true
      },
      {
        path: '/choosePlant',
        component: choosePlant,
        name: '选园定植',
        hidden: true
      }]
    }]
})
