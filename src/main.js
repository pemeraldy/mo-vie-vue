import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routing/app.routing'
import store from './store/index'
import firebaseServices from './firebase'
Vue.config.productionTip = false
console.log(firebaseServices.auth.currentUser)
router.beforeEach((to, from, next)=>{
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const {auth} = firebaseServices
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})


let app
firebaseServices.auth.onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      vuetify,
      store,
      render: (h) => h(App),
      router,
    }).$mount('#app')
  }
})
