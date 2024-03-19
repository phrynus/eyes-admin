import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      // component: IndexView,
      children: [
        {
          path: '/home',
          name: 'home',
          component: IndexView
        },
        {
          path: '/keyId/:id',
          name: 'keyId',
          component: () => import('@/views/key/index.vue')
        },
        {
          path: '/policyId/:id',
          name: 'policyId',
          component: () => import('@/views/policy/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue')
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login' && to.name !== 'register' && 1+1==2) {
//     next({ name: 'login' })
//   } else {
//     next()
//   }
// })
export default router
