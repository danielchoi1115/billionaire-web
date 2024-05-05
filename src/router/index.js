import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      displayName: '포트폴리오',
      meta: { title: '포트폴리오' },
      component: HomeView
    },
    {
      path: '/plans',
      name: 'plans',
      displayName: '구매계획',
      meta: { title: '구매계획' },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PlanView.vue')
    },
    {
      path: '/dividends',
      name: 'dividends',
      displayName: '배당내역',
      meta: { title: '배당내역' },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DividendsView.vue')
    },
    {
      path: '/stocks',
      name: 'stocks',
      displayName: '주식검색',
      meta: { title: '주식검색' },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StocksView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})
router.beforeEach((to, from) => {
  const title = to.meta.title === undefined ? 'Billionaire' : to.meta.title + ' - Billionaire'
  document.title = title
})
export default router
