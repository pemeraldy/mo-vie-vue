import Vue from 'vue'
import VueRouter from 'vue-router'
import authRoutes from '../auth/auth.routes'
import homeRoutes from '../home/home.routes'
Vue.use(VueRouter)

const baseRoute = { path: '/', redirect: '/login' }

export default new VueRouter({
  mode: 'history',
  routes: [baseRoute, ...authRoutes, ...homeRoutes],
})
