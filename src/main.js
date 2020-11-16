import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routing/app.routing'
import store from './store/index'
import firebaseServices from './firebase'
Vue.config.productionTip = false

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
