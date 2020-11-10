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
    userMovieCollections:[],
    movieGalleryInit: []
  },
  mutations: {
    setUserProfile: (state, payload) =>{
    state.user = payload.user
    state.userId = payload.id
   },
   setSuggestionGallery: (state, payload) => state.movieGalleryInit = payload,
   setIsLoading: (state, payload) => state.isLoading = payload,
   setUserMovieCollections: (state, payload) => state.userMovieCollections =  payload
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
       dispatch('fetchUserProfile', user)
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
    },
    async addToCollection({dispatch}, payload){
      try {
        const newCollection =  await firebaseServices.movieListCollection.add({
          name: payload
        })
        dispatch('getMovieCollections')
        console.log(newCollection)    
      } catch (error) {
        console.log(error)
      }
    },
    async getMovieCollections({commit}){
      const movieCollections = []
      try {
       await firebaseServices.movieListCollection.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapsh
              let collection = {
                id: doc.id,
                name:doc.data().name
              }
              movieCollections.push(collection)
          });
      });
      console.log(movieCollections)
        commit('setUserMovieCollections', movieCollections)
      } catch (error) {
        console.log(error)
      }
    }
},
  getters:{
    getIsLoading: (state) =>state.isLoading,
    getSuggestionGallery:(state) => state.movieGalleryInit,
    getUserMovieCollections: (state) => state.userMovieCollections
  }     
})

export default store