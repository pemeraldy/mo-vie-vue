import Vue from 'vue'
import Vuex from 'vuex'
import firebaseServices from '../firebase'
Vue.use(Vuex)


// firebaseServices.movieListCollection.get().then(function(querySnapshot) {
//   querySnapshot.forEach(function(doc) {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//   });
// });
const colletz = []
firebaseServices.movieListCollection.where("userId", "==", "o7tCUME7t3SyDCgBRoKIvXGQXd3")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {            
            colletz.push(doc.data())
        });
        console.log(colletz)
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


// getColl()
const store = new Vuex.Store({
  state: {
    user: {
      id:'',
      username:'',      
    },
    movieCollections:[],
    searchText: '',
    isLoading: false,
    movieGalleryInit: []
  },
  mutations: {
    setUserProfile: (state, payload) =>{
      console.log('Set_USER_PROFILE: ',payload)
    state.user = {
      id: payload.id,
      username: payload.data().username
    }
   },
   setSuggestionGallery: (state, payload) => state.movieGalleryInit = payload,
   setIsLoading: (state, payload) => state.isLoading = payload,
   setUserMovieCollections: (state, payload) => state.movieCollections =  payload
  },
  actions:{
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
    async login({dispatch}, payload){
      const {user} = await firebaseServices.auth.signInWithEmailAndPassword(payload.email,payload.password)
      console.log("USER: ",user,user.uid)
       dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit, dispatch }, payload){
      console.log("FETCH USER  PAYLOAD:  ",payload.uid)
      const userProfile = await firebaseServices.usersCollection.doc(payload.uid).get()
      commit('setUserProfile', userProfile)
      dispatch('getMovieCollections', payload.uid)

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
          name: payload,
          userId: firebaseServices.auth.currentUser.uid,
          movies: []
        })
        dispatch('getMovieCollections')
        console.log(newCollection)    
      } catch (error) {
        console.log(error)
      }
    },
    async getMovieCollections({commit}, payload=" "){
      const movieCollections = []
      const userId = payload
      try {
       await firebaseServices.movieListCollection.where("userId", "==", userId)
       .get()
       .then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {            
               movieCollections.push(doc.data())
           });
           console.log('UserFetchedMovieColl: ',movieCollections)
       })
       .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
      console.log('MOvieC0llections: ',movieCollections)
        commit('setUserMovieCollections', movieCollections)
      } catch (error) {
        console.log(error)
      }
    }
},
  getters:{
    getIsLoading: (state) =>state.isLoading,
    getSuggestionGallery:(state) => state.movieGalleryInit,
    getUserMovieCollections: (state) => state.movieCollections,
    getUser: (state) => state.user
  }     
})

export default store