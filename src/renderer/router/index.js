import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/index.vue'
import HomeView from '../views/home/index.vue'
import store2 from 'store2'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView,
          meta: { requiresAuth: true }
        },
        {
          path: '/keyId/:id',
          name: 'keyId',
          component: () => import('../views/key/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/policyId/:id',
          name: 'policyId',
          component: () => import('../views/policy/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('../views/setting/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to.name)
  const isLoggedIn = store2.get('accessToken') || false
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'register' || to.name === 'index') && isLoggedIn) {
    next({ name: 'home' })
  } else {
    // 其他情况下正常跳转
    next()
  }
})
export default router
