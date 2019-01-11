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
import placeRecord from '../components/placeRecord'
import shaveRecord from '../components/shaveRecord'
import diseaseRecord from '../components/diseaseRecord'
import protectRecord from '../components/protectRecord'
import preserveRecord from '../components/preserveRecord'
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
        path: '/info/plantation',
        component: plantation,
        name: '产园信息',
        hidden: true
      },
      {
        path: '/info/choosePlant',
        component: choosePlant,
        name: '选园定植',
        hidden: true
      },
      {
        path: '/info/placeRecord',
        component: placeRecord,
        name: '产园信息记录表',
        hidden: true
      },
      {
        path: '/info/shaveRecord',
        component: shaveRecord,
        name: '产园修剪记录表',
        hidden: true
      },
      {
        path: '/info/diseaseRecord',
        component: diseaseRecord,
        name: '病虫害记录表',
        hidden: true
      },
      {
        path: '/info/protectRecord',
        component: protectRecord,
        name: '病虫害防治记录表',
        hidden: true
      },
      {
        path: '/info/preserveRecord',
        component: preserveRecord,
        name: '保花保果记录表',
        hidden: true
      }]
    }]
})
