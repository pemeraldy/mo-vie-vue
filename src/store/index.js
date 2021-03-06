import Vue from 'vue'
import Vuex from 'vuex'
import firebaseServices from '../firebase'
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    user: {
      id:'',
      username:'',      
    },
    isUserLoggedIn:false,
    movieCollections:[],
    movie:null,
    collection:null,
    searchText: '',
    isLoading: false,
    movieGalleryInit: []
  },
  mutations: {
    setUserProfile: (state, payload) =>{
    state.user = {
      id: payload.id,
      username: payload.data().username
    }
   },
   setIsUserLoggedIn:(state, data)=> state.isUserLoggedIn = data,
   setSuggestionGallery: (state, payload) => state.movieGalleryInit = payload,
   setIsLoading: (state, payload) => state.isLoading = payload,
   setUserMovieCollections: (state, payload) => state.movieCollections =  payload,
   setCollectionById: (state, payload) => state.collection = payload,
   setMovieById: (state, payload) => state.movie = payload
  },
  actions:{
    
    async login({dispatch}, payload){
      const {user} = await firebaseServices.auth.signInWithEmailAndPassword(payload.email,payload.password)
       dispatch('fetchUserProfile', user)
    },
    async logout({commit}){
      await firebaseServices.auth.signOut()
      commit('setIsUserLoggedIn', false)
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
    async fetchUserProfile({ commit, dispatch }, payload){
      // console.log("FETCH USER  PAYLOAD:  ",payload.uid)
      // userId = firebaseServices.auth.currentUser.uid
      const userProfile = await firebaseServices.usersCollection.doc(payload.uid).get()
      commit('setUserProfile', userProfile)
      commit('setIsUserLoggedIn', true)      
      dispatch('getMovieCollections', payload.uid)

    },    
    async fetchSuggestionMovieGallery ({ commit },term='home'){      
      commit('setIsLoading', true)
      try{
        const search = await fetch(
        `https://www.omdbapi.com/?s=${term}&apikey=60fd5e0c`
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
    async getMovieById({ commit },id){   
      commit('setIsLoading', true)
      try{
        const movieById = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=60fd5e0c`
      )
        .then((data) => data.json())
        .then((data) => data);
      const movie = await movieById
      console.log(movie);
      commit('setMovieById', movie)
      commit('setIsLoading', false)
      return movie
    }
    catch(error){
      console.log(error)
      commit('setIsLoading', true)
      }
    },
    async addToCollection({dispatch}, payload){ 
      try {
         await firebaseServices.movieListCollection.add({
          name: payload,
          userId: firebaseServices.auth.currentUser.uid,
          movies: []
        })
        dispatch('getMovieCollections', this.state.user.id)
      } catch (error) {
        console.log(error)
      }
    },
    async getMovieCollections({commit}, payload=firebaseServices.auth.currentUser.uid){
      const movieCollections = []
      const userId = payload
      try {
       await firebaseServices.movieListCollection.where("userId", "==", userId)
       .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) { 
            let collection = {
              id: doc.id,
              name:doc.data().name
            }           
               movieCollections.push(collection)
           });
       })
       .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
        commit('setUserMovieCollections', movieCollections)
      } catch (error) {
        console.log(error)
      }
    },
    async getCollectionById({commit}, payload){
      try {
        const movref = await firebaseServices.movieListCollection.doc(payload).get();
        const collection = await movref.data();
        commit('setCollectionById', collection)                
      } catch (error) {
        console.log(error);
      }
    }, 
    async deleteMovieFrmCollection({dispatch}, payload){
      const movref = await firebaseServices.movieListCollection.doc(payload.collectionId);
      const newList = this.getters.getCollection.movies.filter(movie => movie.imdbID != payload.movie.imdbID)      
      await movref.update({
            movies: newList
          })
          .then(()=>{
            console.log('collection updated')
            dispatch('getCollectionById', payload.collectionId)
          })
          .catch(error=>{console.log(error);})
    }   
},
  getters:{
    getIsLoading: (state) =>state.isLoading,
    getSuggestionGallery:(state) => state.movieGalleryInit,
    getUserMovieCollections: (state) => state.movieCollections,
    getUser: (state) => state.user,
    getUserLoggedIn:(state) => state.isUserLoggedIn,
    getCollection:(state) => state.collection,

  }     
})

export default store