import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingView',
      component: require('@/components/LandingView/LandingView').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
