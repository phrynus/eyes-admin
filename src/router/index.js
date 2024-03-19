import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/home/Home.vue'
import LoginView from '@/views/login/Login.vue'
import RegisterView from '@/views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      children: [
        {
          path: '/key',
          name: 'key',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/Key.vue')
        },
        {
          path: '/policy',
          name: 'policy',
          component: () => import('@/views/Policy.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
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
