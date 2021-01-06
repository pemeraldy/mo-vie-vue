import Home from './panels/Home.Index.vue'
import CollectionMovieGallery from './panels/CollectionMovieGallery.vue'

import CollectionMovieList from './panels/CollectionMovieList.vue'
import CollectionsList from './panels/CollectionsList.vue'
import Movie from './panels/Movie.vue'

import SuggestionsGallery from './panels/SuggestionsGallery.vue'
// import store from '../store/index'
import fireServices from '../firebase'

export default [
  {
    path: '/search',
    name: 'search',
    components: {      
      left: CollectionsList,
      default: SuggestionsGallery,
      // props: route => ({ query: route.query})
    },        
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component:Movie,
    props: true    
  },
  {
    
    path: '/home',
    beforeEnter:(_,__, next)=>{
       if(fireServices.auth.currentUser){
         next()
       }else{
         next({path: '/login'})
       }
    },
    component: Home,
    children: [
      {
        path: '',
        components: {
          left: CollectionsList,
          default: SuggestionsGallery,
        },        
      },
      
      {
        path: 'collections/:id',
        name:'collections',
        components: {
          left: CollectionsList,
          default: CollectionMovieGallery,
          right: CollectionMovieList,
        },
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'collections/:id/add',
        components: {
          left: CollectionsList,
          default: SuggestionsGallery,
          right: CollectionMovieList,
        },
      },
    ],
  },
]
