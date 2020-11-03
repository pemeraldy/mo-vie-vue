import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: '',
    userId: '',
    searchText: '',
    userMovieLists:[],
    movieGalleryInit: []
  },
  mutations: {
   setUser: (state, payload) =>{
    state.user = payload.user
    state.userId = payload.id
   },
   setSuggestionGallery: (state, payload) =>{
     state.movieGalleryInit = payload
   }

  },
  actions:{
    async fetchSuggestionMovieGallery ({commit},term='home'){
      const search = await fetch(
        `http://www.omdbapi.com/?s=${term}&apikey=60fd5e0c`
      )
        .then((data) => data.json())
        .then((data) => data);
      const movies = await search.Search
      commit('setSuggestionGallery', movies)
    }
  },
  getters:{
    getSuggestionGallery:(state) => state.movieGalleryInit
  }     
})

export default store