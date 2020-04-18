import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TopNav from '@/components/nav/topNav'
import Index from '@/components/index'
import Register from  '@/components/register'
import Main from  '@/components/main'
import Talk from  '@/components/talk'
import Form from  '@/components/use/forms'
import List from  '@/components/use/list'

Vue.use(Router)

export default new Router({
  mode: 'history',

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
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      components: {
        default:Main,
        top: TopNav
      }
    }
    ,
    {
      path: '/form',
      name: 'form',
      component: Form,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      components: {
        default:Form,
        top: TopNav
      }
    }
    ,
    {
      path: '/list',
      name: 'list',
      component: List,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      components: {
        default:List,
        top: TopNav
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
