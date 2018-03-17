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
      path: '/createProject',
      name: 'CreateProject',
      component: require('@/components/ProjectCreationView/CreateProjectView').default,
      children: [
        {
          path: 'newAppInformation',
          name: 'NewAppInformation',
          component: require('@/components/ProjectCreationView/NewAppInformationChild/NewAppInformation').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
