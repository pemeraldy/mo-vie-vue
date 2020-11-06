import Vue from 'vue'
import Vuex from 'vuex'
import firebaseServices from '../firebase'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    userId: '',
    searchText: '',
    isLoading: false,
    userMovieLists:[],
    movieGalleryInit: []
  },
  mutations: {
    setUserProfile: (state, payload) =>{
    state.user = payload.user
    state.userId = payload.id
   },
   setSuggestionGallery: (state, payload) => state.movieGalleryInit = payload,
   setIsLoading: (state, payload) => state.isLoading = payload
  },
  actions:{
    async fetchSuggestionMovieGallery ({ commit },term='home'){      
      commit('setIsLoading', true)
      try{
        const search = await fetch(
        `http://www.omdbapi.com/?s=${term}&apikey=60fd5e0c`
      )
        .then((data) => data.json())
        .then((data) => data);
      const movies = await search.Search
      commit('setSuggestionGallery', movies)
      commit('setIsLoading', false)
    }
    catch(error){
      console.log(error)
      commit('setIsLoading', true)
      }
  },
    async login({dispatch}, payload){
      const {user} = await firebaseServices.auth.signInWithEmailAndPassword(payload.email,payload.password)
       dispatch('fechUserProfile', user)
    },
    async fetchUserProfile({ commit }, payload){
      const userProfile = await firebaseServices.usersCollection.doc(payload.uid).get()
      commit('setUserProfile', userProfile.data())
    },
    async signup({ dispatch }, payload) {
      // sign user up
      console.log('payload',payload)
      const { user } = await firebaseServices.auth.createUserWithEmailAndPassword(payload.email, payload.password)
    
      // create user profile object in userCollections
      await firebaseServices.usersCollection.doc(user.uid).set({
        email: payload.email,
        username: payload.username
      })
    
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    }
},
  getters:{
    getSuggestionGallery:(state) => state.movieGalleryInit,
    getIsLoading: (state) =>state.isLoading
  }     
})

export default store