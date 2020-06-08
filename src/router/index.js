import Vue from 'vue'
import Router from 'vue-router'
import '../assets/main.scss'
// import App from "../App"
import Store from "../Store.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Store',
      component: Store
    },
    // {
    //   path: '/store',
    //   name: 'Store',
    //   component: Store
    // }
  ]
})