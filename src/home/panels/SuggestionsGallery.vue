<template>
  <v-sheet>
    <div v-show="showSearchBar">
      <search-form />
    </div>
    <v-layout v-if="!moviesInGallery">
      <div>
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="card"
        ></v-skeleton-loader>
        <h2>No Result found</h2>
      </div>
    </v-layout>
    <v-layout v-else row>
      <v-flex v-for="n in moviesInGallery" :key="n.imdbID" md3>
        <v-card
          :loading="!n.Poster"
          :to="{ name: 'movie', params: { id: n.imdbID } }"
          class="mx-2 my-2 "
          max-width="374"
          max-height="484"
        >
          <v-img height="250" :src="n.Poster"></v-img>

          <v-card-title
            d-inline-block
            max-width="320"
            @click="addToCollection(n)"
            >{{ n.Title }}</v-card-title
          >

          <v-card-subtitle>
            <div class="my-4 font-weight-medium">
              Year: <span>{{ n.Year }}</span>
            </div>
          </v-card-subtitle>

          <v-card-actions v-if="movieCollections.length > 0">
            <v-menu
              offset-y
              open-on-hover
              origin="center center"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="collection in movieCollections"
                  :key="collection.id"
                  @click="addToCollection(collection, n)"
                >
                  <v-list-item-content>{{
                    collection.name
                  }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
          <v-card-actions v-else>
            <div class="font-weight-normal grey--text">
              Add to collections
            </div>
            <v-spacer></v-spacer>
            <v-btn dark class="primary ml-2" icon @click.prevent="goto">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-sheet>
</template>
<script>
import firebaseServices from "../../firebase";
import SearchForm from "@/components/SearchForm.vue";
export default {
  name: "SuggestionGallery",
  components: {
    SearchForm,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      closeOnClick: false,
    };
  },
  computed: {
    moviesInGallery() {
      return this.$store.getters["getSuggestionGallery"];
    },
    movieCollections() {
      return this.$store.getters["getUserMovieCollections"];
    },
    showSearchBar() {
      if (this.$route.path === "/home") {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    goto: () => {
      console.log("hi");
    },
    async addToCollection(movieCollection, movie) {
      const movieColl = await firebaseServices.movieListCollection
        .doc(movieCollection.id)
        .get();
      // console.log("movie-col:", movieColl.data().movies);
      let movieRef = await firebaseServices.movieListCollection.doc(
        movieCollection.id
      );
      await movieRef
        .set({
          userId: firebaseServices.auth.currentUser.uid,
          name: movieColl.data().name,
          movies: [...movieColl.data().movies, movie],
        })
        .then(function() {
          console.log("Movie successfully added!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    createCollection() {
      console.log("signup to add to create collections");
    },
  },
  async mounted() {
    this.loading = true;
    console.log(this.showSearchBar);
    await this.$store.dispatch("fetchSuggestionMovieGallery");
  },
};
</script>
