import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Post from '@/components/Post'
import Page from '@/components/Page'
import Form from '@/components/Form'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Post,
      props: (route) => ({ sortby: route.query.sortby })
    },
    {
      path: '/post/:slug',
      name: 'Post',
      component: Post,
      props: true
    },
    {
      path: '/forms',
      name: 'Forms',
      component: Form,
      props: (route) => ({ sortby: route.query.sortby })
    },
    {
      path: '/form/:slug',
      name: 'Form',
      component: Form,
      props: true
    },
    {
      path: '/pages',
      name: 'Page',
      component: Page,
      props: (route) => ({ sortby: route.query.sortby })
    },
    {
      path: '/page/:slug',
      name: 'Page',
      component: Page,
      props: true
    }
  ]
})
