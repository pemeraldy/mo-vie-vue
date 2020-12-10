import Vue from 'vue'
import VueRouter from 'vue-router'
import authRoutes from '../auth/auth.routes'
import homeRoutes from '../home/home.routes'
Vue.use(VueRouter)

const baseRoute = { path: '/', redirect:"/search"}

// router.beforeEach((to, from, next)=>{
//   const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
//   const {auth} = firebaseServices
//   if (requiresAuth && !auth.currentUser) {
//     next('/login')
//   } else {
//     next()
//   }
// })

export default new VueRouter({
  mode: 'history',
  routes: [baseRoute, ...authRoutes, ...homeRoutes],
})
