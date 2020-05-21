import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name:"home", path: '', component: () => import('pages/Index.vue') },
      { name:"videos", path: '/videos', component: () => import('pages/Video.vue') },
      { name:"userLogin", path: '/user/login', component: () => import('pages/User/Login.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
