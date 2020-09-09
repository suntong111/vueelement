import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Register from '../views/Register'
import Notfound from '../views/404'
import Home from '../views/Home'
import Infoshow from '../views/Infoshow'
import FoundList from '../views/FoundList'
import {isEmpty} from "element-ui/src/utils/util";


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'/index'
  },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[
        {
          path:'',
          component: Home
        },
        {
          path: '/home',
          name:'home',
          component: Home
        },
        {
          path: '/infoshow',
          name:'infoshow',
          component: Infoshow
        },
        {
          path: '/foundlist',
          name: 'foundlist',
          component: FoundList
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      name: '/404',
      component: Notfound
    }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{
  // console.log(localStorage.eleToken)
  const isLogin = localStorage.eleToken ?true : false
  console.log(isLogin)
  if (to.path =='/register'){
    next()
  }else {

    isLogin ? next() : next('/register')

  }
})

export default router



