import Home from './panels/Home.Index.vue'
import CollectionMovieGallery from './panels/CollectionMovieGallery.vue'

import CollectionMovieList from './panels/CollectionMovieList.vue'
import CollectionsList from './panels/CollectionsList.vue'

import SuggestionsGallery from './panels/SuggestionsGallery.vue'

export default [
  {
    path: '/home',
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
        components: {
          left: CollectionsList,
          default: CollectionMovieGallery,
          right: CollectionMovieList,
        },
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
