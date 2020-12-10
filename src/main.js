import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routing/app.routing'
import store from './store/index'
import firebaseServices from './firebase'
Vue.config.productionTip = false

Vue.prototype.reloadAccess = window.location
let app
firebaseServices.auth.onAuthStateChanged((user)=>{
  if(!app){
    app = new Vue({
      vuetify,
      store,
      render: (h) => h(App),
      router,
    }).$mount('#app')
  }
  if(user){
    store.dispatch('fetchUserProfile', user)
  }
})
