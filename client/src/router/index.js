import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index'
import Register from  '@/components/register'
import Main from  '@/components/main'
import Talk from  '@/components/talk'
import Form from  '@/components/use/forms'
import List from  '@/components/use/list'

Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
    ,
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    }
    ,
    {
      path: '/form',
      name: 'form',
      component: Form,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    }
    ,
    {
      path: '/list',
      name: 'list',
      component: List,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    }
    ,
    {
      path: '/talk',
      name: 'talk',
      component: Talk

    }
  ]
})
